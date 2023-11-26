import { describe, expect, it } from "vitest";

import { fromIterable } from "../src/fromIterable";
import { pipeline } from "../src/pipeline";
import { skip } from "../src/skip";
import { toArray } from "../src/toArray";

describe("skip", () => {
	it("should skip items", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			skip(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([2, 3]);
	});

	it("should not break for an empty array", async () => {
		const sourceArray = [];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			skip(1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([]);
	});

	it("should send all items when no parameters are provided", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			skip(),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(sourceArray);
	});

	it("should send all items when parameter is < 0", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			skip(-1),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(sourceArray);
	});
});
