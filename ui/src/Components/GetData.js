import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query($id: String!) {
    control(id: $id) {
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
      <h2>Search by ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Result</h3>
        {control ? (
          <div className="allocation-container">
              <div className="allocation-tile" key={control.id}>
                <h3>{control.control}</h3>
                <h3>{control.title}</h3>
                <p>Definition: {control.definition}</p>
                <h4>All Allocations:</h4>
                <ul className="allocation-list">
                  {Object.entries(control.allocation)
                    .filter(([key, value]) => value === true)
                    .map(([key]) => (
                      <li key={key}>{key}</li>
                    ))}
                </ul>
              </div>
          </div>
        ) : (
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
