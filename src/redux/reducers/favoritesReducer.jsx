import { ADD_FAVORITE_MOVIE, REMOVE_FAVORITE_MOVIE } from '../actions/favoritesActions';

const initialState = {
  favoriteMovies: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_MOVIE:
      const existingMovieIndex = state.favoriteMovies.findIndex(movie => movie.id === action.payload.id);
      
      if (existingMovieIndex !== -1) {
        const updatedMovies = [...state.favoriteMovies];
        updatedMovies[existingMovieIndex] = action.payload;
        
        return {
          ...state,
          favoriteMovies: updatedMovies,
        };
      } else {
        return {
          ...state,
          favoriteMovies: [...state.favoriteMovies, action.payload],
        };
      }

    case REMOVE_FAVORITE_MOVIE:
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
