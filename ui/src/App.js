import "./App.css";
import React, { useState, useEffect } from "react";
import SearchContainer from "./Components/SearchContainer";
import SearchInput from "./Components/SearchInput";
import AllocationList from "./Components/AllocationList";
import ResultsContainer from "./Components/ResultsContainer";
import { Wordmark } from "./Components/Wordmark.tsx";
import { PhacSignature } from "./Components/PhacSignature.js";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTROLS } from "./graphql";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [filteredData, setFilteredData] = useState([]);
  const { loading, error, data } = useQuery(GET_ALL_CONTROLS, {
    variables: { control: selectedKeyword },
    context: {
      headers: {
        'Accept-Language': selectedLanguage,
      },
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    // Update filteredData when data or selectedAllocation changes
    if (data && data.control) {
      const filteredControls = selectedAllocation
        ? data.control.filter(control => control.allocation[selectedAllocation])
        : data.control;

      setFilteredData(filteredControls);
    }
  }, [data, selectedAllocation]);

  const handleLanguageSelect = () => {
    const newLanguage = selectedLanguage === 'en' ? 'fr' : 'en';
    setSelectedLanguage(newLanguage);
  };

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const handleAllocationSelect = (allocation) => {
    setSelectedAllocation(allocation);
  };

  const handleClearFilters = () => {
    // Clear all filters by resetting state variables
    setSelectedKeyword("");
    setSelectedAllocation("");
  };

  const renderContent = () => {
    if (loading) {
      return "Loading..."; // You can replace this with a loading spinner or other UI
    }

    if (error) {
      console.error('Error:', error);
      return <pre>{error.message}</pre>;
    }

    return (
      <div className="getData">
        <SearchContainer
          onSearch={handleKeywordSelect}
          onSelect={handleAllocationSelect}
        >
          <SearchInput />
          <AllocationList />
        </SearchContainer>
        <button className="clear-btn" onClick={handleClearFilters}>Clear Filters</button>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-sig">
          <PhacSignature language="fr" />
        </div>
        <div className="title-langselect">
          <button className="lang-button" onClick={handleLanguageSelect}>
            {selectedLanguage === 'fr' ? 'English' : 'Français'}
          </button>
          <Link to={"/"}> <h1>DSCO ITSG33 Filter</h1></Link>
        </div>
      </header>

      <section className="alert alert-info">
        <h3>This is a work in progress.</h3>
        <p>Information may be incorrect or inaccurate.</p>
      </section>

      {renderContent()}

      <Routes>
        <Route path="/" element={<ResultsContainer
          numResults={filteredData.length}
          data={filteredData}
        />} />
      </Routes>

      <footer>
        <div className="footer-wm">
          <Wordmark textColor="black" />
        </div>
      </footer>
    </div>
  );
}

export default App;
