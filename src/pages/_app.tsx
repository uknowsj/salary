import type { AppProps } from 'next/app';
import Script from 'next/script';

import SEO from '@/components/seo';
import conf from '@/config';
import { fontPretendard } from '@/styles/fonts';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const kakaoInit = () => {
		window.Kakao.init(conf.kakaoKey);
		window.Kakao.isInitialized();
	};

	return (
		<div className={fontPretendard.className}>
			<SEO title='재미로 비교해보는 내 연봉 위치' description='나는 친구보다 얼마나 더 벌고 있을까?' />
			<Component {...pageProps} />
			<Script
				src='https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js'
				integrity='sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH'
				crossOrigin='anonymous'
				onLoad={kakaoInit}
			></Script>
		</div>
	);
}
