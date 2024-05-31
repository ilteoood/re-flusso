import { describe, expect, test } from "vitest";
import { fromRange } from "../../src/numbers/fromRange";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";
import { fromIterable } from "../../src/fromIterable";
import { greaterThanEqual } from "../../src/numbers/greaterThanEqual";

describe("greaterThanEqual", () => {
	test("should work with empty list", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([]),
			greaterThanEqual(0),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([]);
	});

	test("should correctly filter numbers", async () => {
		const destinationArray = [];

		await pipeline(
			fromRange(1, 3),
			greaterThanEqual(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([1, 2, 3]);
	});
});
