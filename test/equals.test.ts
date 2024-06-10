import { describe, expect, test } from "vitest";
import { equals } from "../src/equals";
import { fromIterable } from "../src/fromIterable";
import { fromRange } from "../src/numbers/fromRange";
import { pipeline } from "../src/pipeline";
import { toArray } from "../src/toArray";

describe("equals", () => {
    test("should work with empty list", async () => {
        const destinationArray = [];

        await pipeline(fromIterable([]), equals(0), toArray(destinationArray));

        expect(destinationArray).toEqual([]);
    });

    test("should correctly filter numbers", async () => {
        const destinationArray = [];

        await pipeline(fromRange(1, 3), equals(2), toArray(destinationArray));

        expect(destinationArray).toEqual([2]);
    });
});
