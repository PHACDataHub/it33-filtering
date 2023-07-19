import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_CONTROLS = gql`
  query {
    controlAll {
      control
      title
      definition
      family
      id
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

export default function GetAllControls() {
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlAll = data?.controlAll;
  const numResults = controlAll ? controlAll.length : 0;

  return (
    <div>
      <div>
        <p>Results Found: {numResults}</p>
        {controlAll ? (
          <div>
            {controlAll.map((control) => (
              <div key={control.id}>
                <h3 className="allocation-title">{control.control} | {control.title}</h3>
                <div className="allocation-tile">
                  <p>Definition: {control.definition}</p>
                  <h4>All Allocations:</h4>
                  <ul>
                    {Object.entries(control.allocation)
                      .filter(([key, value]) => value === true)
                      .map(([key]) => (
                        <li key={key}>{key}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
