export const skip = <T>(
	itemsToSkip = 0,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let skippedItems = 0;

	return new TransformStream<T, T>(
		{
			async transform(chunk, controller) {
				if (skippedItems < itemsToSkip) {
					skippedItems++;
				} else {
					controller.enqueue(chunk);
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
