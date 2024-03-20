
export const ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE';
export const REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE';

export const addFavoriteMovie = (movie) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: movie,
});

export const removeFavoriteMovie = (movieId) => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: movieId,
});