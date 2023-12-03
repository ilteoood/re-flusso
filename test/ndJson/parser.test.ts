import { describe, expect, it } from "vitest";
import { fetchText } from "../../src/fetchText";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";
import { parser } from "../../src/ndJson/parser";

describe("ndJson parser", () => {
	it("should parse an ndJson string", async () => {
		const destinationArray = [];
		const response = await fetch(
			"https://gist.githubusercontent.com/rfmcnally/0a5a16e09374da7dd478ffbe6ba52503/raw/095e75121f31a8b7dc88aa89dbd637a944ce264a/ndjson-sample.json",
		);

		await pipeline(fetchText(response), parser(), toArray(destinationArray));

		expect(destinationArray).toHaveLength(5);
	});
});
