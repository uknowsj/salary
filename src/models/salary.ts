export interface SalaryDataOfOthers {
	avg: number;
	25: number;
	50: number;
	75: number;
}
export type DomainData = number[];
export type PrefixSumData = number[];

export interface TestResultData {
	salaryDataOfOthers: SalaryDataOfOthers;
	domainData: DomainData;
	prefixSumData: PrefixSumData;
}
