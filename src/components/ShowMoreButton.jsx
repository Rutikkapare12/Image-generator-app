// ShowMoreButton.js
import React from "react";
import { useGlobalContext } from "../context/ContextApi";
const ShowMoreButton = () => {
  const { handleShowMore, inputData, message } = useGlobalContext()
  return (
    <button className={inputData ? (message ? "show-more-button hide" : "show-more-button") : "show-more-button hide"} onClick={handleShowMore}>
      Show More
    </button>
  );
};

export default ShowMoreButton;
