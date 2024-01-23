import React from "react";
import Control from "./Control";
import { Link } from 'react-router-dom';

function ResultsContainer({ numResults, data }) {
  console.log('Num Results:', numResults);
  console.log('Data:', data);
  
  return (
    <div>
      <p>Results Found: {numResults}</p>
      <div className="results-container">
        {numResults > 0 ? (
          data.map((control, index) => (
            <Control key={`${control.id}-${index}`} control={control} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default ResultsContainer;
