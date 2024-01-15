export const toLowerCase = (
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return new TransformStream<string, string>(
		{
			transform(chunk, controller) {
				controller.enqueue(chunk.toLowerCase());
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
