export const fromIterable = <T>(
	sourceIterable: Iterable<T>,
	strategy?: QueuingStrategy,
): ReadableStream<T> => {
	if (!sourceIterable?.[Symbol.iterator]) {
		throw new Error("sourceIterable is not iterable");
	}
	const iterator = sourceIterable[Symbol.iterator]();
	return new ReadableStream<T>(
		{
			pull(controller) {
				const { value, done } = iterator.next();
				if (done) {
					controller.close();
				} else {
					controller.enqueue(value);
				}
			},
		},
		strategy,
	);
};
