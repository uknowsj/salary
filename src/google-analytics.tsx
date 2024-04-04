import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import { pageview } from '@/utils/gtag';

export default function GoogleAnalytics() {
	const { pathname } = useRouter();

	useEffect(() => {
		if (pathname) {
			pageview(pathname);
		}
	}, [pathname]);

	return (
		<>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
			/>
			<Script id='google-analytics' strategy='afterInteractive'>
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                `}
			</Script>
		</>
	);
}
