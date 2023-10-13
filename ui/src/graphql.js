import { gql } from "@apollo/client";


export const GET_ALL_CONTROLS = gql`
  query {
    controlAll {
      control
      title
      definition
      family
      id
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
`
