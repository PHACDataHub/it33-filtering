import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  query($id: String!) {
    control(id: $id) {
      title
      definition
      family
      id
    }
  }
`;

export default function GetData() {
  const [id, setId] = useState(""); // State to store the ID value
  const [getData, { loading, error, data }] = useLazyQuery(GET_QUERY);

  const handleInputChange = (event) => {
    const inputValue = event.target.value; // Limit input to one character
    setId(inputValue); // Update the ID value with the limited input
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    if (id) {
      getData({ variables: { id } }); // Execute query only if ID is not empty
    }
  };

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const control = data?.control; // Access the control data from the response

  return (
    <div>
      <h1>Get Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" value={id} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Result</h2>
        {control ? (
          <ul>
            <li>Title: {control.title}</li>
            <li>Definition: {control.definition}</li>
            <li>Family: {control.family}</li>
            <li>ID: {control.id}</li>
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}
