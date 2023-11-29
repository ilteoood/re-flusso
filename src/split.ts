export const split = <T>(
	separator = ",",
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return new TransformStream<string, string[]>(
		{
			transform(chunk, controller) {
				controller.enqueue(chunk.split(separator));
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
