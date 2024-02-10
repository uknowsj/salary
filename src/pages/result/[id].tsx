import Layout from '@/components/layout';
import { fontGmarket } from '@/styles/fonts';
import { addComma, removeComma } from '@/utils/price-converter';
import useIsomorphicEffect from '@/utils/use-isomorphic-effect';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import HeartAndMoney from '@/assets/images/heart-and-money.png';
import SadEmoji from '@/assets/images/sad-emoji.png';
import SNSKakao from '@/assets/images/kakaotalk.svg';
import SNSX from '@/assets/images/x.svg';
import SNSLink from '@/assets/images/spread.svg';
import { getGenderAndAge } from '@/utils/generate-hash-path';
import { GenderKey, GenderValue, ageMap, AgeKey, gender, AgeValue } from '@/constant/variable';
import SalaryGraph from '@/components/salary-graph';
import { salaryMap } from '@/constant/result';

export default function Result() {
	const router = useRouter();
	const { salary, id } = router.query as unknown as { salary: string; id: string };

	// 유저 정보
	const [gender, setGender] = useState<{ key: GenderKey; value: GenderValue }>({ key: 'MALE', value: '남성' });
	const [age, setAge] = useState<{ key: AgeKey; value: AgeValue }>({ key: 1, value: '' });

	// 연봉 관련
	const [isHigher, setIsHigher] = useState(false);
	const [salaryDiff, setSalaryDiff] = useState(0);

	useIsomorphicEffect(() => {
		if (!id) return;
		// 성별, 연령 데이터
		const { gender, age } = getGenderAndAge(id);

		// 연봉 정보 업데이트
		const value = compareSalary({ salary, age, gender });
		setIsHigher(value > 0);
		setSalaryDiff(Math.abs(value));
		// 유저 정보 업데이트
		setGender({ key: gender, value: gender === 'FEMALE' ? '여성' : '남성' });
		setAge({ key: age, value: ageMap[age] });
	}, [id]);

	const LINK = `https://salary.devmua.com${router.asPath}`;

	const copyLink = async () => {
		await navigator.clipboard.writeText(LINK);
		alert('링크가 복사되었습니다.');
	};

	if (!salary) return <div>잘못된 접근입니다.</div>;
	return (
		<Layout>
			{/* 타이틀 */}
			<div className={`${fontGmarket.className} w-full text-[24px] font-bold leading-relaxed`}>
				<p>당신은</p>
				<div className='relative z-10'>
					<p>
						{age.value}세 또래 {gender.value}보다
					</p>
					<Image
						src={isHigher ? HeartAndMoney : SadEmoji}
						alt='돈 이미지'
						className='absolute -top-1/2 right-6 z-[-1] w-14'
					/>
				</div>

				<span className='highlight relative z-10'>
					{/* 약 10,000,000원 이상 */}약 {addComma(salaryDiff)}원
				</span>
				<span>
					{' '}
					<em className='text-[28px] text-[#FF4444]'>{isHigher ? '더' : '덜'}</em> 받고 있어요!
				</span>
				{/* <div>
				</div> */}
			</div>

			{/* 평균연봉 */}
			<div className='mt-2 w-full'>
				<p className='text-sm text-[#434447]'>
					{age.value}세 {gender.value} 평균 연봉은 약{' '}
					<strong className='font-bold'>{addComma(salaryMap[gender.key][age.key].avg * 1000)}</strong>
					원입니다.
				</p>
				<p className='mt-1 text-xs text-[#7E8086]'>(* 추정치로 실제 수치와 다를 수 있습니다.)</p>
			</div>

			{/* 그래프 */}
			<SalaryGraph salary={Number(salary)} gender={gender.key} age={age.key} />

			{/* 안내 */}
			<div className='mt-14 grid gap-1'>
				<p className='text-xs text-[#969696]'>
					* 데이터 출처 | 임금직무정보시스템, 고용형태별 근로실태조사 (2022)
				</p>
				<p className='text-xs leading-loose text-[#969696]'>
					❗️임금직무정보시스템에서 제공하는 데이터는 ｢사업체노동력조사｣의 산업 중분류별 임금 증감률과
					연계하여 추정한 2023년 임금정보로, 고용형태별 근로실태조사 자료로 임의 추정한 데이터와 값이 다소
					상이할 수 있습니다.
				</p>
			</div>

			{/* 버튼 */}
			<button
				className='mt-16 flex h-[48px] w-[204px] items-center justify-center rounded-2xl bg-[#5881FB]'
				onClick={() => router.back()}
			>
				<p className='font-bold text-white'>다시 하기</p>
			</button>

			{/* 공유하기 */}
			<div className='mt-20'>
				<p className='text-center font-semibold'>친구들에게 결과를 공유해보세요!</p>
				<div className='mt-6 flex gap-4'>
					<div className='flex size-[2.5rem] cursor-pointer items-center justify-center rounded-lg bg-[#FEE500]'>
						<SNSKakao />
					</div>
					<div className='flex size-[2.5rem] cursor-pointer items-center justify-center rounded-lg bg-[#121212]'>
						<SNSX />
					</div>
					<div className='relative flex h-[2.5rem] w-52 items-center justify-center rounded-lg border border-solid border-[#CBCCD2] pr-[2rem]'>
						<div className='flex size-full items-center overflow-hidden border-r border-solid border-[#CBCCD2] bg-[#EDEEF3] pl-2'>
							{LINK}
						</div>
						<div className='absolute right-1 cursor-pointer' onClick={copyLink}>
							<SNSLink />
						</div>
					</div>
				</div>
			</div>

			{/* 주의문 */}
			<div className='flex flex-1 flex-col justify-end gap-2 pb-8 pt-16'>
				<p className='text-xs text-[#969696]'>* 참고 자료 출처 | 임금직무정보시스템, KOSIS(국가통계포털)</p>
				<p className='text-xs text-[#969696]'>
					* 본 테스트는 오락 목적으로 제작되었으며 실제 통계 결과와 상이할 수 있습니다.
				</p>
				<p className='text-xs text-[#969696]'>* 재미로만 즐겨주세요 :)</p>
			</div>
			{/* 히트 */}
		</Layout>
	);
}

interface CompareSalaryProps {
	salary: string;
	gender: GenderKey;
	age: AgeKey;
}
const compareSalary = ({ salary, gender, age }: CompareSalaryProps) => {
	const salaryValue = removeComma(salary);
	return salaryValue - salaryMap[gender][age].avg * 1000;
};