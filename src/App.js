import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=bde87b6a';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&S=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(searchTitle);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTitle)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  )
}

export default App
