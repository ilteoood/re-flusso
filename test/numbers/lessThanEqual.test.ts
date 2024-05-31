import { describe, expect, test } from "vitest";
import { fromIterable } from "../../src/fromIterable";
import { fromRange } from "../../src/numbers/fromRange";
import { lessThanEqual } from "../../src/numbers/lessThanEqual";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";

describe("lessThan", () => {
    test("should work with empty list", async () => {
        const destinationArray = [];

        await pipeline(fromIterable([]), lessThanEqual(0), toArray(destinationArray));

        expect(destinationArray).toEqual([]);
    });

    test("should correctly filter numbers", async () => {
        const destinationArray = [];

        await pipeline(fromRange(1, 3), lessThanEqual(3), toArray(destinationArray));

        expect(destinationArray).toEqual([1, 2, 3]);
    });
});
