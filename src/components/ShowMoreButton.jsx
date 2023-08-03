// ShowMoreButton.js
import React from "react";

const ShowMoreButton = ({ handleShowMore, inputData }) => {
  return (
    <button className={inputData ? "show-more-button" : "show-more-button hide"} onClick={handleShowMore}>
      Show More
    </button>
  );
};

export default ShowMoreButton;
