import { describe, expect, test } from "vitest";
import { fromIterable } from "../src/fromIterable";
import { fromRange } from "../src/numbers/fromRange";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";
import { has } from "../src/has";

describe("in", () => {
	test("should work with empty list", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([]),
			has(new Set([0, 1, 2])),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([]);
	});

	test("should correctly filter numbers", async () => {
		const destinationArray = [];

		await pipeline(
			fromRange(1, 3),
			has(new Set([0, 1, 2])),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([1, 2]);
	});
});
