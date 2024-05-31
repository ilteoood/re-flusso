import { filter } from "../filter";

export const greaterThanEqual = (
    value: number,
    writableStrategy?: QueuingStrategy,
    readableStrategy?: QueuingStrategy,
) => {
    return filter((chunk: number) => chunk >= value, writableStrategy, readableStrategy);
};
