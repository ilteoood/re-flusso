export const reduce = <T, A>(
	reducer: (accumulator: A | undefined, currentValue: T) => A | Promise<A>,
	initialValue: A | undefined,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let accumulator = initialValue;

	return new TransformStream<T, A>(
		{
			async transform(chunk) {
				accumulator = await reducer(accumulator, chunk);
			},
			flush(controller) {
				controller.enqueue(accumulator);
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
