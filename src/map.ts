type CallbackFn<T, U> = (value: T, index: number) => U;

export const map = <T, U>(callbackfn: CallbackFn<T, U>) => {
	let index = 0;
	return new TransformStream<T, U>({
		transform(chunk, controller) {
			controller.enqueue(callbackfn(chunk, index++));
		},
	});
};
