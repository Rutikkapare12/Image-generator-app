// ShowMoreButton.js
import React from "react";

const ShowMoreButton = ({ handleShowMore, inputData, message }) => {
  return (
    <button className={inputData ? (message ? "show-more-button hide" : "show-more-button") : "show-more-button hide"} onClick={handleShowMore}>
      Show More
    </button>
  );
};

export default ShowMoreButton;
