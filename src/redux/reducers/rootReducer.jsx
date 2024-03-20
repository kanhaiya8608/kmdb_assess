import { combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer';
import watchlistReducer from './watchlistReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
