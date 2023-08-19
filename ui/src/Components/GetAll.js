import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_CONTROLS = gql`
  query {
    controlAll {
      control
      title
      definition
      family
      id
      additionalGuidance
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

export default function GetAllControls() {
  const [keyword, setKeyword] = useState("");
  const [allocation, setAllocation] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);

  const handleChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
  };

  const handleAllocationChange = (event) => {
    const newAllocation = event.target.value;
    setAllocation(newAllocation);
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const filteredControls = data.controlAll.filter((control) => {
    const isKeywordMatch =
      control.control.toLowerCase().includes(keyword) ||
      control.title.toLowerCase().includes(keyword);

    if (allocation === "") {
      return isKeywordMatch;
    }

    const allocationValue = control.allocation[allocation];
    return isKeywordMatch && allocationValue;
  });

  const numResults = filteredControls.length;

  return (
    <div>
      <h2>Search by Keyword</h2>

      <div className="filter-options">
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Search by keyword"
        />
        <select value={allocation} onChange={handleAllocationChange}>
          <option value="">All Allocations</option>
          <option value="department">
            Department
          </option>
          <option value="itSecurityFunction">
            IT Security Function
          </option>
          <option value="cioFunctionIncludingOps">
            CIO Function Including Ops
          </option>
          <option value="physicalSecurityGroup">
            Physical Security Group
          </option>
          <option value="personnelSecurityGroup">
            Personel Security Group
          </option>
          <option value="programAndServiceDeliveryManagers">
            Program and Service Delivery Managers
          </option>
          <option value="process">
            Process
          </option>
          <option value="project">
            Project
          </option>
          <option value="itProjects">
            IT Projects
          </option>
          <option value="facilityAndHardware">
            Facility and Hardware
          </option>
          <option value="resourceAbstractionAndControlLayer">
            Resource Abstraction and Control Layer
          </option>
          <option value="infrastructure">
            Infrastructure
          </option>
          <option value="platform">
            Platform
          </option>
          <option value="application">
            Application
          </option>
        </select>
      </div>
      <div>
        <p>Results Found: {numResults}</p>
        <div className="results-container">
          {numResults > 0 ? (
            filteredControls.map((control, index) => (
              <div key={`${control.id}-${index}`}>
                <h3 className="allocation-title">
                  {control.control} | {control.title}
                </h3>
                <div className="allocation-tile">
                  <p>{control.definition}</p>
                  <p>{control.additionalGuidance}</p>
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
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
