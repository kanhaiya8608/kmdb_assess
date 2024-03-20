import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiMoviePlay, BiSolidMoviePlay  } from "react-icons/bi";
import img1 from '../assets/ufo.png';
import { addFavoriteMovie, removeFavoriteMovie } from '../redux/actions/favoritesActions';
import { addToWatchlist, removeFromWatchlist } from '../redux/actions/watchlistActions';
import ReactPlayer from 'react-player';
import Iconimg from '../assets/play.png'
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies);
  const watchlist = useSelector(state => state.watchlist.watchlist);
  const videoPopupRef = useRef(null);
  const baseUrl = import.meta.env.VITE_TMDB_API_URL;
  const apiKey = import.meta.env.VITE_TMDB_API_ID;
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavoriteMovie(movie));
  };

  const handleRemoveFavorite = (movieId) => {
    dispatch(removeFavoriteMovie(movieId));
  };

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist(movie));
  };

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(removeFromWatchlist(movieId));
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(
          `${baseUrl}movie/${id}?api_key=${apiKey}`
        );
        setMovie(movieResponse.data);

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        const trailers = trailerResponse.data.results;
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleOverlayClick = (event) => {
    if (event.target === videoPopupRef.current) {
      setShowVideoPopup(false);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 py-8 flex md:flex-row flex-col justify-between min-h-screen space-x-6">
  <div className="mb-4 lg:mb-0">
  <img 
    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img1} 
    alt={movie.title} 
    className="h-3/4 rounded-lg" 
  />
  </div>
  <div className="lg:w-1/2">
    <h2 className="text-xl font-bold mb-4 dark:text-white">{movie.title}</h2>
    <p className="text-gray-700 mb-4 dark:text-gray-300">{movie.overview}</p>
    <p className="text-gray-700 mb-4 dark:text-gray-300"><span className='font-bold'>Release Date:</span> {movie.release_date}</p>
    <p className="text-gray-700 mb-4 dark:text-gray-300"><span className='font-bold'>User Score:</span> {movie.vote_average}</p>

    {trailerKey && (
      <div className='flex space-x-4'>
        <button
          onClick={() => setShowVideoPopup(true)}
          className=""
        >
         <img src={Iconimg} className='h-12' alt=""  />
        </button>
        
          {favoriteMovies.some(favMovie => favMovie.id === movie.id) ? (
            <AiFillHeart size={50} onClick={() => handleRemoveFavorite(movie.id)} className="text-red-500 cursor-pointer " />
          ) : (
            <AiOutlineHeart size={50} onClick={() => handleAddFavorite(movie)} className="text-gray-500 cursor-pointer " />
          )}
          {watchlist.some(item => item.id === movie.id) ? (
            <BiSolidMoviePlay size={50} onClick={() => handleRemoveFromWatchlist(movie.id)} className="text-black-400 cursor-pointer  " />
          ) : (
            <BiMoviePlay size={50} onClick={() => handleAddToWatchlist(movie)} className="text-red-500 cursor-pointer " />
          )}
        
      </div>
    )}
  </div>

  {showVideoPopup && (
    <div className="fixed inset-0 flex items-center justify-center" ref={videoPopupRef} onClick={handleOverlayClick}>
      <div className="rounded-lg border-none dark:bg-gray-900">
        <button
          onClick={() => setShowVideoPopup(false)}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 dark:text-white"
        >
          X
        </button>
        <div className="aspect-w-16 aspect-h-9 lg:aspect-w-22 lg:aspect-h-15">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            controls
            width='80vw'
            height='65vh'
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default MovieDetails;
