import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import AllocationList from "./AllocationList";
import SearchInput from "./Search";
import ResultsContainer from "./ResultsContainer";
import { GET_ALL_CONTROLS } from "./ControlQueries"; 



export default function SearchContainer() {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword)
  }
  const handleAllocationSelect = (allocation) => {
    setSelectedAllocation(allocation);
  }

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const filteredControls = data.controlAll.filter((control) => {
    const isKeywordMatch =
      control.control.toLowerCase().includes(selectedKeyword) ||
      control.title.toLowerCase().includes(selectedKeyword);

    if (selectedAllocation === "") {
      return isKeywordMatch;
    }

    const allocationValue = control.allocation[selectedAllocation];
    return isKeywordMatch && allocationValue;
  });

  const numResults = filteredControls.length;

  return (
    <div>
      <h2>Search by Keyword</h2>
      <div className="filter-options">
        <SearchInput
          value={selectedKeyword}
          onSearch={handleKeywordSelect}
          placeholder="Search by keyword"
        />
        <AllocationList onSelect={handleAllocationSelect} />
      </div>
      <ResultsContainer
        numResults={numResults}
        filteredControls={filteredControls}
      />
    </div>
  );
}
