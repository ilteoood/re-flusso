export const concat = (...readableStreams: ReadableStream[]) => {
	const fallbackedStreams = readableStreams ?? [];
	const readableStreamsLength = fallbackedStreams.length;

	return new ReadableStream({
		async start(controller) {
			for (let i = 0; i < readableStreamsLength; i++) {
				const reader = fallbackedStreams[i].getReader();

				while (true) {
					const readResult = await reader.read();

					if (readResult.done) {
						break;
					}

					controller.enqueue(readResult.value);
				}
			}

			controller.close();
		},
	});
};
