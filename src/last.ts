export const last = <T>(
	lastItemsToKeep = 1,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
): TransformStream<T> => {
	const lastItems: T[] = [];

	return new TransformStream<T, T>(
		{
			transform(chunk, controller) {
				lastItems.push(chunk);

				if (lastItems.length > lastItemsToKeep) {
					lastItems.splice(0, 1);
				}
			},

			flush(controller) {
				for (const item of lastItems) {
					controller.enqueue(item);
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
