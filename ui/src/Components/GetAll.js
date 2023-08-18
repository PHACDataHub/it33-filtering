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
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);

  const handleChange = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const filteredControls = data.controlAll.filter((control) =>
    control.control.toLowerCase().includes(keyword) || control.title.toLowerCase().includes(keyword)
  );

  const numResults = filteredControls.length;

  return (
    <div>
      <div>
        <h2>Search by Keyword</h2>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Search by keyword"
        />
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
