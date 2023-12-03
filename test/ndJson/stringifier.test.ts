import { describe, expect, it } from "vitest";
import { fromIterable } from "../../src/fromIterable";
import { stringifier } from "../../src/ndJson/stringifier";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("ndJson stringifier", () => {
	describe("stringifier", () => {
		it("should stringify an array", async () => {
			const destinationArray = [];

			await pipeline(
				fromIterable([{ value: 1 }, { value: 2 }, { value: 3 }]),
				stringifier(),
				toArray(destinationArray),
			);

			expect(destinationArray).toEqual([
				'{"value":1}',
				'\n{"value":2}',
				'\n{"value":3}',
			]);
		});
	});
});
