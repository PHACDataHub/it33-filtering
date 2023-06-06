import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_QUERY = gql`
  {
    control(id: "AC-1") {
      title
      definition
      family
      id
    }
  }
`;

export default function GetData() {
  const { data, loading, error } = useQuery(GET_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div>
      <h1>Result</h1>
      <ul>
        
      </ul>
    </div>
  );
}
