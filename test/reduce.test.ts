import { setTimeout } from "node:timers/promises";
import { describe, expect, test } from "vitest";

import { fromIterable } from "../src/fromIterable";
import { pipeline } from "../src/pipeline";
import { reduce } from "../src/reduce";
import { toArray } from "../src/toArray";

describe("reduce", () => {
	test("should reduce stream", async () => {
		const result = [];

		await pipeline(
			fromIterable([1, 2, 3, 4, 5]),
			reduce((a, b) => a + b, 0),
			toArray(result),
		);

		expect(result).toEqual([15]);
	});

	test("should reduce stream with async function", async () => {
		const result = [];

		await pipeline(
			fromIterable([1, 2, 3, 4, 5]),
			reduce((a, b) => {
				setTimeout(100);
				return a + b;
			}, 0),
			toArray(result),
		);

		expect(result).toEqual([15]);
	});

	test("should reduce stream without initial parameter", async () => {
		const result = [];

		await pipeline(
			fromIterable([1, 2, 3, 4, 5]),
			reduce((a, b) => a + b, undefined),
			toArray(result),
		);

		expect(result).toEqual([Number.NaN]);
	});
});
