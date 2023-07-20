import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_CONTROLS = gql`
  query controlAll {
    controlAll {
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
      additionalGuidance
    }
  }
`;

export default function GetAllControls() {
  const [keyword, setKeyword] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);
  const [filteredControls, setFilteredControls] = useState([]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (!loading && data) {
      // Clear the filteredControls array
      setFilteredControls([]);

      // Filter controls based on the keyword
      const filteredControls = data.controlAll.filter(
        (control) =>
          control.control.toLowerCase().includes(keyword.toLowerCase()) ||
          control.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredControls(filteredControls);
      console.log(filteredControls)
    }
  }, [keyword, loading, data]);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  // update the number of results displayed
  const numResults = filteredControls ? filteredControls.length : 0;

  return (
    <div >
      <div >
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="Search by keyword"
        />
        <p>Results Found: {numResults}</p>
        <div className="results-container">
          {filteredControls && filteredControls.length > 0 ? (
            filteredControls.map((control, index) => (
              <div key={`${control.id}-${index}`}>
                <h3 className="allocation-title">
                  {control.control} | {control.title}
                </h3>
                <div className="allocation-tile">
                  <p>{control.definition}</p>
                  <p>{control.additionalGuidance}</p>
                  <h4>All Allocations:</h4>
                  <ul>
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
