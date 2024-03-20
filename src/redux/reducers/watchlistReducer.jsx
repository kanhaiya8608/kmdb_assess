import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST } from '../actions/watchlistActions';

const initialState = {
  watchlist: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WATCHLIST:
      const existingItemIndex = state.watchlist.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        const updatedWatchlist = [...state.watchlist];
        updatedWatchlist[existingItemIndex] = action.payload;
        
        return {
          ...state,
          watchlist: updatedWatchlist,
        };
      } else {
        return {
          ...state,
          watchlist: [...state.watchlist, action.payload],
        };
      }

    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default watchlistReducer;
