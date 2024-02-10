import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-[#EEEEF3]'>
			<div className='mx-auto flex min-h-svh max-w-[420px] flex-col items-center bg-white px-[20px] pt-8'>
				{children}
			</div>
		</div>
	);
}
