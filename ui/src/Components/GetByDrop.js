import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query {
    controlDrop {
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

export default function GetData() {
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlDrop = data?.controlDrop;

  return (
    <div>
      <button onClick={getData}>Fetch All Controls</button>
      <div>
        <h3>Results</h3>
        {controlDrop ? (
          <ul>
            {controlDrop.map((control) => (
              <li key={control.id}>
                <p>Control: {control.control}</p>
                <p>Title: {control.title}</p>
                <p>Definition: {control.definition}</p>
                <h4>Allocation:</h4>
                <ul>
                  {Object.entries(control.allocation)
                    .filter(([key, value]) => value === true)
                    .map(([key]) => (
                      <li key={key}>{key}</li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
  
}
