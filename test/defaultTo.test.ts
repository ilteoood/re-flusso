import { describe, it, expect } from "vitest";
import { defaultTo } from "../src/defaultTo";
import { fromIterable } from "../src/fromIterable";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("defaultTo", () => {
	it("should work with empty stream", async () => {
		const destinationArray = [];

		await pipeline(fromIterable([]), defaultTo(1), toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});

	it("should work with falsy values", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([false, 0]),
			defaultTo(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([false, 0]);
	});

	it("should work with nullish values", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([null, undefined]),
			defaultTo(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([1, 1]);
	});
});
