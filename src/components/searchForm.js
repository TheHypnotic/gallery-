import React, { useRef } from "react";
import { useGlobalContext } from "../context";
const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");

  const searcher = () => {
    setSearchTerm(searchValue.current.value);
  };
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        ref={searchValue}
        onChange={searcher}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchForm;
