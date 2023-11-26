import { describe, expect, it } from "vitest";
import { fromArray } from "../src/fromArray";

describe("fromArray", () => {
	it("should create a readable stream from an array", async () => {
		const array = [1, 2, 3];

		const reader = fromArray(array).getReader();

		for (let i = 0; i < array.length; i++) {
			const result = await reader.read();
			expect(result.value).toEqual(array[i]);
			expect(result.done).toEqual(false);
		}

		expect(await reader.read()).toEqual({ done: true, value: undefined });
	});

	it("should not break for an empty array", async () => {
		const reader = fromArray([]).getReader();

		expect(await reader.read()).toEqual({ done: true, value: undefined });
	});

	it("should throw if parameter is undefined", () => {
		// @ts-expect-error undefined parameter for test
		expect(() => fromArray(undefined)).toThrow(
			"Cannot read properties of undefined (reading 'length')",
		);
	});
});
