import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './MovieDetailsPage.css';
import * as movieService from '../../services/movieService'

export default function MovieDetailsPage() {
  const { movieId } = useParams(); // Extract the movieId from the URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movie = await movieService.getMovieDetails(movieId)
        setMovie(movie);
      } catch (err) {
        console.error('Error fetching movie details:', err.message);
      } 
    }

    fetchMovieDetails();
  }, [movieId]);


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


