export const fromArray = <T>(array: T[]): ReadableStream<T> => {
	const arrayLength = array.length;
	return new ReadableStream<T>({
		start(controller) {
			for (let i = 0; i < arrayLength; i++) {
				controller.enqueue(array[i]);
			}
			controller.close();
		},
	});
};
