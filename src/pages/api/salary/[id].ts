// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};
// []

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({ name: 'John Doe' });
}

/* prettier-ignore */
const pathHashMap = {
	"3de60d": { gender: 'female', age: '1'},
	"6dbe1e": { gender: 'female', age: '2'},
	"d2c8df": { gender: 'female', age: '3'},
	"06378f": { gender: 'female', age: '4'},
	"0ac3ac": { gender: 'female', age: '5'},
	"2a5eaa": { gender: 'female', age: '6'},
	"920cf5": { gender: 'female', age: '7'},
	"30241f": { gender: 'female', age: '8'},
	"2f912d": { gender: 'female', age: '9'},
	"4d2028": { gender: 'female', age: '10'},
	"0b2e0b": { gender: 'male', age: '1'},
	"6171fb": { gender: 'male', age: '2'},
	"c8741f": { gender: 'male', age: '3'},
	"a0542f": { gender: 'male', age: '4'},
	"c38c3e": { gender: 'male', age: '5'},
	"8e4233": { gender: 'male', age: '6'},
	"8845aa": { gender: 'male', age: '7'},
	"453dae": { gender: 'male', age: '8'},
	"81c09d": { gender: 'male', age: '9'},
	"c8cb8b": { gender: 'male', age: '10'},
}
