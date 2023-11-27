export const first = <T>(firstItemsToKeep = 1): TransformStream<T> => {
	let itemsSent = 0;

	return new TransformStream<T, T>({
		transform(chunk, controller) {
			if (itemsSent < firstItemsToKeep) {
				itemsSent++;
				controller.enqueue(chunk);
			}
		},
	});
};
