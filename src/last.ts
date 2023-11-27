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
				const itemsLength = lastItems.length;

				for (let i = 0; i < itemsLength; i++) {
					controller.enqueue(lastItems[i]);
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
