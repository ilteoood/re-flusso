export const ndJsonParser = <T>(
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let buffer = "";

	return new TransformStream<string, T>(
		{
			transform(chunk, controller) {
				for (const line of `${buffer}${chunk}`.split("\n")) {
					if (line !== "") {
						try {
							controller.enqueue(JSON.parse(line));
							buffer = "";
						} catch (error) {
							buffer += line;
						}
					}
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};

const stringifyNewLine = <T>(chunk: T) => `\n${JSON.stringify(chunk)}`;
const stringifyFirstLine = <T>(chunk: T) => JSON.stringify(chunk);

export const ndJsonStringer = <T>(
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
