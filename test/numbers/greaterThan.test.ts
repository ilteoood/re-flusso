import { describe, expect, test } from "vitest";
import { fromRange } from "../../src/numbers/fromRange";
import { pipeline } from "../../src/pipeline";
import { toArray } from "../../src/toArray";
import { fromIterable } from "../../src/fromIterable";
import { greaterThan } from "../../src/numbers/greaterThan";

describe("greaterThan", () => {
    test("should work with empty list", async () => {
        const destinationArray = [];

        await pipeline(fromIterable([]), greaterThan(0), toArray(destinationArray));

        expect(destinationArray).toEqual([]);
    });

    test("should correctly filter numbers", async () => {
        const destinationArray = [];

        await pipeline(fromRange(1, 3), greaterThan(1), toArray(destinationArray));

        expect(destinationArray).toEqual([2, 3]);
    });
});
