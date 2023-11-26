import { setTimeout } from "timers/promises";
import { describe, expect, it } from "vitest";
import { fromIterable } from "../src/fromIterable";
import { map } from "../src/map";
import { toArray } from "../src/toArray";

describe("map", () => {
	it("should map a stream", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		const mapStream = map<number, number>((value) => value * 2);

		await fromIterable(sourceArray)
			.pipeThrough(mapStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([2, 4, 6]);
	});

	it("should not break for an empty array", async () => {
		const sourceArray = [];
		const destinationArray = [];

		const mapStream = map<number, number>((value) => value);
		await fromIterable(sourceArray)
			.pipeThrough(mapStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});

	it("should throw if parameter is undefined", async () => {
		// @ts-expect-error undefined parameter for test
		const mapStream = map<number, number>(undefined);

		expect(
			fromIterable([1])
				.pipeThrough(mapStream)
				.pipeTo(toArray([] as number[])),
		).rejects.toThrow("callbackfn is not a function");
	});

	it("should handle promises", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		const mapStream = map<number, number>(async (value) => {
			await setTimeout(0)
			return value * 3
		});
		await fromIterable(sourceArray)
			.pipeThrough(mapStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([3, 6, 9]);
	})
});
