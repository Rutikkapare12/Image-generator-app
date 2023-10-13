import "./App.css";
import SearchResults from "./components/SearchResults";
import Loading from "./components/Loading";
import SearchForm from "./components/SearchForm";
import ShowMoreButton from "./components/ShowMoreButton";
import { useGlobalContext } from "./context/ContextApi";

function App() {
  const { loading, searchResults } = useGlobalContext();

  return (
    <>
      <SearchForm />

      {loading && <Loading />}

      {!loading && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <SearchResults key={index} result={result} />
          ))}
        </div>
      )}

      <ShowMoreButton />
    </>
  );
}

export default App;
