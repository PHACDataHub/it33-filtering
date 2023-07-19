import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query ControlDrop($allocation: String!) {
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

export default function GetByAllocation() {
  const [allocation, setAllocation] = useState("");
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const handleClick = (event) => {
    event.preventDefault();
    const clickedAllocation = event.target.value;
    setAllocation(clickedAllocation);
    getData({ variables: { allocation: clickedAllocation } });
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlDrop = data?.controlDrop;

  return (
    <div>
      <h2>Filter by Allocation</h2>
      <select value={allocation} onChange={handleClick}>
        <option value="department">Department</option>
        <option value="itSecurityFunction">IT Security Function</option>
        <option value="cioFunctionIncludingOps">
          CIO Function Including Ops
        </option>
        <option value="physicalSecurityGroup">Physical Security Group</option>
        <option value="personnelSecurityGroup">Personnel Security Group</option>
        <option value="programAndServiceDeliveryManagers">
          Program and Service Delivery Managers
        </option>
        <option value="process">Process</option>
        <option value="project">Project</option>
        <option value="itProjects">IT Projects</option>
        <option value="facilityAndHardware">Facility and Hardware</option>
        <option value="resourceAbstractionAndControlLayer">
          Resource Abstraction and Control Layer
        </option>
        <option value="infrastructure">Infrastructure</option>
        <option value="platform">Platform</option>
        <option value="application">Application</option>
      </select>

      <div>
        {controlDrop ? (
          <div className="allocation-container">
            {controlDrop.map((control) => (
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
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
