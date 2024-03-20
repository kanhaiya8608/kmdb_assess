import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavoriteMovie } from '../redux/actions/favoritesActions';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons
import img1 from '../assets/ufo.png'
const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies);

  const handleRemoveFavorite = (movieId) => {
    dispatch(removeFavoriteMovie(movieId));
  };

  return (
    <div className="container mx-auto p-6 py-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Favorite Movies</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favoriteMovies.map((movie) => (
          <li key={movie.id} className="border rounded-lg overflow-hidden bg-white">
            <Link to={`/movie/${movie.id}`}>
            {movie.poster_path ? ( // Check if poster_path exists
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : ( // Render placeholder if poster_path doesn't exist
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
              <p>Release Date: {movie.release_date}</p>
              <div className="mt-2 flex justify-between items-center">
                <button onClick={() => handleRemoveFavorite(movie.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded">
                  <AiOutlineHeart size={20} className="mr-1" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
