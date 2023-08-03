import "./App.css";
import { useState, useEffect } from "react";
import SearchResults from "./components/SearchResults";
import { animals } from "./data";
import Loading from "./components/Loading";
import SearchForm from "./components/SearchForm";
import ShowMoreButton from "./components/ShowMoreButton";

const accessKey = "pzIWNL1JIYWapn7fYGkyFDmqjvuj27RT3bBg9kP3VVE";

function App() {
  const [inputData, setInputData] = useState("");
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setSearchResults((prevResults) => [...prevResults, ...results]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      console.log(searchResults);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  useEffect(() => {
    searchImages(getRandomAnimal());
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
      />

      {loading && <Loading />}

      {!loading && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <SearchResults key={index} result={result} />
          ))}
        </div>
      )}

      <ShowMoreButton inputData={inputData} handleShowMore={handleShowMore} />
    </>
  );
}

export default App;
