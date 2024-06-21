import { reduce } from "../reduce";

export const sum = (
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return reduce<number, number>(
		(accumulator: number, currentValue: number) => accumulator + currentValue,
		0,
		writableStrategy,
		readableStrategy,
	);
};
