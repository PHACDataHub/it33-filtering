import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query {
    controlDrop {
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
              <li key={controlDrop.id}>
                <p>Title: {controlDrop.title}</p>
                <p>Definition: {controlDrop.definition}</p>
                <p>Family: {controlDrop.family}</p>
                <p>ID: {controlDrop.id}</p>
                <p>
                  Allocations:
                  <ul>
                    {Object.entries(controlDrop.allocation)
                      .filter(([_, value]) => value === true)
                      .map(([key]) => (
                        <li key={key}>{key}</li>
                      ))}
                  </ul>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
