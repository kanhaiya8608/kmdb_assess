import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './pages/MovieList';
import SearchResult from './pages/SearchResult';
import Navbar from './components/Navbar';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import Watchlist from './pages/WatchList';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Layout from './components/shared/Layout';

const App = () => {
  return (
    <Router>
      <div className='dark:bg-stone-700'>
        <Navbar />
        <Routes>
        <Route path="/" element={<Layout />}/>
          <Route index element={<MovieList />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />          
          <Route path="/watchlist" element={<Watchlist/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
