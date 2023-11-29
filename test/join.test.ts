import { describe, expect, test } from "vitest";
import { fromIterable } from "../src/fromIterable";
import { join } from "../src/join";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("join", () => {
	test("should join strings", async () => {
		const destinationArray = [];

		await pipeline(fromIterable([1, 2, 3]), join(), toArray(destinationArray));

		expect(destinationArray).toEqual(["1,2,3"]);
	});

	test("should join strings with custom separator", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([1, 2, 3]),
			join("-"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["1-2-3"]);
	});

	test("should not throw with objects", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([{ a: 1 }, { a: 2 }, { a: 3 }]),
			join("-"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([
			"[object Object]-[object Object]-[object Object]",
		]);
	});

	test("should work with stringifiable objects", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([
				{ a: 1, toString: () => "a1" },
				{ a: 2, toString: () => "a2" },
				{ a: 3, toString: () => "a3" },
			]),
			join("-"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["a1-a2-a3"]);
	});

	test("should not throw with arrays", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable([
				[1, 2],
				[3, 4],
				[5, 6],
			]),
			join("-"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["1,2-3,4-5,6"]);
	});
});
