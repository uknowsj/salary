export const gender = {
	MALE: '남성',
	FEMALE: '여성',
} as const;
export type GenderKey = keyof typeof gender;
export type GenderValue = (typeof gender)[keyof typeof gender];

export const ageMap = {
	0: '20세 미만',
	1: '20 ~ 24',
	2: '25 ~ 29',
	3: '30 ~ 34',
	4: '35 ~ 39',
	5: '40 ~ 44',
	6: '45 ~ 49',
	7: '50 ~ 54',
	8: '55 ~ 59',
	9: '60세 이상',
};
export type AgeKey = keyof typeof ageMap;
export type AgeValue = (typeof ageMap)[keyof typeof ageMap];
