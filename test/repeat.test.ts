import { describe, expect, test } from "vitest";

import { pipeline } from "../src/pipeline";
import { repeat } from "../src/repeat";
import { toArray } from "../src/toArray";

describe("repeat", () => {
	test("should correctly repeat item", async () => {
		const destinationArray = [];

		await pipeline(repeat("1", 3), toArray(destinationArray));

		expect(destinationArray).toEqual(new Array(3).fill("1"));
	});

	test("should not throw if count === 0", async () => {
		const destinationArray = [];

		await pipeline(repeat("1", 0), toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});

	test("should not throw if count < 0", async () => {
		const destinationArray = [];

		await pipeline(repeat("1", -10), toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});
});
