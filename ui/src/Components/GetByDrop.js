import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query ($allocation: String!) {
    controlDrop(allocation: $allocation) {
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

export default function GetByDrop() {
  const [allocation, setAllocation] = useState("");
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY);

  const handleInputChange = (event) => {
    setAllocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (allocation) {
      getData({ variables: { allocation } });
    }
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlDrop = data?.controlDrop;

  return (
    <div>
      <h2>Search by Allocation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input type="text" value={allocation} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Result</h3>
        {controlDrop ? (
          <ul>
            {controlDrop.map((control) => (
              <li key={control.id}>
                <p>{control.control}</p>
                <p>{control.title}</p>
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
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
