export const concat = (...readableStreams: ReadableStream[]) => {
	const fallbackedStreams = readableStreams ?? [];
	let currentReaderIndex = 0;
	let currentReader = fallbackedStreams[currentReaderIndex]?.getReader();

	return new ReadableStream({
		async pull(controller) {
			if (!currentReader) {
				controller.close();
				return;
			}

			const readResult = await currentReader.read();

			if (readResult.done) {
				currentReader = fallbackedStreams[++currentReaderIndex]?.getReader();
			} else {
				controller.enqueue(readResult.value);
			}
		},
	});
};
