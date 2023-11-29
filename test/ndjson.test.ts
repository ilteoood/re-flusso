import { describe, expect, it } from "vitest";
import { fetchText } from "../src/fetchText";
import { fromIterable } from "../src/fromIterable";
import { ndJsonParser, ndJsonStringer } from "../src/ndJson";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("ndJson", () => {
	describe("ndJsonParser", () => {
		it("should parse an ndJson string", async () => {
			const destinationArray = [];
			const response = await fetch(
				"https://gist.githubusercontent.com/rfmcnally/0a5a16e09374da7dd478ffbe6ba52503/raw/095e75121f31a8b7dc88aa89dbd637a944ce264a/ndJson-sample.json",
			);

			await pipeline(
				fetchText(response),
				ndJsonParser(),
				toArray(destinationArray),
			);

			expect(destinationArray).toHaveLength(5);
		});
	});

	describe("ndJsonStringer", () => {
		it("should stringify an array", async () => {
			const destinationArray = [];

			await pipeline(
				fromIterable([{ value: 1 }, { value: 2 }, { value: 3 }]),
				ndJsonStringer(),
				toArray(destinationArray),
			);

			expect(destinationArray).toEqual([
				'{"value":1}',
				'\n{"value":2}',
				'\n{"value":3}',
			]);
		});
	});
});
