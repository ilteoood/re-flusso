export const join = (
	separator = ",",
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	const joinNewItem = <T>(chunk: T) => `${separator}${chunk}`;

	let joinChunk = (chunk: string) => {
		joinChunk = joinNewItem;
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
