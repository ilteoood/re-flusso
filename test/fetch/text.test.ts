import { describe, expect, test } from "vitest";
import { text } from "../../src/fetch/text";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("text", () => {
	test("should fetch text", async () => {
		const destinationArray = [];
		const response = await fetch(
			"https://gist.githubusercontent.com/rfmcnally/0a5a16e09374da7dd478ffbe6ba52503/raw/095e75121f31a8b7dc88aa89dbd637a944ce264a/ndjson-sample.json",
		);

		await pipeline(text(response), toArray(destinationArray));

		expect(destinationArray.join("")).toHaveLength(7476);
	});
});
