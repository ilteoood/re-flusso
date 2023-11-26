export const toArray = <T>(
	destinationArray: T[],
	strategy?: QueuingStrategy,
): WritableStream<T> => {
	return new WritableStream<T>(
		{
			write(chunk) {
				destinationArray.push(chunk);
			},
		},
		strategy,
	);
};
