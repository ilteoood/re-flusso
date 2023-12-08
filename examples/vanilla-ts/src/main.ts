import { fetchText } from "@ilteoood/re-flusso/fetchText";
import { filter } from "@ilteoood/re-flusso/filter";
import { map } from "@ilteoood/re-flusso/map";
import { parse } from "@ilteoood/re-flusso/ndJson/parse";
import { pipeline } from "@ilteoood/re-flusso/pipeline";
import { reduce } from "@ilteoood/re-flusso/reduce";

interface User {
	name: string;
	surname: string;
	age: number;
}

interface ReducedUser {
	people: number;
	ages: number;
}

const response = await fetch("/users");
const [response1, response2] = fetchText(response).tee();

const containers = {
	adult: document.querySelector<HTMLUListElement>(
		"#adultList",
	) as HTMLUListElement,
	child: document.querySelector<HTMLUListElement>(
		"#childList",
	) as HTMLUListElement,
};

const calculateMean = (reducedUser: ReducedUser) =>
	reducedUser.ages / reducedUser.people || 0;

const ageReducer = (acc: ReducedUser, user: User) => {
	acc.people++;
	acc.ages += user.age;
	return acc;
};

const writeContent = (kind: "adult" | "child") => (mean: number) => {
	containers[kind].textContent = `The mean age for ${kind} is ${mean}`;
};

await Promise.all([
	pipeline(
		response1,
		parse(),
		filter((user) => user.age >= 18),
		reduce(ageReducer, { people: 0, ages: 0 }),
		map(calculateMean),
		new WritableStream({ write: writeContent("adult") }),
	),
	pipeline(
		response2,
		parse(),
		filter((user) => user.age < 18),
		reduce(ageReducer, { people: 0, ages: 0 }),
		map(calculateMean),
		new WritableStream({ write: writeContent("child") }),
	),
]);
