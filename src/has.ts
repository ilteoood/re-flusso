import { filter } from "./filter";

export const has = <T>(
	values: Set<T>,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return filter(
		(chunk: T) => values.has(chunk),
		writableStrategy,
		readableStrategy,
	);
};
