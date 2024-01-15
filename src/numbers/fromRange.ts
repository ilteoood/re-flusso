export const fromRange = (
	min: number,
	max: number,
	strategy?: QueuingStrategy,
): ReadableStream<number> => {
	let currentValue = min;
	return new ReadableStream<number>(
		{
			pull(controller) {
				if (currentValue <= max) {
					controller.enqueue(currentValue);
					currentValue++;
				} else {
					controller.close();
				}
			},
		},
		strategy,
	);
};
