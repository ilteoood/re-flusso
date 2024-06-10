import { filter } from "./filter";

export const equals = (
    value: unknown,
    writableStrategy?: QueuingStrategy,
    readableStrategy?: QueuingStrategy,
) => {
    return filter(
        (chunk: unknown) => chunk === value,
        writableStrategy,
        readableStrategy,
    );
};
