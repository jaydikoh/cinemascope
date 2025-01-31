import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import HomePage from '../HomePage/HomePage';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage'; 
import NowPlayingPage from '../NowPlayingPage/NowPlayingPage'; 
import WatchlistPage from "../WatchlistPage/WatchlistPage";
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() { 
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/now-playing" element={<NowPlayingPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage user={user} />} /> 
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

