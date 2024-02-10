import { hashPathMap, toHashMap } from '@/constant/path-hash-map';

export const generateHashPath = (genderAgeStr: string) => {
	return toHashMap[genderAgeStr];
};

export const getGenderAndAge = (hashPath: string) => {
	return hashPathMap[hashPath];
};
