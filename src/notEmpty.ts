export const notEmpty = (
	error: Error = new Error("Stream is empty"),
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let isEmpty = true;
	return new TransformStream(
		{
			transform() {
				isEmpty = false;
			},
			flush() {
				if (isEmpty) {
					throw error;
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
