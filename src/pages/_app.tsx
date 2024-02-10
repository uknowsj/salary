import conf from '@/config';
import { fontPretendard } from '@/styles/fonts';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
	const kakaoInit = () => {
		window.Kakao.init(conf.kakaoKey);
		window.Kakao.isInitialized();
	};

	return (
		<main className={fontPretendard.className}>
			<Component {...pageProps} />
			<Script
				src='https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js'
				integrity='sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH'
				crossOrigin='anonymous'
				onLoad={kakaoInit}
			></Script>
		</main>
	);
}
