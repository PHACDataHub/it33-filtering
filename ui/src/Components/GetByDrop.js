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
  const [activeButton, setActiveButton] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    const clickedAllocation = event.target.value; // Get the value from the clicked button
    setAllocation(clickedAllocation); // Set the allocation state with the clicked value

    if (clickedAllocation) {
      getData({ variables: { allocation: clickedAllocation } });
    }

    setActiveButton(clickedAllocation);

    console.log(clickedAllocation)
    console.log(activeButton)
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const controlDrop = data?.controlDrop;

  return (
    <div>
      <h2>Filter by Allocation</h2>
      <button
        className={
          activeButton === "department"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="department"
        onClick={handleClick}
      >
        Department
      </button>
      <button
        className={
          activeButton === "itSecurityFunction"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="itSecurityFunction"
        onClick={handleClick}
      >
        IT Security Function
      </button>
      <button
        className={
          activeButton === "cioFunctionIncludingOps"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="cioFunctionIncludingOps"
        onClick={handleClick}
      >
        CIO Function Including Ops
      </button>
      <button
        className={
          activeButton === "physicalSecurityGroup"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="physicalSecurityGroup"
        onClick={handleClick}
      >
        Physical Security Group
      </button>
      <button
        className={
          activeButton === "personnelSecurityGroup"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="personnelSecurityGroup"
        onClick={handleClick}
      >
        Personnel Security Group
      </button>
      <button
        className={
          activeButton === "programAndServiceDeliveryManagers"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="programAndServiceDeliveryManagers"
        onClick={handleClick}
      >
        Program and Service Delivery Managers
      </button>
      <button
        className={
          activeButton === "process" ? "filter-button-clicked" : "filter-button"
        }
        value="process"
        onClick={handleClick}
      >
        Process
      </button>
      <button
        className={
          activeButton === "project" ? "filter-button-clicked" : "filter-button"
        }
        value="project"
        onClick={handleClick}
      >
        CIO Function Including Ops
      </button>
      <button
        className={
          activeButton === "itProjects"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="itProjects"
        onClick={handleClick}
      >
        IT Projects
      </button>
      <button
        className={
          activeButton === "facilityAndHardware"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="facilityAndHardware"
        onClick={handleClick}
      >
        Facility and Hardware
      </button>
      <button
        className={
          activeButton === "resourceAbstractionAndControlLayer"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="resourceAbstractionAndControlLayer"
        onClick={handleClick}
      >
        Resource Abstraction and Control Layer
      </button>
      <button
        className={
          activeButton === "infrastructure"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="infrastructure"
        onClick={handleClick}
      >
        Infrastructure
      </button>
      <button
        className={
          activeButton === "platform"
            ? "filter-button-clicked"
            : "filter-button"
        }
        value="platform"
        onClick={handleClick}
      >
        Platform
      </button>
      <button
        className={
          activeButton === "application"
            ? "filter-button-clicked"
            : "filter-button"
        }
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
                <h4>Allocation:</h4>
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
