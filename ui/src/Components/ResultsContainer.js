import React from "react";
import Control from "./Control";
import { Link } from 'react-router-dom';

export function ResultsContainer({ numResults, filteredControls }) {
  return (
    <div>
      <p>Results Found: {numResults}</p>
      <div className="results-container">
        {numResults > 0 ? (
          filteredControls.map((control, index) => (
            <Link to={`/${control.control}`} >
              <Control key={`${control.id}-${index}`} control={control} />
            </Link>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default ResultsContainer;
