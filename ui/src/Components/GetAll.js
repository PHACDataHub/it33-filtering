import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
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

export default function GetAll() {
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY);

  useEffect(() => {
    // Fetch data on component mount
    getData();
  }, []);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlAll = data?.controlAll;

  return (
      <div >
        {controlAll ? (
          <div className="allocation-container">
            {controlAll.map((control) => (
              <div className="allocation-tile" key={control.id}>
                <h3>{control.control}</h3>
                <h3>{control.title}</h3>
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
            ))}
          </div>
        ) : (
          <p>Search results will appear here</p>
        )}
      </div>
  );
}
