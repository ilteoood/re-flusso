import { describe, expect, test } from "vitest";
import { fromRange } from "../../src/numbers/fromRange";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("fromRange", () => {
	test("should generate range", async () => {
		const destinationArray = [];

		await pipeline(fromRange(1, 3), toArray(destinationArray));

		expect(destinationArray).toEqual([1, 2, 3]);
	});

	test("should generate range for negative numbers", async () => {
		const destinationArray = [];

		await pipeline(fromRange(-1, 3), toArray(destinationArray));

		expect(destinationArray).toEqual([-1, 0, 1, 2, 3]);
	});

	test("should generate range with step", async () => {
		const destinationArray = [];

		await pipeline(fromRange(1, 3, 2), toArray(destinationArray));

		expect(destinationArray).toEqual([1, 3]);
	});

	test("should generate empty range when min > max", async () => {
		const destinationArray = [];

		await pipeline(fromRange(3, 1), toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});
});
