import { describe, expect, test } from "vitest";

import { fromIterable } from "../../src/fromIterable";
import { pipeline } from "../../src/pipeline";
import { toUpperCase } from "../../src/strings/toUpperCase";
import { toArray } from "../../src/toArray";

describe("toUpperCase", () => {
	test("should toUpperCase strings", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable(["a", "b", "c"]),
			toUpperCase(),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["A", "B", "C"]);
	});
});
