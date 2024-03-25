import { ReactNode } from 'react';
import EmailIC from '@/assets/images/email.svg';

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-gray-100'>
			<div className='mx-auto flex min-h-svh max-w-[420px] flex-col items-center bg-white px-5 pt-8'>
				{children}
				<footer className='flex flex-col items-center'>
					{/* hits */}
					<a href='https://hits.sh/salary.devmua.com/'>
						<img alt='Hits' src='https://hits.sh/salary.devmua.com.svg?color=4e75fa&labelColor=ffffff' />
					</a>
					<div className='my-3 flex items-center gap-1'>
						<EmailIC />
						<p className='text-xs text-text-secondary'>devmua0707@gmail.com</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
