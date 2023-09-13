import React from "react";
import SearchInput from "./SearchInput";
import AllocationList from "./AllocationList";

function SearchContainer({ onSearch, onSelect }) {
    return (
        <div>
            <h2>Search by Keyword</h2>
            <div className="filter-options">
                <SearchInput onSearch={onSearch} placeholder="Search by keyword" />
                <AllocationList onSelect={onSelect} />
            </div>
        </div>
    );
};

export default SearchContainer; 
