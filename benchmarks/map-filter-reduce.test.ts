import { describe, bench } from "vitest";

import { pipeline } from "../src/pipeline";
import { fromIterable } from "../src/fromIterable";
import { map } from "../src/map";
import { filter } from "../src/filter";
import { sum } from "../src/numbers/sum";
import { forEach } from "../src/forEach";

describe("map-filter-reduce", () => {
	const initialArray = new Array(10_000).fill(0).map((_, index) => index);

	bench("normal", () => {
		initialArray
			.map((value) => value * 2)
			.filter((value) => value % 2 === 0)
			.reduce((accumulator, value) => accumulator + value, 0);
	});

	bench("re-flusso", async () => {
		await pipeline(
			fromIterable(initialArray),
			map((value) => value * 2),
			filter((value) => value % 2 === 0),
			sum(),
		);
	});
});
