import React from "react";

function Control({ control }) {
  return (
    <div>
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
  );
}

export default Control;