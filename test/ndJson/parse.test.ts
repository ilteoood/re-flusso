import { describe, expect, it } from "vitest";
import { text } from "../../src/fetch/text";
import { parse } from "../../src/ndJson/parse";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("ndJson parse", () => {
	it("should parse an ndJson string", async () => {
		const destinationArray = [];
		const response = await fetch(
			"https://gist.githubusercontent.com/rfmcnally/0a5a16e09374da7dd478ffbe6ba52503/raw/095e75121f31a8b7dc88aa89dbd637a944ce264a/ndjson-sample.json",
		);

		await pipeline(text(response), parse(), toArray(destinationArray));

		expect(destinationArray).toHaveLength(5);
	});
});
