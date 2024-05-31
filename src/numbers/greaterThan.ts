import { filter } from "../filter";

export const greaterThan = (
	value: number,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return filter(
		(chunk: number) => chunk > value,
		writableStrategy,
		readableStrategy,
	);
};
