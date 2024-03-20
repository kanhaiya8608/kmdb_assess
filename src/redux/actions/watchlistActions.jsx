
export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';

export const addToWatchlist = (movie) => ({
  type: ADD_TO_WATCHLIST,
  payload: movie,
});

export const removeFromWatchlist = (movieId) => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: movieId,
});
