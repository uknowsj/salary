import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';

import CoinMainImg from '@/assets/images/coin-main.png';
import CoinSideBottomImg from '@/assets/images/coin-side-bottom.png';
import CoinSideLeftImg from '@/assets/images/coin-side-left.png';
import CoinSideTopImg from '@/assets/images/coin-side-top.png';
import PinImg from '@/assets/images/pin-dynamic-color.png';
import Layout from '@/components/layout';
import { fontGmarket } from '@/styles/fonts';
import { generateHashPath } from '@/utils/generate-hash-path';
import { removeComma } from '@/utils/price-converter';

interface OptionType {
	age: string;
	sex: 'male' | 'female';
}
export default function Home() {
	const router = useRouter();
	const [salary, setSalary] = useState<number | string>();
	const [option, setOption] = useState<OptionType>({
		age: '2',
		sex: 'male',
	});

	const changeSalary = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// 숫자만 입력
		setSalary(value.replace(/[^0-9]/g, ''));
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
			<header className={`${fontGmarket.className}`}>
				<div className='relative'>
					<h1 className={`text-center text-[28px] font-semibold leading-snug`}>
						나는 친구보다
						<span className='absolute right-4 top-1 px-1 text-[28px]'>🧐</span>
						<br />
						얼마나 <em className='text-[#ffb92c]'>더</em> 벌고 있을까?
					</h1>
				</div>
			</header>
			{/* 이미지 */}
			<figure className='relative mt-8 flex h-[238px] w-[296px] flex-col items-center overflow-hidden rounded-xl bg-gradient-to-b from-[#FFEDBE] to-[#ffbc2c]'>
				<div className='mt-5 flex items-center'>
					<Image src={PinImg} width='26' alt='붉은 고정핀 이미지' />
					<p className='ml-1 font-bold text-[#38342C]'>재미로 보는 내 연봉 위치!</p>
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
			</figure>

			<section>
				<div className='mt-12 w-[272px]'>
					<div className='flex items-center justify-center'>
						<span className='mr-2 size-[18px] rounded-full bg-primary-blue text-center text-xs font-semibold leading-snug text-white'>
							1
						</span>
						<p className='text-lg font-semibold'>당신의 연봉을 입력해 주세요</p>
					</div>
					{/* 입력창 */}
					<div className='relative mt-4 w-full border-b border-solid border-[#D8DCE0]'>
						<input
							placeholder='35,200,000'
							value={salary}
							className='w-[calc(100%-2rem)] py-1  text-center text-[32px] font-semibold placeholder:text-[#CBCCD2] hover:outline-none focus:outline-none active:outline-none '
							onChange={changeSalary}
							onBlur={() => {
								if (salary) {
									setSalary(Number(salary)?.toLocaleString('ko-KR'));
								}
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
						<span className='mr-2 size-[18px] rounded-full bg-primary-blue text-center text-xs font-semibold leading-snug text-white'>
							2
						</span>
						<p className='text-lg font-semibold'>성별/연령대를 선택해 주세요</p>
					</div>
					<div className='mt-4 flex gap-2'>
						<div className='min-w-10'>
							<p className='text-sm font-semibold'>성별</p>
						</div>
						<label className='flex cursor-pointer gap-1' htmlFor='male'>
							<input
								type='radio'
								id='male'
								name='gender'
								value='male'
								className='accent-primary-blue'
								checked={option.sex === 'male'}
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
								className=' accent-primary-blue'
								checked={option.sex === 'female'}
								onChange={changeGenderOption}
							/>
							<p className='text-sm'>여자</p>
						</label>
					</div>
					<div className='mt-4 flex items-center gap-2'>
						<div className=' min-w-10'>
							<p className='text-sm font-semibold'>연령대</p>
						</div>
						<div className='select__list'>
							<select name='age' id='age' value={option.age} onChange={changeAgeOption}>
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
			</section>
			<button
				className='mt-16 flex h-[48px] w-[204px] items-center justify-center rounded-2xl bg-primary-blue'
				onClick={goResult}
			>
				<p className='font-bold text-white'>결과 확인하기</p>
			</button>

			{/* 주의문 */}
			<div className='flex flex-col py-10'>
				<p className='text-xs text-text-secondary'>
					* 본 테스트는 오락 목적으로 제작되었으며 실제 통계 결과와 상이할 수 있습니다.
				</p>
				<p className='mt-2 text-xs text-text-secondary'>* 재미로만 즐겨주세요 :)</p>
			</div>
		</Layout>
	);
}
