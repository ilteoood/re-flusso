export const split = <T>(
	separator = ",",
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	return new TransformStream<string, string>(
		{
			transform(chunk, controller) {
				for (const item of chunk.split(separator)) {
					controller.enqueue(item);
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
