import { useEffect, useState } from "react";
import "./App.css";
import { MovieCard } from "./MovieCars";
import searchIcon from "./Search.svg";
import loadingGif from "./gifs/cube-loader.svg";

export const App = () => {
  const API_URL = "http://www.omdbapi.com/?apikey=1ebe11e9";
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = async (title) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    setIsLoading(false);
  };

  useEffect(() => {
    searchMovies("Random");
  }, []);

  return (
    <div className="app">
      <h1>Movie Box</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(search);
            }
          }}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <img
          onClick={() => searchMovies(search)}
          src={searchIcon}
          alt="search icon"
        />
      </div>
      {isLoading && (
        <>
          <div className="overlay"></div>
          <img src={loadingGif} style={{ zIndex: "1000" }} alt="Loading Gif" />
        </>
      )}
      {movies && movies.length > 0 ? (
        <div className="container">
          {movies.map((item, i) => {
            return <MovieCard isLoading={isLoading} key={i} movie1={item} />;
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found!</h2>
        </div>
      )}
    </div>
  );
};
