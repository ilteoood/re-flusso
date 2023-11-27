export const accumulator = <T>(
	chunkSize: number,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let accumulator: T[] = [];

	return new TransformStream<T, T[]>(
		{
			async transform(chunk, controller) {
				accumulator.push(chunk);
				if (accumulator.length === chunkSize) {
					controller.enqueue(accumulator);
					accumulator = [];
				}
			},
			async flush(controller) {
				if (accumulator.length > 0) {
					controller.enqueue(accumulator);
					accumulator = [];
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
