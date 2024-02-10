export const isNumeric = (strNum: string) => {
	// if (!strNum) return true;
	const numericValue = parseFloat(strNum);
	return !isNaN(numericValue) && isFinite(numericValue);
};

export const addComma = (v: number) => {
	return v.toLocaleString('ko-KR');
};

export const removeComma = (v: string) => {
	// if (!v || (v as string).length === 0) return 0;
	if (isNumeric(v)) {
		return Number(v.toString().replace(/,/gi, ''));
	}
	return 0;
};

/**
 * yScale Max값에 사용하는 함수
 * 첫번째 자리의 수는 + 1, 나머지는 0으로 변경
 * @return number;
 */
export const replaceWithZeros = (num: number) => {
	let strNum = num.toString();
	let firstDigit = (Number(strNum[0]) + 1).toString();
	for (let i = 1; i < strNum.length; i++) {
		firstDigit += '0';
	}
	return Number(firstDigit);
};
