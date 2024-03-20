import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie } from '../redux/actions/favoritesActions';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/watchlistActions';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import img1 from '../assets/ufo.png'
import MovieItem from '../components/MovieItem';
import { BiMoviePlay, BiSolidMoviePlay } from 'react-icons/bi';
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const baseUrl= import.meta.env.VITE_TMDB_API_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_ID;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `${baseUrl}movie/popular?api_key=${apiKey}`;
        if (searchQuery) {
          url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchQuery}`;
        }
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
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

  return (
    <div className="container mx-auto p-6  min-h-screen ">

    <h2 className="text-3xl font-bold my-4 dark:text-white">Popular Movies</h2>
    <form onSubmit={handleSearch} className="mb-4 flex">
  <input
    type="text"
    name="search"
    placeholder="Search for a movie"
    className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
  />
  <button type="submit" className="dark:bg-black hover:dark:bg-gray-700 ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
    Search
  </button>
</form>
    {/* Popular Movies List */}
    <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {movies.map((movie) => (
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

export default MovieList;
