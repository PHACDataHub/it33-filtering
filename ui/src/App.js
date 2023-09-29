import "./App.css";
import React, { useState } from "react";
import SearchContainer from "./Components/SearchContainer";
import SearchInput from "./Components/SearchInput";
import AllocationList from "./Components/AllocationList";
import ResultsContainer from "./Components/ResultsContainer";
import { Wordmark } from "./Components/Wordmark.tsx";
import { PhacSignature } from "./Components/PhacSignature.js";
import { useQuery } from "@apollo/client";
import { GET_ALL_CONTROLS } from "./Components/ControlQueries";



function App() {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_ALL_CONTROLS, {
    context: {
      headers: {
        'Accept-Language': selectedLanguage,
      },
    },
    fetchPolicy: 'network-only',
  });

  const handleLanguageSelect = async () => {
    const newLanguage = selectedLanguage === 'en' ? 'fr' : 'en';
    setSelectedLanguage(newLanguage);

    await refetch({
      context: {
        headers: {
          'Accept-Language': newLanguage,
        },
      },
    });
  };

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const handleAllocationSelect = (allocation) => {
    setSelectedAllocation(allocation);
  };

  if (loading) {
    console.log('Loading...');
    return "Loading...";
  }

  if (error) {
    console.error('Error:', error);
    return <pre>{error.message}</pre>;
  }

  console.log('Data:', data);
  
  // Check if data.controlAll is defined before filtering.
  const filteredControls =
    data && data.controlAll
      ? data.controlAll.filter((control) => {
        const isKeywordMatch =
          control.control.toLowerCase().includes(selectedKeyword) ||
          control.title.toLowerCase().includes(selectedKeyword);

        if (selectedAllocation === "") {
          return isKeywordMatch;
        }

        const allocationValue = control.allocation[selectedAllocation];
        return isKeywordMatch && allocationValue;
      })
      : [];

  const numResults = filteredControls.length;

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-sig">
          <PhacSignature language="fr" />
        </div>
        <h1>DSCO ITSG33 Filter</h1>
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

        <button onClick={handleLanguageSelect}>
          {selectedLanguage === 'fr' ? 'English' : 'Français'}
        </button>

        <ResultsContainer
          numResults={numResults}
          filteredControls={filteredControls}
        />
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
