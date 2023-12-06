const readData = <T>(reader: ReadableStreamDefaultReader<T>) => reader.read();

const isStreamNotDone = <T>(result: ReadableStreamReadResult<T>) =>
	!result.done;

export const merge = <T>(...readableStreams: ReadableStream<T>[]) => {
	const readers = (readableStreams ?? []).map((stream) => stream.getReader());

	return new ReadableStream<T>({
		async pull(controller) {
			const resultsWithData = (await Promise.all(readers.map(readData))).filter(
				isStreamNotDone,
			);

			if (resultsWithData.length === 0) {
				controller.close();
			} else {
				for (const item of resultsWithData) {
					controller.enqueue(item.value);
				}
			}
		},
	});
};
