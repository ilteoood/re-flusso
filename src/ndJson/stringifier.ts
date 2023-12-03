const stringifyNewLine = <T>(chunk: T) => `\n${JSON.stringify(chunk)}`;
const stringifyFirstLine = <T>(chunk: T) => JSON.stringify(chunk);

export const stringifier = <T>(
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let enqueue = (chunk: T) => {
		const result = stringifyFirstLine(chunk);
		enqueue = stringifyNewLine;
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
