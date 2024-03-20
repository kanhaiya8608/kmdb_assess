import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiMoviePlay, BiSolidMoviePlay } from 'react-icons/bi';
import img1 from '../assets/ufo.png';
const MovieItem = ({ movie, favoriteMovies, watchlist, handleAddFavorite, handleRemoveFavorite, handleAddToWatchlist, handleRemoveFromWatchlist }) => {
  return (
    <li key={movie.id} className="border rounded-lg overflow-hidden bg-white">
      <Link to={`/movie/${movie.id}`}>
        {movie.poster_path ? ( 
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"
          />
        ) : (
          <img
            src={img1}
            alt={movie.title}
            className="w-full h-auto"
          />
        )}
      </Link>
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        </Link>
        <p><span className="text-blue-700 font-bold">{movie.vote_average.toFixed(1)}</span>/10</p>
        <div className="mt-2 flex justify-between">
          {favoriteMovies.some(favMovie => favMovie.id === movie.id) ? (
            <AiFillHeart onClick={() => handleRemoveFavorite(movie.id)} className="text-red-500 cursor-pointer mr-2 text-2xl" />
          ) : (
            <AiOutlineHeart onClick={() => handleAddFavorite(movie)} className="text-gray-500 cursor-pointer mr-2 text-2xl" />
          )}
          {watchlist.some(item => item.id === movie.id) ? (
            <BiMoviePlay onClick={() => handleRemoveFromWatchlist(movie.id)} className="text-green-500 cursor-pointer text-2xl" />
          ) : (
            <BiSolidMoviePlay onClick={() => handleAddToWatchlist(movie)} className="text-black-400 cursor-pointer text-2xl" />
          )}
        </div>
      </div>
    </li>
  );
};

export default MovieItem;
