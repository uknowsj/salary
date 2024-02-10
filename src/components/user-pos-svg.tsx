import { fontPretendard } from '@/styles/fonts';
import { GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import type { ScaleLinear } from '@visx/vendor/d3-scale';
/**
 * 테스트 유저의 연봉 위치 표시
 */
interface UserSalaryPosProps {
	userPosX: number;
	verticalMargin: number;
	innerHeight: number;
	salaryPercentScale: ScaleLinear<number, number, never>;
}
export default function UserSalaryPos({
	userPosX = 50,
	verticalMargin,
	innerHeight,
	salaryPercentScale,
}: UserSalaryPosProps) {
	const iconPosX = userPosX - 8; // 하단 위치 표시
	const textPosX = userPosX > 85 ? userPosX - 16 : userPosX + 5; // 상단 레벨 텍스트

	return (
		<Group top={verticalMargin * -1}>
			{/* 내 연봉 위치 */}
			<GridColumns
				// top={verticalMargin * -1}
				scale={salaryPercentScale}
				height={innerHeight}
				tickValues={[userPosX]}
				strokeDasharray='2,3'
				stroke={'#FFE500'}
				strokeOpacity={1}
				pointerEvents='none'
			/>
			{/* 하단 아이콘 */}
			<defs>
				<pattern id='image' height='100%' width='100%' viewBox='0 0 1 1'>
					<image width='1' height='1' href='/map-pin-front-color.svg' />
				</pattern>
			</defs>
			{/* runner */}
			<defs>
				<pattern id='runner-image' height='100%' width='100%' viewBox='0 0 1 1'>
					<image width='1' height='1' href='/runner-female.webp' />
				</pattern>
			</defs>

			{/* 이미지태그 x,y가 아닌 rect에다 추가한 후 x,y 변경. dateScale -8정도 해야 중심맞음 이유는.. */}
			<rect x={salaryPercentScale(iconPosX)} y={0} width={50} height={79} fill='url(#runner-image)' />
			<rect x={salaryPercentScale(iconPosX)} y={195} width={50} height={50} fill='url(#image)' />

			{/* 텍스트 */}
			{/* 85% 넘어가면 왼쪽으로 돌리기 x-34 아니면 x + 5 */}
			<rect x={salaryPercentScale(textPosX)} y={0} width={52} height={27} fill='#24242480' />
			<text
				x={salaryPercentScale(textPosX) + 52 / 2}
				y={0 + 27 / 2}
				textAnchor='middle'
				alignmentBaseline='middle'
				fill='white'
				style={{
					fontSize: '10px',
					fontWeight: 'bold',
					textAlign: 'center',
					fontFamily: fontPretendard.className,
				}}
			>
				{classifyLevel(userPosX)}
			</text>
		</Group>
	);
}

export const classifyLevel = (posX: number) => {
	if (posX < 49) {
		// ~ 49% -> 하위 n퍼
		return `하위 ${posX}%`;
	} else if (posX < 51) {
		// 49% ~ 51% -> 중위수준
		return `중위수준`;
	} else {
		// 51% ~ ->  상위 n퍼
		let percent = Math.round(100 - posX);
		percent = percent <= 0 ? 0.1 : percent;
		return `상위 ${percent}%`;
	}
};
