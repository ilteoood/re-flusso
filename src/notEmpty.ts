const identityTransform = <T>(
	chunk: T,
	controller: TransformStreamDefaultController<T>,
) => {
	controller.enqueue(chunk);
};

export const notEmpty = (
	error: Error = new Error("Stream is empty"),
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let isEmpty = true;

	let transform = <T>(
		chunk: T,
		controller: TransformStreamDefaultController<T>,
	) => {
		isEmpty = false;

		controller.enqueue(chunk);

		transform = identityTransform;
	};

	return new TransformStream(
		{
			transform,
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
