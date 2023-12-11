export const notEmpty = <T>(
	error: Error = new Error("Stream is empty"),
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let isEmpty = true;

	return new TransformStream<T, T>(
		{
			transform(chunk, controller) {
				isEmpty = false;
				controller.enqueue(chunk);
			},
			flush() {
				if (isEmpty) {
					throw error;
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
