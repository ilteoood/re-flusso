export const fromRange = (
	min: number,
	max: number,
	step = 1,
	strategy?: QueuingStrategy,
): ReadableStream<number> => {
	let currentValue = min;
	return new ReadableStream<number>(
		{
			pull(controller) {
				if (currentValue <= max) {
					controller.enqueue(currentValue);
					currentValue += step;
				} else {
					controller.close();
				}
			},
		},
		strategy,
	);
};
