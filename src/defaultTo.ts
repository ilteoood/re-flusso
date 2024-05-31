import { map } from "./map";

export const defaultTo = <T>(
	defaultValue: T,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return map(
		(chunk) => chunk ?? defaultValue,
		writableStrategy,
		readableStrategy,
	);
};
