import { makeExecutableSchema } from "@graphql-tools/schema";
import { Database, aql } from "arangojs";

const typeDefinitions = /* GraphQL */ `
  type Query {
    control(id: String!): Control
    controlDrop(allocation: String!): Control
    controlAll: [Control]
  }

  type Control {
    control: String!
    title: String!
    definition: String!
    family: String!
    id: String!
    allocation: Allocation!
  }

  type Allocation {
    department: Boolean!
    itSecurityFunction: Boolean!
    cioFunctionIncludingOps: Boolean!
    physicalSecurityGroup: Boolean!
    personnelSecurityGroup: Boolean!
    programAndServiceDeliveryManagers: Boolean!
    process: Boolean!
    project: Boolean!
    itProjects: Boolean!
    facilityAndHardware: Boolean!
    resourceAbstractionAndControlLayer: Boolean!
    infrastructure: Boolean!
    platform: Boolean!
    application: Boolean!
  }
`;

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
    },
    controlAll: async () => {
      const cursor = await db.query(aql`
        FOR ctl IN controls
        RETURN DISTINCT ctl
      `);
      const controls = await cursor.all();
      return controls;
    },
    controlDrop: async (_, { allocation }, context) => {
      const cursor = await db.query(aql`
        FOR ctl IN controls
        FILTER ctl.allocation == ${Boolean(allocation)}
        RETURN DISTINCT ctl
      `);
      const controls = await cursor.all();
      return controls;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
