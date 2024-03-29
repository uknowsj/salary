import React from 'react';

export default function Loading() {
	return (
		<div className='absolute top-0 flex size-full flex-col items-center justify-center bg-white'>
			<div className='-translate-y-1/2'>
				<div className='size-12 animate-spin rounded-full border-8 border-solid border-primary-blue border-t-transparent' />
			</div>
			<p className='text-lg font-medium text-primary-blue'>잠시만 기다려주세요</p>
		</div>
	);
}
