import "./App.css";
import React, { useState } from "react";
import SearchContainer from "./Components/SearchContainer";
import SearchInput from "./Components/SearchInput";
import AllocationList from "./Components/AllocationList";
import ResultsContainer from "./Components/ResultsContainer";
import { Wordmark } from "./Components/Wordmark.tsx";
import { PhacSignature } from "./Components/PhacSignature.js";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTROLS } from "./graphql";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Control from "./Components/Control";


function App() {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS);

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const handleAllocationSelect = (allocation) => {
    setSelectedAllocation(allocation);
  };

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
      <div className="App">
        <header className="App-header">
          <div className="header-sig">
            <PhacSignature language="fr" />
          </div>
          <Link to={"/"}> <h1>DSCO ITSG23 Filter</h1></Link>

        </header>

        <section className="alert alert-info">
          <h3>This is a work in progress.</h3>
          <p>Information may be incorrect or inaccurate.</p>
        </section>

        <div className="getData">
          <SearchContainer
            onSearch={handleKeywordSelect}
            onSelect={handleAllocationSelect}
          >
            <SearchInput />
            <AllocationList />
          </SearchContainer>


          <Routes>
            <Route path="/" element={<ResultsContainer
              numResults={numResults}
              filteredControls={filteredControls}
            />} />
            <Route path="/:control" element={<Control />} />
          </Routes>
        </div>

        <footer>
          <div className="footer-wm">
            <Wordmark textColor="black" />
          </div>
        </footer>

      </div>
  );
}

export default App;
