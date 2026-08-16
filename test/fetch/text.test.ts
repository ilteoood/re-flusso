import { describe, expect, test } from "vitest";
import { text } from "../../src/fetch/text";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("text", () => {
	test("should fetch text", async () => {
		const destinationArray = [];
		const response = new Response("x".repeat(7476));

		await pipeline(text(response), toArray(destinationArray));

		expect(destinationArray.join("")).toHaveLength(7476);
	});
});
