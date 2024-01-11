import { describe, expect, it } from "vitest";
import { fromIterable } from "../src/fromIterable";

describe("fromIterable", () => {
	it("should create a readable stream from an array", async () => {
		const array = [1, 2, 3];

		const reader = fromIterable(array).getReader();

		for (let i = 0; i < array.length; i++) {
			const result = await reader.read();
			expect(result.value).toEqual(array[i]);
			expect(result.done).toEqual(false);
		}

		expect(await reader.read()).toEqual({ done: true, value: undefined });
	});

	it("should create a readable stream from a set", async () => {
		const set = new Set([1, 2, 3]);

		const reader = fromIterable(set).getReader();

		for (const element of set) {
			const result = await reader.read();
			expect(result.value).toEqual(element);
			expect(result.done).toEqual(false);
		}

		expect(await reader.read()).toEqual({ done: true, value: undefined });
	});

	it("should not break for an empty array", async () => {
		const reader = fromIterable([]).getReader();

		expect(await reader.read()).toEqual({ done: true, value: undefined });
	});

	it("should throw if parameter is undefined", () => {
		// @ts-expect-error undefined parameter for test
		expect(() => fromIterable(undefined)).toThrow(
			"sourceIterable is not iterable",
		);
	});

	it("should throw if parameter is iterable", () => {
		// @ts-expect-error undefined parameter for test
		expect(() => fromIterable(1)).toThrow("sourceIterable is not iterable");
	});
});
