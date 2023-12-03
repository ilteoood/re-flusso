const identityTransform = <T>(
	chunk: T,
	controller: TransformStreamDefaultController<T>,
) => {
	controller.enqueue(chunk);
};

export const notEmpty = <T>(
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

	return new TransformStream<T, T>(
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
