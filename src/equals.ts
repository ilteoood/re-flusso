import { filter } from "./filter";

export const equals = <T>(
	value: T,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return filter(
		(chunk: T) => chunk === value,
		writableStrategy,
		readableStrategy,
	);
};
