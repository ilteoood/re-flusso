export const fromArray = <T>(
	sourceArray: T[],
	strategy?: QueuingStrategy,
): ReadableStream<T> => {
	const arrayLength = sourceArray.length;
	return new ReadableStream<T>(
		{
			start(controller) {
				for (let i = 0; i < arrayLength; i++) {
					controller.enqueue(sourceArray[i]);
				}
				controller.close();
			},
		},
		strategy,
	);
};
