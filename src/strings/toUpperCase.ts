export const toUpperCase = (
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return new TransformStream<string, string>(
		{
			transform(chunk, controller) {
				controller.enqueue(chunk.toUpperCase());
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
