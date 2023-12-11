import { faker } from "@faker-js/faker";
import { stringify } from "@ilteoood/re-flusso/ndJson/stringify";
import { pipeline } from "@ilteoood/re-flusso/pipeline";
import fastify from "fastify";
import { Readable } from "node:stream";

const server = fastify();

const itemsToGenerate = 100_000;

function* userGenerator() {
	for (let i = 1; i <= itemsToGenerate; i++) {
		yield {
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			age: faker.number.int({ min: 0, max: 100 }),
		};
	}
}

server.get("/users", (_, reply) => {
	const readableStream = pipeline(
		ReadableStream.from(userGenerator()),
		stringify(),
	);

	return reply
		.header("Content-Type", "application/octet-stream")
		.send(Readable.fromWeb(readableStream));
});

await server.listen({ port: 3000 }, (error, address) => {
	server.log.info(`server listening on ${address}`);
});
