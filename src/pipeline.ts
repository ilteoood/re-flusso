type WritablePipeline = (
	source: ReadableStream,
	stream: WritableStream,
) => Promise<void>;

type TransformPipeline = (
	source: ReadableStream,
	...streams: TransformStream[]
) => ReadableStream;

type MixedPipeline = (
	source: ReadableStream,
	...streams: (WritableStream | TransformStream)[]
) => ReadableStream | Promise<void>;

type PipelineType = TransformPipeline & WritablePipeline & MixedPipeline;

const pipelineReducerBuilder =
	(lastPipelineItem: number) =>
	(
		pipeline: ReadableStream | Promise<void>,
		stream: WritableStream | TransformStream,
		index: number,
	): ReadableStream | Promise<void> => {
		const readable = pipeline as ReadableStream;
		if (index === lastPipelineItem && stream instanceof WritableStream) {
			return readable.pipeTo(stream);
		}

		return readable.pipeThrough(stream as TransformStream);
	};

export const pipeline: PipelineType = (
	source: ReadableStream,
	...streams: (TransformStream | WritableStream)[]
): ReadableStream | Promise<void> => {
	const lastPipelineItem = streams.length - 1;

	return streams.reduce<ReadableStream | Promise<void>>(
		pipelineReducerBuilder(lastPipelineItem),
		source,
	);
};
