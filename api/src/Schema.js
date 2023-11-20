import { makeExecutableSchema } from "@graphql-tools/schema";


const typeDefinitions = /* GraphQL */ `
  type Query {
    control(control: String!): Control
    controlDrop(allocation: String!): [Control]
    controlAll: [Control]
  }

  type Control {
    control: String!
    title: String!
    definition: String!
    family: String!
    id: String!
    class: String !
    enhancement: String
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
  Control: {
    id: async (root) => {
      console.log({ works: root })
      return root._id;
    }
  },
  Query: {
    controlAll: async (_root, _, { query, request }) => {
      const cursor = await query`
          FOR ctl IN controls
          LET col1=(UNSET(ctl, ["class","title","definition","additionalGuidance"]))
          LET col2= ({class:TRANSLATE(${request.language},ctl.class,"Not Available"),title:TRANSLATE(${request.language},ctl.title,"Not Available"), definition:TRANSLATE(${request.language},ctl.definition,"Not Available"), additionalGuidance:TRANSLATE(${request.language},ctl.additionalGuidance,"Not Available") })
          RETURN MERGE(col1,col2)
        `;
      const controls = await cursor.all();
      return controls;
    },
    control: async (_root, { control }, { query, request }) => {
      try {
        console.log('Received control:', control);

        const cursor = await query`
          FOR ctl IN controls
          FILTER CONTAINS(ctl.control, ${control})
          LET col1=(UNSET(ctl, ["class","title","definition","additionalGuidance"]))
          LET col2= ({class:TRANSLATE(${request.language},ctl.class,"Not Available"),title:TRANSLATE(${request.language},ctl.title,"Not Available"), definition:TRANSLATE(${request.language},ctl.definition,"Not Available"), additionalGuidance:TRANSLATE(${request.language},ctl.additionalGuidance,"Not Available") })
          RETURN MERGE(col1,col2)
        `;

        const controls = await cursor.all();
        console.log('Returned controls:', controls);

        return controls;
      } catch (error) {
        console.error('Error fetching controls:', error);
        throw new Error('An error occurred while fetching controls.');
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