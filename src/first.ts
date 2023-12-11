export const first = <T>(
	firstItemsToKeep = 1,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
): TransformStream<T> => {
	let itemsSent = 0;

	return new TransformStream<T, T>(
		{
			transform(chunk, controller) {
				if (itemsSent++ < firstItemsToKeep) {
					controller.enqueue(chunk);
				} else {
					controller.terminate();
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
