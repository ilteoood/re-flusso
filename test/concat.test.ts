import { describe, expect, test } from "vitest";

import { concat } from "../src/concat";
import { fromIterable } from "../src/fromIterable";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("concat", () => {
	test("should concat streams", async () => {
		const destinationArray = [];

		await pipeline(
			concat(fromIterable([1, 4]), fromIterable([2, 5]), fromIterable([3, 6])),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([1, 4, 2, 5, 3, 6]);
	});

	test("should concat streams even if first stream is empty", async () => {
		const destinationArray = [];

		await pipeline(
			concat(fromIterable([]), fromIterable([2]), fromIterable([3])),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([2, 3]);
	});
});
