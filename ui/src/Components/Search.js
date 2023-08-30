import React, { useState } from "react";

export function SearchInput({ onSearch, placeholder }) {
    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
        onSearch(newKeyword);
    };
    return (
        <input
            type="text"
            value={keyword}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}



export default SearchInput;