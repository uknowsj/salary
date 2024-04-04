import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function SEO({ title, description, children }: SEOProps) {
	const route = useRouter();

	return (
		<Head>
			{/* HTML Meta Tags */}
			<title>재미로 보는 내 연봉 위치</title>
			<meta
				name='description'
				content='연봉 테스트, 내 연봉 위치, 평균 연봉, 연봉 순위, 연봉 비교, 내 또래 연봉, 나는 친구보다 얼마나 더 벌고 있을까?'
			/>

			{/* Facebook Meta Tags */}
			<meta property='og:type' content='website' />
			<meta property='og:url' content={`${process.env.NEXT_PUBLIC_SITE_URL}${route.asPath}`} />
			<meta property='og:locale' content='ko_KR' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.webp`} />

			{/* Twitter Meta Tags */}
			<meta name='twitter:card' content='summary' />
			<meta property='twitter:domain' content={`${process.env.NEXT_PUBLIC_SITE_URL}`} />
			<meta property='twitter:url' content={`${process.env.NEXT_PUBLIC_SITE_URL}${route.asPath}`} />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.webp`} />

			{children}
		</Head>
	);
}

interface SEOProps {
	title?: string;
	description?: string;
	children?: ReactNode;
}
