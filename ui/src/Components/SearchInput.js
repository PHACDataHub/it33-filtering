import React, { useState } from "react";

export default function SearchInput({ onSearch, placeholder }) {
    const [keyword, setKeyword] = useState("");
    const [displayedPlaceholder, setDisplayedPlaceholder] = useState(placeholder);

    const handleChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword.toUpperCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(keyword.toUpperCase());
        setDisplayedPlaceholder(keyword.toUpperCase());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={keyword}
                onChange={handleChange}
                placeholder={displayedPlaceholder}
            />
        </form>
    );
}
