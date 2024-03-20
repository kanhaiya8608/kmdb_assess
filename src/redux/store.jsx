// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

// Load state from local storage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
