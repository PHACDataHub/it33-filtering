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
            {controlDrop.map((controlDrop) => (
              <li>
                <p>Control: {controlDrop.control}</p>

                <p>Title: {controlDrop.title}</p>
                <p>Definition: {controlDrop.definition}</p>
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
