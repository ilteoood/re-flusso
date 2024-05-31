import { describe, expect, test } from "vitest";
import { fromRange } from "../../src/numbers/fromRange";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";
import { fromIterable } from "../../src/fromIterable";
import { lessThan } from "../../src/numbers/lessThan";

describe("lessThan", () => {
    test("should work with empty list", async () => {
        const destinationArray = [];

        await pipeline(fromIterable([]), lessThan(0), toArray(destinationArray));

        expect(destinationArray).toEqual([]);
    });

    test("should correctly filter numbers", async () => {
        const destinationArray = [];

        await pipeline(fromRange(1, 3), lessThan(3), toArray(destinationArray));

        expect(destinationArray).toEqual([1, 2]);
    });
});
