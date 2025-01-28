import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './MovieDetailsPage.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams(); // Extract the movieId from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`/api/movies/${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p className="loading">Loading movie details...</p>;

  if (!movie) return <p className="error">Movie not found.</p>;

  return (
    <div className="movie-details">
      <div className="movie-banner">
        {movie.image && <img src={movie.image} alt={movie.title} className="movie-poster" />}
      </div>
      <div className="movie-content">
        <h1>{movie.title}</h1>
        <p className="release-date"><strong>Release Date:</strong> {new Date(movie.release_date).toDateString()}</p>
        <p className="overview">{movie.overview}</p>

        <h2>Comments</h2>
        {movie.comments.length > 0 ? (
          <ul className="comments-list">
            {movie.comments.map((comment, index) => (
              <li key={index} className="comment">
                <p><strong>{comment.author?.name || 'Anonymous'}</strong>: {comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}