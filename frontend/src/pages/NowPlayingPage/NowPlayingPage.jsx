import { useState, useEffect } from 'react';
import '../NowPlayingPage/NowPlayingPage.css';

export default function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const currentTime = new Date();
      const timeISO = currentTime.toISOString();
      console.log(currentTime)
      console.log(timeISO)
      console.log('2024-12-19T00:00:00.000+00:00' < timeISO)
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.filter((movie) => movie.release_date <= timeISO));
      } catch (err) {
        console.error('Error fetching movies:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div className="now-playing-page">
      <h1>Now Playing Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={movie.image}></img>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p><strong>Release Date:</strong> {new Date(movie.release_date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}