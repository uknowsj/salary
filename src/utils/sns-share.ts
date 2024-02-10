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

	window.Kakao.Share.createDefaultButton({
		container: '#kakaotalk-sharing-btn',
		objectType: 'feed',
		content: {
			title: '나는 친구보다 얼마나 더 벌고 있을까?',
			description, // 결과
			imageUrl: `/result-thumbnail.png`,
			link: {
				mobileWebUrl: RESULT_URL,
				webUrl: RESULT_URL,
			},
		},
		itemContent: {
			profileText: '재미로 비교해보는 내 연봉 위치',
			profileImageUrl: `/thumbnail.png`,
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
