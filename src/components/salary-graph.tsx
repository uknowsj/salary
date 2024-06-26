import { AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Line, Bar } from '@visx/shape';
import { Text } from '@visx/text';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { bisector } from '@visx/vendor/d3-array';
import React, { useMemo, useCallback } from 'react';

import UserSalaryPos from '@/components/user-pos-svg';
import { AgeKey, GenderKey } from '@/constant/variable';
import { TestResultData } from '@/models/salary';
import { addComma, isNumeric, replaceWithZeros } from '@/utils/price-converter';

interface SalaryGraphProps {
	testResult: TestResultData;
	userPercent: number;
}
interface SalaryData {
	per: number;
	salary: number;
}
export default function SalaryGraph({
	testResult: { salaryDataOfOthers, domainData, prefixSumData },
	userPercent,
}: SalaryGraphProps) {
	// 누적합 데이터
	const linearData: SalaryData[] = [];
	for (let idx = 0; idx < domainData.length; idx++) {
		linearData.push({ per: prefixSumData[idx], salary: domainData[idx] });
	}

	// 이산 데이터 (=25p, 50p,70p)
	const discreteData: SalaryData[] = [];
	for (const [per, salary] of Object.entries(salaryDataOfOthers)) {
		if (isNumeric(per)) {
			discreteData.push({ per: Number(per), salary });
		}
	}

	return (
		<div className='mx-auto mt-6'>
			{renderGraphWithTooltip({ width: 348, height: 240, userPosX: userPercent, linearData, discreteData })}
		</div>
	);
}

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';

/**
 * Linear Graph
 */
const bisectDate = bisector<SalaryData, number>((d) => d.per).left;

/**
 * Discrete Graph
 */
// Accessors
const getPercent = (d: SalaryData) => d.per;
const getSalary = (d: SalaryData) => d.salary;
// UI
const verticalMargin = 76;

export type BarsProps = {
	width: number;
	height: number;
	events?: boolean;
};
export type AreaProps = {
	width: number;
	height: number;
	userPosX: number;
	linearData: SalaryData[];
	discreteData: SalaryData[];
	margin?: { top: number; right: number; bottom: number; left: number };
};
type TooltipData = SalaryData;
const renderGraphWithTooltip = withTooltip<AreaProps, TooltipData>(
	({
		width,
		height,
		margin = { top: 0, right: 20, bottom: 0, left: 0 },
		showTooltip,
		hideTooltip,
		tooltipData,
		tooltipTop = 0,
		tooltipLeft = 0,
		userPosX,
		linearData,
		discreteData,
	}: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
		/**
		 * For Linear Graph
		 */
		if (width < 10) return null;

		// bounds
		const innerWidth = width - margin.left - margin.right;
		const innerHeight = height - margin.top - margin.bottom;

		// scales
		const dateScale = useMemo(
			() =>
				scaleLinear({
					range: [margin.left, innerWidth + margin.left],
					// domain: Array.from(Array(100), (_, idx) => idx + 1),
					domain: [0, 100],
				}),
			[innerWidth, margin.left],
		);
		const stockValueScale = useMemo(
			() =>
				scaleLinear({
					range: [innerHeight + margin.top, margin.top],
					domain: [0, 100000000], //1억까지만
					nice: true,
				}),
			[margin.top, innerHeight],
		);

		// tooltip handler
		const handleTooltip = useCallback(
			(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
				const { x } = localPoint(event) || { x: 0 };
				const x0 = dateScale.invert(x);
				const index = bisectDate(linearData, x0, 1);
				const d0 = linearData[index - 1];
				const d1 = linearData[index];
				let d = d0;
				if (d1 && getPercent(d1)) {
					d = x0.valueOf() - getPercent(d0).valueOf() > getPercent(d1).valueOf() - x0.valueOf() ? d1 : d0;
				}

				showTooltip({
					tooltipData: d,
					tooltipLeft: x,
					tooltipTop: stockValueScale(getSalary(d)),
				});
			},
			[showTooltip, stockValueScale, dateScale],
		);

		/**
		 * For Discrete Graph
		 */
		// bounds
		const xMax = width;
		const yMax = height - verticalMargin;

		// scales, memoize for performance
		const xScale = useMemo(
			() =>
				scaleBand<number>({
					range: [0, xMax],
					round: true,
					// 25 50 75 보여줄거라 5배수로만
					domain: Array.from(Array(20), (_, idx) => (idx + 1) * 5),
					padding: 0.2,
				}),
			[xMax],
		);
		// TODO 도메인 최댓값 변경하기
		const yScale = useMemo(
			() =>
				scaleLinear<number>({
					range: [yMax, 0],
					round: true,
					domain: [0, replaceWithZeros(Math.max(...discreteData.map(getSalary)))],
				}),
			[yMax],
		);
		const bottomText = [
			{ value: '하위25%', posX: 0 },
			{ value: '중위수준', posX: 0 },
			{ value: '상위25%', posX: 0 },
		];

		return (
			<div>
				<p className='mb-1 text-right text-xs text-[#7E8086]'>(단위: 천원)</p>
				<div className='flex justify-center'>
					<svg width={width} height={height}>
						<rect x={0} y={0} width={width} height={height} fill='url(#area-background-gradient)' rx={14} />
						<LinearGradient id='area-background-gradient' from={background} to={background2} />
						<LinearGradient id='area-gradient' from={accentColor} to={accentColor} toOpacity={0.1} />
						<LinearGradient id='bar-gradient' from={'#C2DCC9'} to={'#536C70'} toOpacity={0.1} />

						{/* Bar Graph */}
						<Group top={verticalMargin}>
							<GridRows
								left={52}
								scale={yScale}
								width={innerWidth - 20}
								// TODO
								// tickValues={[10000, 20000, 30000]}
								strokeDasharray='2,3'
								stroke={accentColor}
								strokeOpacity={0.2}
								pointerEvents='none'
							/>
							{/* 꼭 그룹안에 추가해야함 */}
							<AxisLeft
								hideAxisLine
								hideTicks
								left={52}
								scale={yScale}
								// numTicks={3}
								tickFormat={(d) => {
									// TODO 레인지값에 따라 변경되어야함
									return (d as number) % 10000 === 0 ? addComma(d as number) : '';
								}}
								hideZero
								tickLabelProps={{
									fill: 'white',
									fontFamily: 'Pretendard Variable',
									fontWeight: 200,
									fontSize: 10,
								}}
							/>

							{discreteData.map((d, idx) => {
								const letter = getPercent(d);
								// TODO 문제되면 너비추가 삭제
								const barWidth = xScale.bandwidth() + 10;
								const barHeight = yMax - (yScale(getSalary(d)) ?? 0);
								const barX = xScale(letter);
								const barY = yMax - barHeight;

								if (barX) {
									bottomText[idx].posX = barX;
								}

								return (
									<Group key={idx}>
										<Text
											// x={429.5}
											key={`Text-${idx}`}
											width={100}
											x={(barX || 0) + barWidth / 2}
											y={barY - 20}
											verticalAnchor='start'
											textAnchor='middle'
											fill='white'
											style={{
												fontSize: '14px',
												fontWeight: 600,
												textAlign: 'center',
												fontFamily: 'Pretendard Variable',
											}}
										>
											{addComma(getSalary(d))}
										</Text>
										<Bar
											key={`bar-${idx}`}
											x={barX}
											y={barY}
											width={barWidth}
											height={barHeight}
											fill='url(#bar-gradient)'
											// onClick={() => {
											// 	if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
											// }}
										/>
									</Group>
								);
							})}
							{/* 유저 위치 표시 */}
							<UserSalaryPos
								userPosX={userPosX}
								verticalMargin={verticalMargin}
								innerHeight={innerHeight}
								salaryPercentScale={dateScale}
							/>
						</Group>

						{/* for tooltip */}
						<Bar
							x={margin.left}
							y={margin.top}
							width={innerWidth}
							height={innerHeight}
							fill='transparent'
							rx={14}
							onTouchStart={handleTooltip}
							onTouchMove={handleTooltip}
							onMouseMove={handleTooltip}
							onMouseLeave={() => hideTooltip()}
						/>
						{tooltipData && (
							<Group>
								<Line
									from={{ x: tooltipLeft, y: margin.top }}
									to={{ x: tooltipLeft, y: innerHeight + margin.top }}
									stroke={accentColorDark}
									strokeWidth={2}
									pointerEvents='none'
									strokeDasharray='5,2'
								/>
								<circle
									cx={tooltipLeft}
									cy={tooltipTop + 1}
									r={4}
									fill='black'
									fillOpacity={0.1}
									stroke='black'
									strokeOpacity={0.1}
									strokeWidth={2}
									pointerEvents='none'
								/>
								<circle
									cx={tooltipLeft}
									cy={tooltipTop}
									r={4}
									fill={accentColorDark}
									stroke='white'
									strokeWidth={2}
									pointerEvents='none'
								/>
							</Group>
						)}
					</svg>

					<div className='absolute left-1/2 w-[348px] -translate-x-1/2'>
						{/* 하단 툴팁 */}
						<Group>
							{bottomText.map((item) => (
								<Tooltip
									key={item.value}
									// top={400 - verticalMargin + 20}
									top={240}
									left={item.posX}
									style={{
										...defaultStyles,
										fontFamily: 'Pretendard Variable',
										minWidth: 72,
										textAlign: 'center',
										transform: 'translateX(-50%)',
										boxShadow: 'none',
									}}
								>
									<p className='font-bold'>{item.value}</p>
								</Tooltip>
							))}
						</Group>
					</div>
				</div>
			</div>
		);
	},
);
