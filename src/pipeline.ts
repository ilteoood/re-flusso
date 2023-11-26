type MixedPipeline = (
	source: ReadableStream,
	...streams: (WritableStream | TransformStream)[]
) => ReadableStream | Promise<void>;

type TransformPipeline = (
	source: ReadableStream,
	...streams: TransformStream[]
) => ReadableStream;

type WritablePipeline = (
	source: ReadableStream,
	stream: WritableStream,
) => Promise<void>;

type PipelineType = TransformPipeline & WritablePipeline & MixedPipeline;

const pipelineReducerBuilder =
	(lastPipelineItem: number) =>
	(pipeline, stream: WritableStream | TransformStream, index: number) => {
		if (index === lastPipelineItem && stream instanceof WritableStream) {
			return pipeline.pipeTo(stream);
		}

		return pipeline.pipeThrough(stream as TransformStream);
	};

export const pipeline: PipelineType = (
	source: ReadableStream,
	...streams: (TransformStream | WritableStream)[]
) => {
	const lastPipelineItem = streams.length - 1;

	return streams.reduce(pipelineReducerBuilder(lastPipelineItem), source);
};
