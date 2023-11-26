import { describe, expect, it } from "vitest";

import { accumulator } from "../src/accumulator";
import { fromIterable } from "../src/fromIterable";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("accumulator", () => {
	it("should accumulate a stream into an array", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			accumulator(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([[1], [2], [3]]);
	});

	it("should throw if parameter = 0", async () => {
		expect(() => accumulator(0)).toThrow("chunkSize must be greater than 0");
	});

	it("should throw if parameter < 0", async () => {
		expect(() => accumulator(-1)).toThrow("chunkSize must be greater than 0");
	});

	it("should work if chunkSize is bigger than source size", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			accumulator(4),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([sourceArray]);
	});
});
