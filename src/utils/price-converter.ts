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
