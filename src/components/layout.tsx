import React, { ReactNode } from 'react';
import Image from 'next/image';
export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-[#EEEEF3]'>
			<div className='mx-auto flex min-h-svh max-w-[420px] flex-col items-center bg-white px-[20px] pt-8'>
				{children}
				{/* hits */}
				<div className='opacity-0'>
					<a href='https://hits.sh/salary.devmua.com/'>
						<img alt='Hits' src='https://hits.sh/salary.devmua.com.svg?color=4e75fa&labelColor=ffffff' />
					</a>
				</div>
			</div>
		</div>
	);
}
