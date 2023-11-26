export const fromIterable = <T>(
	sourceIterable: Iterable<T>,
	strategy?: QueuingStrategy,
): ReadableStream<T> => {
	return new ReadableStream<T>(
		{
			start(controller) {
				for (const value of sourceIterable) {
					controller.enqueue(value);
				}
				controller.close();
			},
		},
		strategy,
	);
};
