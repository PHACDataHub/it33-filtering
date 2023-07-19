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
      <button
        className={allocation === "department" ? "btn btn-clicked" : "btn btn-default"}
        value="department"
        onClick={handleClick}
      >
        Department
      </button>
      <button
        className={allocation === "itSecurityFunction" ? "btn btn-clicked" : "btn btn-default"}
        value="itSecurityFunction"
        onClick={handleClick}
      >
        IT Security Function
      </button>
      <button
        className={allocation === "cioFunctionIncludingOps" ? "btn btn-clicked" : "btn btn-default"}
        value="cioFunctionIncludingOps"
        onClick={handleClick}
      >
        CIO Function Including Ops
      </button>
      <button
        className={allocation === "physicalSecurityGroup" ? "btn btn-clicked" : "btn btn-default"}
        value="physicalSecurityGroup"
        onClick={handleClick}
      >
        Physical Security Group
      </button>
      <button
        className={allocation === "personnelSecurityGroup" ? "btn btn-clicked" : "btn btn-default"}
        value="personnelSecurityGroup"
        onClick={handleClick}
      >
        Personnel Security Group
      </button>
      <button
        className={allocation === "programAndServiceDeliveryManagers" ? "btn btn-clicked" : "btn btn-default"}
        value="programAndServiceDeliveryManagers"
        onClick={handleClick}
      >
        Program and Service Delivery Managers
      </button>
      <button
        className={allocation === "process" ? "btn btn-clicked" : "btn btn-default"}
        value="process"
        onClick={handleClick}
      >
        Process
      </button>
      <button
        className={allocation === "project" ? "btn btn-clicked" : "btn btn-default"}
        value="project"
        onClick={handleClick}
      >
        Project
      </button>
      <button
        className={allocation === "itProjects" ? "btn btn-clicked" : "btn btn-default"}
        value="itProjects"
        onClick={handleClick}
      >
        IT Projects
      </button>
      <button
        className={allocation === "facilityAndHardware" ? "btn btn-clicked" : "btn btn-default"}
        value="facilityAndHardware"
        onClick={handleClick}
      >
        Facility and Hardware
      </button>
      <button
        className={allocation === "resourceAbstractionAndControlLayer" ? "btn btn-clicked" : "btn btn-default"}
        value="resourceAbstractionAndControlLayer"
        onClick={handleClick}
      >
        Resource Abstraction and Control Layer
      </button>
      <button
        className={allocation === "infrastructure" ? "btn btn-clicked" : "btn btn-default"}
        value="infrastructure"
        onClick={handleClick}
      >
        Infrastructure
      </button>
      <button
        className={allocation === "platform" ? "btn btn-clicked" : "btn btn-default"}
        value="platform"
        onClick={handleClick}
      >
        Platform
      </button>
      <button
        className={allocation === "application" ? "btn btn-clicked" : "btn btn-default"}
        value="application"
        onClick={handleClick}
      >
        Application
      </button>

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
