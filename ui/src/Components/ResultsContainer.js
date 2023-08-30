import React from "react";

export function ResultsContainer({ numResults, filteredControls }) {
  return (
    <div>
      <p>Results Found: {numResults}</p>
      <div className="results-container">
        {numResults > 0 ? (
          filteredControls.map((control, index) => (
            <div key={`${control.id}-${index}`}>
              <h3 className="allocation-title">
                {control.control} | {control.title}
              </h3>
              <div className="allocation-tile">
                <p>{control.definition}</p>
                <p>{control.additionalGuidance}</p>
                <h4>All Allocations:</h4>
                <ul className="allocation-list">
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
  );
}

export default ResultsContainer;
