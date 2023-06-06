import React from "react";
import { useQuery, gql } from "@apollo/client";


const GET_QUERY = gql`
{
    FOR ctl IN controls
    FILTER ctl.control == ${id}
    RETURN ctl
}
`;

export default function GetData() {
    const { data, loading, error } = useQuery(GET_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <div>
            <h1>SpaceX Launches</h1>
            <ul>
                {data.controls.map((ctl) => (
                    <li key={ctl.id}>{ctl}</li>
                ))}
            </ul>
        </div>
    );
}