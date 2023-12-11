import fastJson from "fast-json-stringify";
import { describe, expect, it } from "vitest";
import { fromIterable } from "../../src/fromIterable";
import { stringify } from "../../src/ndJson/stringify";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("ndJson stringify", () => {
	describe("stringify", () => {
		it("should stringify an array", async () => {
			const destinationArray = [];

			await pipeline(
				fromIterable([{ value: 1 }, { value: 2 }, { value: 3 }]),
				stringify(),
				toArray(destinationArray),
			);

			expect(destinationArray).toEqual([
				'{"value":1}',
				'\n{"value":2}',
				'\n{"value":3}',
			]);
		});

		it("should stringify with fast-json-stringify", async () => {
			const destinationArray = [];

			const stringifier = fastJson({
				type: "object",
				properties: {
					value: {
						type: "number",
					},
				},
			});

			await pipeline(
				fromIterable([
					{ value: 1, skipped: 1 },
					{ value: 2, skipped: 2 },
					{ value: 3, skipped: 3 },
				]),
				stringify(stringifier),
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
