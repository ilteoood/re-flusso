import { setTimeout } from "timers/promises";
import { describe, expect, test } from "vitest";

import { fromIterable } from "../src/fromIterable";
import { map } from "../src/map";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("pipeline", () => {
	test("should correctly handle mixed pipeline", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			map((value) => value * 2),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([2, 4, 6]);
	});

	test("should correctly handle transform and write pipelines separately", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		const mappingPipeline = pipeline(
			fromIterable(sourceArray),
			map((value) => value * 2),
		);

		await pipeline(mappingPipeline, toArray(destinationArray));

		expect(destinationArray).toEqual([2, 4, 6]);
	});

	test("should correctly handle write pipeline", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(fromIterable(sourceArray), toArray(destinationArray));

		expect(destinationArray).toEqual(sourceArray);
	});

	test("should correctly throw if there are 2 readable streams", async () => {
		expect(() =>
			pipeline(
				fromIterable([1]),
				// @ts-expect-error the >2 parameter should never be a readable stream
				fromIterable([2]),
			),
		).toThrow(
			'The "transform.readable" property must be an instance of ReadableStream. Received undefined',
		);
	});

	test("should correctly handle promises", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		await pipeline(
			fromIterable(sourceArray),
			map(async (value) => {
				await setTimeout(1);
				return value * 2;
			}),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual([2, 4, 6]);
	});

	test("can consume the tee readable stream multiple times", async () => {
		const sourceStream = fromIterable([1, 2, 3]);
		const [source1, source2] = sourceStream.tee();

		const destinationArrayTimes2 = [];
		const destinationArrayTimes3 = [];

		await Promise.all([
			pipeline(
				source1,
				map((value) => value * 2),
				toArray(destinationArrayTimes2),
			),
			pipeline(
				source2,
				map((value) => value * 3),
				toArray(destinationArrayTimes3),
			),
		]);

		expect(destinationArrayTimes2).toEqual([2, 4, 6]);
		expect(destinationArrayTimes3).toEqual([3, 6, 9]);
	});
});
