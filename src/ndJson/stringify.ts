type Stringifier<T> = (chunk: T) => string;

const stringifyNewLine =
	<T>(stringifier: Stringifier<T>) =>
	(chunk: T) =>
		`\n${stringifier(chunk)}`;
const stringifyFirstLine = <T>(stringifier: Stringifier<T>, chunk: T) =>
	stringifier(chunk);

export const stringify = <T>(
	stringifier: Stringifier<T> = JSON.stringify,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let enqueue = (chunk: T) => {
		const result = stringifyFirstLine(stringifier, chunk);
		enqueue = stringifyNewLine(stringifier);
		return result;
	};

	return new TransformStream<T, string>(
		{
			transform(chunk, controller) {
				controller.enqueue(enqueue(chunk));
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
