import { describe, expect, test } from "vitest";

import { fromIterable } from "../../src/fromIterable";
import { pipeline } from "../../src/pipeline";
import { join } from "../../src/strings/join";
import { split } from "../../src/strings/split";
import { toArray } from "../../src/toArray";

describe("split", () => {
	test("should split strings", async () => {
		const destinationArray = [];

		await pipeline(fromIterable(["1,2,3"]), split(), toArray(destinationArray));

		expect(destinationArray).toEqual(["1", "2", "3"]);
	});

	test("should split strings with custom separator", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable(["1-2-3"]),
			split("-"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["1", "2", "3"]);
	});

	test("works well with join", async () => {
		const destinationArray = [];

		await pipeline(
			fromIterable(["1-2-3"]),
			split("-"),
			join("|"),
			toArray(destinationArray),
		);

		expect(destinationArray).toEqual(["1|2|3"]);
	});
});
