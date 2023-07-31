import { makeExecutableSchema } from "@graphql-tools/schema";


const typeDefinitions = /* GraphQL */ `
  type Query {
    control(id: String!): Control
    controlDrop(allocation: String!): [Control]
    controlAll(filter: String): [Control]
  }

  type Query {
    control(id: String!): Control
    controlAll(filter: ControlFilterInput): [Control]
  }
  
  input ControlFilterInput {
    OR: [ControlFilterCondition!]
  }
  
  input ControlFilterCondition {
    control: StringFilter
    title: StringFilter
  }
  
  input StringFilter {
    contains: String
  }

  type Control {
    control: String!
    title: String!
    definition: String!
    family: String!
    id: String!
    allocation: Allocation!
    additionalGuidance: String!
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

const resolvers = {
  Query: {
    control: async (_root, { id }, { query }) => {
      const cursor = await query`
        FOR ctl IN controls
        FILTER ctl.control == ${id}
        RETURN DISTINCT ctl
      `;
      const control = await cursor.all();
      return control[0];
    },
    controlAll: async (_root, { filter }, { query }) => {
      if (filter && filter !== "") {
        // Apply the filter logic based on the "filter" argument
        const cursor = await query`
          FOR ctl IN controls
          FILTER CONTAINS(ctl.control, ${filter}) || CONTAINS(ctl.title, ${filter})
          RETURN DISTINCT ctl
        `;
        const controls = await cursor.all();
        return controls;
      } else {
        // Fetch all controls without any specific filtering if filter is not provided
        const cursor = await query`
          FOR ctl IN controls
          RETURN DISTINCT ctl
        `;
        const controls = await cursor.all();
        return controls;
      }
    },
    controlDrop: async (_, { allocation }, { query }) => {
      // Apply the filter logic based on the "allocation" argument
      const cursor = await query`
        FOR ctl IN controls
        FILTER ctl.allocation.${allocation} == true
        RETURN DISTINCT ctl
      `;
      const controls = await cursor.all();
      return controls;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});