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

export default function GetByDrop() {
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
        className={allocation === "department" ? "filter-button-clicked" : "filter-button"}
        value="department"
        onClick={handleClick}
      >
        Department
      </button>
      <button
        className={allocation === "itSecurityFunction" ? "filter-button-clicked" : "filter-button"}
        value="itSecurityFunction"
        onClick={handleClick}
      >
        IT Security Function
      </button>
      <button
        className={allocation === "cioFunctionIncludingOps" ? "filter-button-clicked" : "filter-button"}
        value="cioFunctionIncludingOps"
        onClick={handleClick}
      >
        CIO Function Including Ops
      </button>
      <button
        className={allocation === "physicalSecurityGroup" ? "filter-button-clicked" : "filter-button"}
        value="physicalSecurityGroup"
        onClick={handleClick}
      >
        Physical Security Group
      </button>
      <button
        className={allocation === "personnelSecurityGroup" ? "filter-button-clicked" : "filter-button"}
        value="personnelSecurityGroup"
        onClick={handleClick}
      >
        Personnel Security Group
      </button>
      <button
        className={allocation === "programAndServiceDeliveryManagers" ? "filter-button-clicked" : "filter-button"}
        value="programAndServiceDeliveryManagers"
        onClick={handleClick}
      >
        Program and Service Delivery Managers
      </button>
      <button
        className={allocation === "process" ? "filter-button-clicked" : "filter-button"}
        value="process"
        onClick={handleClick}
      >
        Process
      </button>
      <button
        className={allocation === "project" ? "filter-button-clicked" : "filter-button"}
        value="project"
        onClick={handleClick}
      >
        Project
      </button>
      <button
        className={allocation === "itProjects" ? "filter-button-clicked" : "filter-button"}
        value="itProjects"
        onClick={handleClick}
      >
        IT Projects
      </button>
      <button
        className={allocation === "facilityAndHardware" ? "filter-button-clicked" : "filter-button"}
        value="facilityAndHardware"
        onClick={handleClick}
      >
        Facility and Hardware
      </button>
      <button
        className={allocation === "resourceAbstractionAndControlLayer" ? "filter-button-clicked" : "filter-button"}
        value="resourceAbstractionAndControlLayer"
        onClick={handleClick}
      >
        Resource Abstraction and Control Layer
      </button>
      <button
        className={allocation === "infrastructure" ? "filter-button-clicked" : "filter-button"}
        value="infrastructure"
        onClick={handleClick}
      >
        Infrastructure
      </button>
      <button
        className={allocation === "platform" ? "filter-button-clicked" : "filter-button"}
        value="platform"
        onClick={handleClick}
      >
        Platform
      </button>
      <button
        className={allocation === "application" ? "filter-button-clicked" : "filter-button"}
        value="application"
        onClick={handleClick}
      >
        Application
      </button>

      <div>
        <h3>Result</h3>
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
          <p>Search results will appear here</p>
        )}
      </div>
    </div>
  );
}
