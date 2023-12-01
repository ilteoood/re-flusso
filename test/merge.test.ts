import { describe, expect, test } from "vitest";

import { fromIterable } from "../src/fromIterable";
import { merge } from "../src/merge";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("merge", () => {
	test("should merge streams", async () => {
		const destinationArray = [];

		await pipeline(
			merge(fromIterable([1]), fromIterable([2]), fromIterable([3])),
			toArray(destinationArray),
		);

		expect(destinationArray).toContain(1);
		expect(destinationArray).toContain(2);
		expect(destinationArray).toContain(3);
	});

	test("should merge streams even if first stream is empty", async () => {
		const destinationArray = [];

		await pipeline(
			merge(fromIterable([]), fromIterable([2]), fromIterable([3])),
			toArray(destinationArray),
		);

		expect(destinationArray).toContain(2);
		expect(destinationArray).toContain(3);
	});
});
