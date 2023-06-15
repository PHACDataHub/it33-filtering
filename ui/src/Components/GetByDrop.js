import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query ($allocation: String!) {
    control(allocation: $allocation) {
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

  const control = data?.control;
  const trueAllocations = control
    ? Object.entries(control.allocation)
        .filter(([_, value]) => value === true)
        .map(([key]) => key)
    : [];

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
        {control ? (
          <ul>
            <li>Title: {control.title}</li>
            <li>Definition: {control.definition}</li>
            <li>Family: {control.family}</li>
            <li>ID: {control.id}</li>
            {trueAllocations.length > 0 && (
              <li>
                Allocations:
                <ul>
                  {trueAllocations.map((allocation) => (
                    <li key={allocation}>{allocation}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        ) : (
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
