import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Fix typo: Use react-router-dom
import '../NowPlayingPage/NowPlayingPage.css';

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const currentTime = new Date();
      const timeISO = currentTime.toISOString();

      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.filter((movie) => movie.release_date <= timeISO));
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

