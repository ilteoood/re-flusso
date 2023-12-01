const recursivePromiseBuilder = <T>(
	reader: ReadableStreamDefaultReader<T>,
	controller: ReadableStreamDefaultController<T>,
) => {
	const recursivePromise = async () => {
		const readResult = await reader.read();

		if (!readResult.done) {
			controller.enqueue(readResult.value);

			return recursivePromise();
		}
	};

	return recursivePromise();
};

export const merge = <T>(...readableStreams: ReadableStream<T>[]) => {
	const fallbackedStreams = readableStreams ?? [];

	return new ReadableStream<T>({
		async pull(controller) {
			await Promise.all(
				fallbackedStreams.map((stream) =>
					recursivePromiseBuilder(stream.getReader(), controller),
				),
			);

			controller.close();
		},
	});
};
