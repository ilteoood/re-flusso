import { faker } from '@faker-js/faker';
import fastify from 'fastify';
import { Readable } from 'node:stream';

const server = fastify();

const itemsToGenerate = 1_000_000;

server.get('/users', (request, reply) => {
  return reply
    .header('Content-Type', 'application/octet-stream')
    .send(
      Readable.from(function* () {
        for (let i = 0; i < itemsToGenerate; i++) {
          yield JSON.stringify({
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            age: faker.number.int({ min: 0, max: 100 }),
          }).concat(i === itemsToGenerate ? '' : '\n');
        }
      }())
    );
});

await server.listen({ port: 3000 }, (error, address) => {
  server.log.info(`server listening on ${address}`);
})
