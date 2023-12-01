const joinNewItem =
	(separator: string) =>
	<T>(chunk: T) =>
		`${separator}${chunk}`;

export const join = (
	separator = ",",
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let joinChunk = (chunk: string) => {
		joinChunk = joinNewItem(separator);
		return chunk;
	};

	let buffer = "";

	return new TransformStream<string, string>(
		{
			transform(chunk, controller) {
				buffer += joinChunk(chunk);
			},
			flush(controller) {
				controller.enqueue(buffer);
				buffer = "";
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
