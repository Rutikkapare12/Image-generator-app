import React from "react";
import { createContext, useContext, useState, useEffect } from "react"; // import context initialitials
import { animals } from "../data"; 


const AppContext = createContext(); // create context

const AppProvider = ({ children }) => {
  // providing data context
  // State ....
  const [inputData, setInputData] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const accessKey = "o124NbBiuIPOCwJvCxu5BIJ8wtY2qFD0NNqNhtx2O8Y";

  async function searchImages(defaulter) {
    try {
      setLoading(true);

      const query = inputData || defaulter;

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;

      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;


      if (page === 1) {
        setSearchResults([]);
      }

      // Check if there are any search results
      if (results.length === 0) {
        setMessage(true);
        setLoading(true);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...results]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
        setMessage(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    searchImages(getRandomAnimal());
    // eslint-disable-next-line
  }, []);

  function getRandomAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    return animals[randomIndex];
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchResults([]);
    searchImages();
  };

  const handleShowMore = () => {
    searchImages();
  };

  return (
    <AppContext.Provider
      value={{
        inputData,
        setInputData,
        handleFormSubmit,
        message,
        loading,
        handleShowMore,
        searchResults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  // export global context using useContext
  return useContext(AppContext);
};

export { AppContext, AppProvider };
