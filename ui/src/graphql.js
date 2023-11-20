import { gql } from "@apollo/client";

export const GET_ALL_CONTROLS = gql`
  query GetAllControls($control: String!) {
    control(control: $control) {
      id
      control
      title
      definition
      family
      additionalGuidance
      allocation {
        department
        itSecurityFunction
        cioFunctionIncludingOps
        physicalSecurityGroup
        personnelSecurityGroup
        programAndServiceDeliveryManagers
        process
        project
        itProjects
        facilityAndHardware
        resourceAbstractionAndControlLayer
        infrastructure
        platform
        application
      }
    }
  }
`;
