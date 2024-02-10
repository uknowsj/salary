/** 환경변수 호출 */
const conf: Conf = {
	isDev: false,
	kakaoKey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY as string,
};

conf.isDev = process.env.NODE_ENV == 'production' ? true : false;

export default conf;

type Conf = {
	isDev: boolean;
	kakaoKey: string;
};
