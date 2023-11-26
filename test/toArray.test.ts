import { describe, expect, it } from "vitest";
import { fromArray } from "../src/fromArray";
import { toArray } from "../src/toArray";

describe("toArray", () => {
    it('should accumulate a stream into an array', async () => {
        const sourceArray = [1, 2, 3];
        const destinationArray = [];

        await fromArray(sourceArray).pipeTo(toArray(destinationArray));

        expect(destinationArray).toEqual(sourceArray);
    })

    it('should not break for an empty array', async () => {
        const sourceArray = [];
        const destinationArray = [];

        await fromArray(sourceArray).pipeTo(toArray(destinationArray));

        expect(destinationArray).toEqual(sourceArray);
    })

    it('should throw if parameter is undefined', async () => {
        // @ts-expect-error undefined parameter for test
        expect(fromArray([1]).pipeTo(toArray(undefined))).rejects.toThrow(
            "Cannot read properties of undefined (reading 'push')",
        );
    })

    it('should not throw if source stream is empty', async () => {
        // @ts-expect-error undefined parameter for test
        expect(fromArray([]).pipeTo(toArray(undefined))).resolves.toBeUndefined()
    })
})