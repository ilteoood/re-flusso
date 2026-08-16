import { describe, expect, it } from "vitest";
import { text } from "../../src/fetch/text";
import { parse } from "../../src/ndJson/parse";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("ndJson parse", () => {
	it("should parse an ndJson string", async () => {
		const destinationArray = [];
		const body =
			'{"id":1,"name":"Alice"}\n{"id":2,"name":"Bob"}\n{"id":3,"name":"Carol"}\n{"id":4,"name":"Dave"}\n{"id":5,"name":"Eve"}\n';
		const response = new Response(body);

		await pipeline(text(response), parse(), toArray(destinationArray));

		expect(destinationArray).toHaveLength(5);
	});
});
