type CallbackFn<T> = (value: T, index: number) => void | Promise<void>;

export const forEach = <T>(
	callbackfn: CallbackFn<T>,
	writableStrategy?: QueuingStrategy
) => {
	let index = 0;
	return new WritableStream<T>(
		{
			async write(chunk) {
                await callbackfn(chunk, index++);
			},
		},
		writableStrategy
	);
};
