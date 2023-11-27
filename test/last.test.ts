import { describe, expect, test } from "vitest";
import { fromIterable } from "../src/fromIterable";
import { last } from "../src/last";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("last", () => {
	test("should keep last 2 items", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			last(2),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([2, 3]);
	});

	test("should keep items even if parameter greater than number of items", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			last(4),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([1, 2, 3]);
	});

	test("should not break for an empty array", async () => {
		const sourceArray = [];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			last(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(sourceArray);
	});

	test("should work even if parameter is not defined", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			last(),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([3]);
	});

	test("should skip everything if parameter is negative", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			last(-1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([]);
	});
});
