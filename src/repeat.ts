export const repeat = <T>(
	item: T,
	count: number,
	strategy?: QueuingStrategy,
) => {
	let itemSent = 0;
	return new ReadableStream<T>(
		{
			pull(controller) {
				if (itemSent++ < count) {
					controller.enqueue(item);
				} else {
					controller.close();
				}
			},
		},
		strategy,
	);
};
