export const fetchText = (
	response: Response,
	label?: string,
	options?: TextDecoderOptions,
) =>
	// biome-ignore lint/style/noNonNullAssertion: For this function, response must be correctly resolved
	response.body!.pipeThrough(new TextDecoderStream(label, options));
