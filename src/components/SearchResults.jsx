import React from "react";

const SearchResults = ({ result }) => {
  const {urls, alt_description, links} = result;
  return (
    <div className="search-result">
      <img src={urls.small} alt={alt_description} />
      <div>
        <a href={links.html} target="_blank" rel="noopener noreferrer">
          {alt_description}
        </a>
      </div>
    </div>
  );
};

export default SearchResults;
