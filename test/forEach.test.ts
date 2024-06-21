import { setTimeout } from 'node:timers/promises';
import { describe, expect, it } from "vitest";
import { forEach } from "../src/forEach";
import { fromIterable } from "../src/fromIterable";

describe("forEach", () => {
	it("should run on empty stream", async () => {
		const sourceArray = [];
		let destination = 0;

		const forEachStream = forEach<number>((value) => {
			destination = value
		});

		await fromIterable(sourceArray).pipeTo(forEachStream);

		expect(destination).toEqual(0);
	});

	it("should run on stream", async () => {
		const sourceArray = [1, 2, 3];
		let destination = 0;

		const forEachStream = forEach<number>((value) => {
			destination = value
		});

		await fromIterable(sourceArray).pipeTo(forEachStream);

		expect(destination).toEqual(sourceArray.at(-1));
	});

	it("should throw if parameter is undefined", async () => {
		// @ts-expect-error undefined parameter for test
		const forEachStream = forEach<number>(undefined);

		expect(
			fromIterable([1]).pipeTo(forEachStream),
		).rejects.toThrow("callbackfn is not a function");
	});

	it("should handle promises", async () => {
		const sourceArray = [1, 2, 3];
		let destination = 0;

		const forEaschStream = forEach<number>(async (value) => {
			await setTimeout(0);
			destination = value;
		});

		await fromIterable(sourceArray).pipeTo(forEaschStream);

		expect(destination).toEqual(sourceArray.at(-1));
	});
});
