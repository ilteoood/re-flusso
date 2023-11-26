import { setTimeout } from "timers/promises";
import { describe, expect, it } from "vitest";
import { filter } from "../src/filter";
import { fromIterable } from "../src/fromIterable";
import { toArray } from "../src/toArray";

describe("filter", () => {
	it("should filter a stream", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		const filterStream = filter<number>((value) => value % 2 === 0);

		await fromIterable(sourceArray)
			.pipeThrough(filterStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([2]);
	});

	it("should not break for an empty array", async () => {
		const sourceArray = [];
		const destinationArray = [];

		const filterStream = filter<number>(() => false);
		await fromIterable(sourceArray)
			.pipeThrough(filterStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([]);
	});

	it("should throw if parameter is undefined", async () => {
		// @ts-expect-error undefined parameter for test
		const filterStream = filter<number>(undefined);

		expect(
			fromIterable([1])
				.pipeThrough(filterStream)
				.pipeTo(toArray([] as number[])),
		).rejects.toThrow("callbackfn is not a function");
	});

	it("should handle promises", async () => {
		const sourceArray = [1, 2, 3];
		const destinationArray = [];

		const filterStream = filter<number>(async (value) => {
			await setTimeout(0)
			return value % 2 === 0
		});
		await fromIterable(sourceArray)
			.pipeThrough(filterStream)
			.pipeTo(toArray(destinationArray));

		expect(destinationArray).toEqual([2]);
	})
});
