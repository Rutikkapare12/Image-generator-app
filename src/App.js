import "./App.css";
import { useState, useEffect } from "react";
import SearchResults from "./components/SearchResults";
import { animals } from "./data";
import Loading from "./components/Loading";
import SearchForm from "./components/SearchForm";
import ShowMoreButton from "./components/ShowMoreButton";

const accessKey = "o124NbBiuIPOCwJvCxu5BIJ8wtY2qFD0NNqNhtx2O8Y";

function App() {
  const [inputData, setInputData] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(false);

  async function searchImages(defaulter) {
    try {
      setLoading(true);

      const query = inputData || defaulter;

      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;

      const response = await fetch(url);
      const data = await response.json();
    
      const results = data.results;

      console.log(results);

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
  },[]);

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
    <>
      <SearchForm
        inputData={inputData}
        setInputData={setInputData}
        handleFormSubmit={handleFormSubmit}
        message={message}
      />

      {loading && <Loading />}

      {!loading && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <SearchResults key={index} result={result} />
          ))}
        </div>
      )}

      <ShowMoreButton inputData={inputData} handleShowMore={handleShowMore} message={message} />
    </>
  );
}

export default App;
