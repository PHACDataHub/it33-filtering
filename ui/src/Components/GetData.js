import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query($id: String!) {
    control(id: $id) {
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
  const [id, setId] = useState("");
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      getData({ variables: { id } });
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
      <h1>Get Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>ID:</label>
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Result</h2>
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
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
