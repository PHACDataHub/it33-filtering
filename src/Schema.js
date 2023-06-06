import { makeExecutableSchema } from '@graphql-tools/schema'
import { Database, aql } from 'arangojs'

const typeDefinitions = /* GraphQL */ `
  type Query {
    control(id:String!): Control
  }
  type Control {
    title: String!
    definition: String!
    family: String!
    id: String!
  }
`
const db = new Database({
  url: "http://127.0.0.1:8529",
  databaseName: "itgs33",
  auth: { username: "root", password: "test123" },
});

const resolvers = {
  Query: {
    control: async (_root, { id }) => {
      const cursor = await db.query(aql`
        FOR ctl IN controls
        FILTER ctl.control == ${id}
        RETURN ctl
      `);
      const control = await cursor.all();
      return control[0];
    }
  }
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})