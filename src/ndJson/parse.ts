export const parse = <T>(
	writableStrategy?: QueuingStrategy,
	readableStrategy?: QueuingStrategy,
) => {
	let buffer = "";

	return new TransformStream<string, T>(
		{
			transform(chunk, controller) {
				for (const line of `${buffer}${chunk}`.split("\n")) {
					if (line !== "") {
						try {
							controller.enqueue(JSON.parse(line));
							buffer = "";
						} catch (error) {
							buffer += line;
						}
					}
				}
			},
		},
		writableStrategy,
		readableStrategy,
	);
};
