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
		pipeline: ReadableStream,
		stream: WritableStream | TransformStream,
		index: number,
	): ReadableStream | Promise<void> => {
		if (index === lastPipelineItem && stream instanceof WritableStream) {
			return pipeline.pipeTo(stream);
		}

		return pipeline.pipeThrough(stream as TransformStream);
	};

export const pipeline: PipelineType = ((
	source: ReadableStream,
	...streams: (TransformStream | WritableStream)[]
): ReadableStream | Promise<void> => {
	const lastPipelineItem = streams.length - 1;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return streams.reduce<any>(
		pipelineReducerBuilder(lastPipelineItem),
		source,
	);
}) as PipelineType;