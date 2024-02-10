interface CustomKakaoSharingProps extends KakaoSharingProps {
	id: string;
	salary: number;
}
interface KakaoSharingProps {
	title?: string;
	description?: string;
	imageUrl?: string;
	titleImageUrl?: string;
	titleImageText?: string;
	titleImageCategory?: string;
}
/**
 * 카카오 공유하기
 */
export const shareKakao = ({
	id,
	salary,
	title,
	imageUrl,
	description,
	titleImageUrl,
	titleImageText,
	titleImageCategory,
}: CustomKakaoSharingProps) => {
	const URL = 'https://salary.devmua.com';
	const RESULT_URL = `${URL}/result/${id}?salary=${salary}`;
	const IMAGE_URL = 'https://salary.devmua.com/thumbnail.png';
	const PROFILE_IMAGE_URL = 'https://salary.devmua.com/heart-and-money.png';

	window.Kakao.Share.sendDefault({
		objectType: 'feed',
		content: {
			title: '나는 친구보다 얼마나 더 벌고 있을까?',
			description, // 결과
			imageUrl: IMAGE_URL,
			link: {
				mobileWebUrl: RESULT_URL,
				webUrl: RESULT_URL,
			},
		},
		itemContent: {
			profileText: '재미로 비교해보는 내 연봉 위치',
			profileImageUrl: PROFILE_IMAGE_URL,
		},
		buttons: [
			{
				title: '결과 보기',
				link: {
					mobileWebUrl: RESULT_URL,
					webUrl: RESULT_URL,
				},
			},
			{
				title: '테스트하기',
				link: {
					mobileWebUrl: URL,
					webUrl: URL,
				},
			},
		],
	});
};

interface XSharingProps {
	sendText: string;
	pageUrl: string;
	bgWhite?: boolean;
}
/**
 * 트위터 공유하기
 */
export const XSharing = (x: XSharingProps) => {
	return () => window.open(`https://twitter.com/intent/tweet?text=${x.sendText}&url=${x.pageUrl}`);
};
