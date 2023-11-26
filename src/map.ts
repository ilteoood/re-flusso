type CallbackFn<T, U> = (value: T, index: number) => U | Promise<U>;

export const map = <T, U>(
	callbackfn: CallbackFn<T, U>,
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let index = 0;
	return new TransformStream<T, U>(
		{
			async transform(chunk, controller) {
				const result = await callbackfn(chunk, index++);
				controller.enqueue(result);
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
