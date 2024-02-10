import { fontPretendard } from '@/styles/fonts';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={fontPretendard.className}>
			<Component {...pageProps} />
		</main>
	);
}
