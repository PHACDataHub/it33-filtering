import React, { useEffect, useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

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

const GET_BY_SEARCH = gql`
  query GetControlsBySearch($keyword: ControlFilterInput!) {
    controlAll(
      filter: {
        OR: [
          { control: { contains: $keyword } }
          { title: { contains: $keyword } }
        ]
      }
    ) {
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
  const [getFilteredControls, { loading: loadingFiltered, data: filteredData }] = useLazyQuery(
    GET_BY_SEARCH
  );
  
  useEffect(() => {
    // Log the filteredData whenever it changes
    console.log(filteredData);
  }, [filteredData]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
    getFilteredControls({ variables: { keyword: event.target.value } });
  };

  if (loading) return "Loading...";
  if (loadingFiltered) return "Filtering...";
  if (error) return <pre>{error.message}</pre>;

  const controls = keyword !== "" ? filteredData?.controlAll || [] : data.controlAll;
  const numResults = controls.length;

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
            controls.map((control, index) => (
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
