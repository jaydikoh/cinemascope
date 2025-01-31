import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router'; 
import '../NowPlayingPage/NowPlayingPage.css';
import * as movieService from '../../services/movieService'
 

export default function NowPlayingPage({}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const currentTime = new Date();
      const timeISO = currentTime.toISOString();

      try {
        const movies = await movieService.getNowPlaying();
        setMovies(movies.filter((movie) => movie.release_date <= timeISO));
      } catch (err) {
        console.error('Error fetching movies:', err.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="now-playing-page">
      <h1>Now Playing Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-link">
            <div className="movie-card">
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <h2 className="movie-title">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

