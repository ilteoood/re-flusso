export const toArray = <T>(destinationArray: T[]): WritableStream<T> => {
	return new WritableStream<T>({
		write(chunk) {
			destinationArray.push(chunk);
		},
	});
};
