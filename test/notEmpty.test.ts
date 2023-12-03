import { describe, expect, test } from "vitest";

import { fromIterable } from "../src/fromIterable";
import { notEmpty } from "../src/notEmpty";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("notEmpty", () => {
	test("should not throw error if stream is not empty", async () => {
		const destinationArray = [];

		await pipeline(fromIterable([1]), notEmpty(), toArray(destinationArray));

		expect(destinationArray).toEqual([1]);
	});

	test("should throw error if stream is empty", async () => {
		expect(pipeline(fromIterable([]), notEmpty(), toArray([]))).rejects.toThrow(
			"Stream is empty",
		);
	});

	test("should throw custom error if stream is empty", async () => {
		expect(
			pipeline(
				fromIterable([]),
				notEmpty(new Error("Custom error")),
				toArray([]),
			),
		).rejects.toThrow("Custom error");
	});
});
