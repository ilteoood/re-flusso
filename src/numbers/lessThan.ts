import { filter } from "../filter";

export const lessThan = (
	value: number,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return filter(
		(chunk: number) => chunk < value,
		writableStrategy,
		readableStrategy,
	);
};
