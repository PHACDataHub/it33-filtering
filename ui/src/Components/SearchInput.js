import React, { useState } from "react";

export default function SearchInput({ onSearch, placeholder }) {
    console.log("onSearch is a function:", typeof onSearch === "function");

    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword.toUpperCase());
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        onSearch(keyword.toUpperCase());
    };
    return (
        <form onSubmit={handleSubmit}>
            <input

                type="text"
                value={keyword}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </form>
    );
}



