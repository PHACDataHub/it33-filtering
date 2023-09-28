import { schema } from "./src/Schema.js";
import { Server } from "./src/Server.js";
import { Database, aql } from "arangojs";
import 'dotenv-safe/config.js'

// call the env variables
const { DB_URL, DB_NAME, DB_USER, DB_PASS, PORT } = process.env;

// actual db connection
const db = new Database({
  url: DB_URL,
  databaseName: DB_NAME,
  auth: { username: DB_USER, password: DB_PASS },
});

const query = async function query(strings, ...vars) {
  return db.query(aql(strings, ...vars), {
    count: true,
  });
};

function index() {
  const server = Server({ schema, query });
  server.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

index();
