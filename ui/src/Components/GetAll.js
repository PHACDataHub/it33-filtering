import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const GET_QUERY_BY_ALLOCATION = gql`
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

const GET_QUERY_BY_ID = gql`
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

export default function CombinedComponent() {
  const [allocation, setAllocation] = useState("");
  const [id, setId] = useState("");
  const [getDataByAllocation, { loading: loadingByAllocation, error: errorByAllocation, data: dataByAllocation }] = useLazyQuery(GET_QUERY_BY_ALLOCATION, {
    fetchPolicy: "cache-and-network",
  });
  const [getDataById, { loading: loadingById, error: errorById, data: dataById }] = useLazyQuery(GET_QUERY_BY_ID);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    const clickedAllocation = event.target.value;
    setAllocation(clickedAllocation);
    getDataByAllocation({ variables: { allocation: clickedAllocation } });
  };

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      setSearchClicked(true);
    }
  };

  useEffect(() => {
    if (dataById?.control) {
      const allocationKeys = Object.keys(dataById.control.allocation);
      const selectedAllocation = allocationKeys.find((key) => dataById.control.allocation[key]);
      if (selectedAllocation) {
        setAllocation(selectedAllocation);
      }
    }

    if (allocation && !searchClicked) {
      getDataByAllocation({ variables: { allocation } });
    }

    if (id && searchClicked) {
      getDataById({ variables: { id } });
    }
  }, [dataById, allocation, id, searchClicked]);

  useEffect(() => {
    setSearchClicked(false);
  }, [dataByAllocation, dataById]);

  const renderResults = () => {
    if (loadingByAllocation || loadingById) {
      return <div>Loading...</div>;
    } else if (errorByAllocation || errorById) {
      return <div>Error occurred while fetching data.</div>;
    } else if (dataByAllocation?.controlDrop && dataByAllocation.controlDrop.length > 0) {
      return (
        <div>
          {dataByAllocation.controlDrop.map((control) => (
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
      );
    } else if (dataById?.control) {
      const control = dataById.control;
      return (
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
      );
    } else {
      return <div>No results found.</div>;
    }
  };

  return (
    <div>
      <h2>Filter by Allocation</h2>
      <select value={allocation} onChange={handleClick}>
        <option value="department">Department</option>
        <option value="itSecurityFunction">IT Security Function</option>
        <option value="cioFunctionIncludingOps">CIO Function Including Ops</option>
        <option value="physicalSecurityGroup">Physical Security Group</option>
        <option value="personnelSecurityGroup">Personnel Security Group</option>
        <option value="programAndServiceDeliveryManagers">Program and Service Delivery Managers</option>
        <option value="process">Process</option>
        <option value="project">Project</option>
        <option value="itProjects">IT Projects</option>
        <option value="facilityAndHardware">Facility and Hardware</option>
        <option value="resourceAbstractionAndControlLayer">Resource Abstraction and Control Layer</option>
        <option value="infrastructure">Infrastructure</option>
        <option value="platform">Platform</option>
        <option value="application">Application</option>
      </select>

      <h2>Search by ID</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <button className="btn btn-primary" type="submit">Search</button>
      </form>

      <div className="result-container">
        {renderResults()}
      </div>
    </div>
  );
}
