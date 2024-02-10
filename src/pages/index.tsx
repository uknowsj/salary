import Layout from '@/components/layout';
import { fontGmarket } from '@/styles/fonts';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import PinImg from '@/assets/images/pin-dynamic-color.png';
import CoinSideLeftImg from '@/assets/images/coin-side-left.png';
import CoinSideBottomImg from '@/assets/images/coin-side-bottom.png';
import CoinSideTopImg from '@/assets/images/coin-side-top.png';
import CoinMainImg from '@/assets/images/coin-main.png';
import { addComma, removeComma } from '@/utils/price-converter';
import { useRouter } from 'next/router';
import { generateHashPath } from '@/utils/generate-hash-path';

interface OptionType {
	age: string;
	sex: 'male' | 'female';
}
export default function Home() {
	const router = useRouter();
	const [salary, setSalary] = useState<number | string>();
	const [withoutOption, setWithoutOption] = useState(false);
	const [option, setOption] = useState<OptionType>({
		age: '2',
		sex: 'male',
	});

	const changeSalary = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// 숫자만 입력
		setSalary(value.replace(/[^0-9]/g, ''));
	};

	const changeWithoutOption = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.checked;
		setWithoutOption(value);
	};

	const changeGenderOption = (e: ChangeEvent<HTMLInputElement>) => {
		setOption((prev) => ({ ...prev, sex: e.target.value as OptionType['sex'] }));
	};

	const changeAgeOption = (e: ChangeEvent<HTMLSelectElement>) => {
		setOption((prev) => ({ ...prev, age: e.target.value as OptionType['age'] }));
	};

	const goResult = () => {
		if (!salary) {
			return alert('비교할 연봉을 입력해주세요.');
		}
		const path = generateHashPath(option.sex + option.age);
		router.push({ pathname: `/result/${path}`, query: { salary: removeComma(salary as string) } });
	};

	return (
		<Layout>
			<div className={`${fontGmarket.className}`}>
				<div className='relative'>
					<h3 className={`text-center text-[28px] font-semibold leading-snug`}>나는 친구보다</h3>
					<span className='absolute bottom-0 right-4 px-1 text-[28px]'>🧐</span>
				</div>
				<h3 className={`text-center text-[28px] font-semibold leading-snug`}>
					얼마나 <em className='text-[#ffb92c]'>더</em> 벌고 있을까?
				</h3>

				{/* <span className='absolute bottom-0 right-0 translate-x-[100%] translate-y-[-50%]  px-1 text-sm font-bold text-[#5881FB]'>
					NEW
				</span> */}
			</div>

			{/* 이미지 */}
			<div className='relative mt-8 flex h-[238px] w-[296px] flex-col items-center overflow-hidden rounded-xl bg-gradient-to-b from-[#FFEDBE] to-[#ffbc2c]'>
				<div className='mt-5 flex items-center'>
					<Image src={PinImg} width='26' alt='빨간 핀 이미지' />
					<p className='ml-1 font-bold text-[#38342C]'>재미로 비교해보는 내 연봉 위치!</p>
				</div>
				{/* coin images */}
				<Image
					id='main-coin'
					src={CoinMainImg}
					width='200'
					alt='동전 이미지'
					style={{ position: 'absolute', top: 46 }}
				/>
				<Image
					id='side-coin-1'
					src={CoinSideLeftImg}
					width='66'
					alt='왼쪽 동전 이미지'
					style={{ position: 'absolute', left: 0, bottom: 15 }}
				/>
				<Image
					id='side-coin-2'
					src={CoinSideBottomImg}
					width='90'
					alt='오른쪽 하단 동전 이미지'
					style={{
						position: 'absolute',
						right: 20,
						bottom: 0,
						transform: 'translateY(46%)',
					}}
				/>
				<Image
					id='side-coin-3'
					src={CoinSideTopImg}
					width='82'
					alt='오른쪽 상단 동전 이미지'
					style={{ position: 'absolute', right: 0, top: 50 }}
				/>
			</div>

			<div className='mt-12 w-[272px]'>
				<div className='flex  items-center justify-center'>
					<span className='mr-2 size-[18px] rounded-full bg-[#5881FB] text-center text-xs font-semibold leading-snug text-white'>
						1
					</span>
					<p className='text-lg font-semibold'>당신의 연봉을 입력해 주세요</p>
				</div>
				<div className='relative mt-4 w-full border-b border-solid border-[#D8DCE0]'>
					<input
						placeholder='35,200,000'
						value={salary}
						className='w-[calc(100%-2rem)] py-1  text-center text-[32px] font-semibold placeholder:text-[#CBCCD2] hover:outline-none focus:outline-none active:outline-none '
						onChange={changeSalary}
						onBlur={() => {
							setSalary(Number(salary)?.toLocaleString('ko-KR'));
						}}
						onFocus={() => {
							if (typeof salary === 'string') {
								setSalary(removeComma(salary));
							}
						}}
					/>
					<span className='absolute bottom-0 right-0 pb-2 font-semibold text-[#CBCCD2]'>(원)</span>
				</div>
			</div>
			{/* 항목 비교 */}
			<div className='mt-10 w-[272px]'>
				<div className='flex items-center justify-center'>
					<span className='mr-2 size-[18px] rounded-full bg-[#5881FB] text-center text-xs font-semibold leading-snug text-white'>
						2
					</span>
					<p className='text-lg font-semibold '>성별/연령대를 선택해 주세요</p>
				</div>
				{/* <label className='mt-5 flex cursor-pointer gap-2 pb-1' htmlFor='withoutOption'>
					<input
						id='withoutOption'
						type='checkbox'
						className='accent-[#5881FB]'
						checked={withoutOption}
						onChange={changeWithoutOption}
					/>
					<p className='text-sm'>유형 선택 없이 연봉만 비교할래요!</p>
				</label> */}
				<div className='mt-4 flex gap-2'>
					<p className='text-sm font-semibold'>성별</p>
					<label className='flex cursor-pointer gap-1' htmlFor='male'>
						<input
							type='radio'
							id='male'
							name='gender'
							value='male'
							className=' accent-[#5881FB]'
							checked={option.sex === 'male'}
							disabled={withoutOption}
							onChange={changeGenderOption}
						/>
						<p className='text-sm'>남자</p>
					</label>
					<label className='flex cursor-pointer gap-1' htmlFor='female'>
						<input
							type='radio'
							id='female'
							name='gender'
							value='female'
							className=' accent-[#5881FB]'
							checked={option.sex === 'female'}
							disabled={withoutOption}
							onChange={changeGenderOption}
						/>
						<p className='text-sm'>여자</p>
					</label>
				</div>
				<div className='mt-4 flex items-center gap-2'>
					<p className='text-sm font-semibold'>연령대</p>
					<div className='select__list'>
						<select
							name='age'
							id='age'
							value={option.age}
							disabled={withoutOption}
							onChange={changeAgeOption}
						>
							{/* <option value='all'>전체</option> */}
							<option value='0'>20세 미만</option>
							<option value='1'>20~24세</option>
							<option value='2'>25~29세</option>
							<option value='3'>30~34세</option>
							<option value='4'>35~39세</option>
							<option value='5'>40~44세</option>
							<option value='6'>45~49세</option>
							<option value='7'>50~54세</option>
							<option value='8'>55~59세</option>
							<option value='9'>60세 이상</option>
						</select>
					</div>
				</div>
			</div>

			<button
				className='mt-16 flex h-[48px] w-[204px] items-center justify-center rounded-2xl bg-[#5881FB]'
				onClick={goResult}
			>
				<p className='font-bold text-white'>결과 확인하기</p>
			</button>

			{/* 주의문 */}
			<div className='flex flex-1 flex-col justify-end py-10'>
				<p className='text-xs text-[#969696]'>
					* 본 테스트는 오락 목적으로 제작되었으며 실제 통계 결과와 상이할 수 있습니다.
				</p>
				<p className='mt-2 text-xs text-[#969696]'>* 재미로만 즐겨주세요 :)</p>
			</div>
		</Layout>
	);
}
