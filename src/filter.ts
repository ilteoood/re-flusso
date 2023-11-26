type CallbackFn<T> = (value: T, index: number) => boolean | Promise<boolean>;

export const filter = <T>(
	callbackfn: CallbackFn<T>,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let index = 0;
	return new TransformStream<T, T>(
		{
			async transform(chunk, controller) {
				const result = await callbackfn(chunk, index++);
				if (result) {
					controller.enqueue(chunk);
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
