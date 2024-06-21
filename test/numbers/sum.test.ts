import { describe, expect, test } from "vitest";
import { fromRange } from "../../src/numbers/fromRange";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";
import { fromIterable } from "../../src/fromIterable";
import { sum } from "../../src/numbers/sum";

describe("sum", () => {
	test("should work with empty list", async () => {
		const destinationArray = [];

		await pipeline(fromIterable([]), sum(), toArray(destinationArray));

		expect(destinationArray).toEqual([0]);
	});

	test("should correctly sum numbers", async () => {
		const destinationArray = [];

		await pipeline(fromRange(1, 3), sum(), toArray(destinationArray));

		expect(destinationArray).toEqual([6]);
	});
});
