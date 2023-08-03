// SearchForm.js
import React from "react";

const SearchForm = ({ inputData, setInputData, handleFormSubmit }) => {
  return (
    <div className="App">
      <h1>Image-Search-App</h1>
      <form action="" onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search-input"
          placeholder="search for images"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
