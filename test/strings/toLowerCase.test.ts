import { describe, expect, test } from "vitest";

import { fromIterable } from "../../src/fromIterable";
import { pipeline } from "../../src/pipeline";
import { toLowerCase } from "../../src/strings/toLowerCase";
import { toArray } from "../../src/toArray";

describe("toLowerCase", () => {
	test("should toLowerCase strings", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable(["A", "B", "C"]),
			toLowerCase(),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["a", "b", "c"]);
	});
});
