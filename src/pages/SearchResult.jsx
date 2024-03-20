import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSort } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../redux/actions/favoritesActions';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/watchlistActions';
import MovieItem from '../components/MovieItem';

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const baseUrl= import.meta.env.VITE_TMDB_API_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_ID;

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("q");
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          let url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchQuery}`;
          const response = await axios.get(url);
          setSearchResults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      fetchSearchResults();
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    navigate(`/search?q=${query}`);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleAddFavorite = (movie) => {
    dispatch(addFavoriteMovie(movie));
  };

  const handleRemoveFavorite = (movieId) => {
    dispatch(removeFavoriteMovie(movieId));
  };

  const handleAddToWatchlist = (movie) => {
    dispatch(addToWatchlist(movie));
  };

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(removeFromWatchlist(movieId));
  };

  // Function to sort search results based on selected criteria
  const sortSearchResults = (results) => {
    if (sortBy === 'release_date.desc') {
      return results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortBy === 'release_date.asc') {
      return results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    } else if (sortBy === 'vote_average.desc') {
      return results.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'vote_average.asc') {
      return results.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortBy === 'popularity.desc') {
      return results.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'popularity.asc') {
      return results.sort((a, b) => a.popularity - b.popularity);
    } else {
      return results; // Default: return results without sorting
    }
  };

  return (
    <div className="container mx-auto p-6 py-8 min-h-screen">
      <h2 className="text-3xl font-bold my-4 dark:text-white">Search Results</h2>
      <form onSubmit={handleSearch} className="mb-4 flex justify-between">
        <input
          type="text"
          name="search"
          defaultValue={new URLSearchParams(location.search).get("q")}
          placeholder="Search for a movie"
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="dark:bg-black dark:hover:bg-gray-700 ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Search
        </button>
      </form>
      <div className="flex align-baseline md:justify-end mb-4">
        <label htmlFor="sortBy" className=""><FaSort size={25} className="inline-block mr-1" /></label>
        <select id="sortBy" onChange={handleSortByChange} value={sortBy} className="w-full md:w-auto border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
          <option value="">Default</option>
          <option value="popularity.desc">Popularity (Descending)</option>
          <option value="popularity.asc">Popularity (Ascending)</option>
          <option value="release_date.desc">Release Date (Descending)</option>
          <option value="release_date.asc">Release Date (Ascending)</option>
          <option value="vote_average.desc">Rating (Descending)</option>
          <option value="vote_average.asc">Rating (Ascending)</option>
        </select>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {sortSearchResults(searchResults).map((movie) => (
               <MovieItem
               key={movie.id}
               movie={movie}
               favoriteMovies={favoriteMovies}
               watchlist={watchlist}
               handleAddFavorite={handleAddFavorite}
               handleRemoveFavorite={handleRemoveFavorite}
               handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}
               />
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
