import Head from 'next/head';
import { ReactNode } from 'react';

export default function SEO({ title, description, children }: SEOProps) {
	return (
		<Head>
			<title>재미로 비교해보는 내 연봉 위치</title>
			<meta name='description' content='나는 친구보다 얼마나 더 벌고 있을까?' />
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content='데브무아 연봉 비교 테스트' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:url' content='https://salary.devmua.com/' />
			<meta property='og:locale' content='ko_KR' />
			<meta property='og:image:width' content='704' />
			<meta property='og:image:height' content='352' />
			<meta property='og:url' content='/thumbnail.webp' />
			<meta name='twitter:card' content='summary' />
			{children}
		</Head>
	);
}

interface SEOProps {
	title?: string;
	description?: string;
	children?: ReactNode;
}
