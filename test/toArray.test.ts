import { describe, expect, it } from "vitest";
import { fromIterable } from "../src/fromIterable";
import { toArray } from "../src/toArray";

describe("toArray", () => {
	it("should accumulate a stream into an array", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await fromIterable(sourceArray).pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual(sourceArray);
	});

	it("should not break for an empty array", async () => {
		const sourceArray = [];
		const destinationArray = [];

		await fromIterable(sourceArray).pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual(sourceArray);
	});

	it("should throw if parameter is undefined", async () => {
		// @ts-expect-error undefined parameter for test
		expect(fromIterable([1]).pipeTo(toArray(undefined))).rejects.toThrow(
			"Cannot read properties of undefined (reading 'push')",
		);
	});

	it("should not throw if source stream is empty", async () => {
		// @ts-expect-error undefined parameter for test
		expect(
			fromIterable([]).pipeTo(toArray(undefined)),
		).resolves.toBeUndefined();
	});
});
