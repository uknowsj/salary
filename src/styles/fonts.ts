import localFont from 'next/font/local';

export const fontPretendard = localFont({
	src: '../assets/fonts/PretendardVariable.woff2',
});

export const fontGmarket = localFont({
	src: [
		{
			path: '../assets/fonts/GmarketSansBold.otf',
			weight: '700',
			style: 'bold',
		},
		{
			path: '../assets/fonts/GmarketSansMedium.otf',
			weight: '500',
			style: 'medium',
		},
	],
});
