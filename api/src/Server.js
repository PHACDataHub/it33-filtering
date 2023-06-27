import { createYoga } from "graphql-yoga";
import { createServer } from "http";

export function Server({ schema, context={ } }) {
  const yoga = createYoga({
    schema,
    context,
    cors: {
      origin: "*",
    },
  });
  const server = createServer(yoga);

  return server;
}
