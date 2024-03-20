import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../redux/actions/watchlistActions';
import { MdMovieEdit } from "react-icons/md";
const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistItems = useSelector(state => state.watchlist.watchlist);

  const handleRemoveFromWatchlist = (itemId) => {
    dispatch(removeFromWatchlist(itemId));
  };

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
      <h2 className="text-3xl dark:text-white font-bold mb-4">Watchlist</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {watchlistItems.map((item) => (
          <li key={item.id} className="border rounded-lg overflow-hidden flex flex-col bg-white">
            <Link to={`/movie/${item.id}`} className="flex-grow">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt={item.title}
                className="w-full h-auto max-h-96"
              />
            </Link>
            <div className="p-4">
              <Link to={`/movie/${item.id}`}>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              </Link>
            
              <div className='flex justify-between'>
              <p><span className='text-blue-700 font-bold'>{item.vote_average.toFixed(1)}</span>/10</p>
              <button onClick={() => handleRemoveFromWatchlist(item.id)} className="bg-green-500 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded">
              <MdMovieEdit size={20}/>
              </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
