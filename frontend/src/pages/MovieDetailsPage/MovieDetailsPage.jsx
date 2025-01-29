import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './MovieDetailsPage.css';
import * as movieService from '../../services/movieService'

export default function MovieDetailsPage() {
  const { movieId } = useParams(); // Extract the movieId from the URL
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [newComment, setNewComment] = useState(''); // For storing the new comment text


  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movie = await movieService.getMovieDetails(movieId)
        setMovie(movie);
        setIsFavorite(movie.favorites?.includes(movieId)); // Check if the movie is already in the user's favorites
      } catch (err) {
        console.error('Error fetching movie details:', err.message);
      } 
    }

    fetchMovieDetails();
  }, [movieId]);

  async function handleAddToWatchlist() {
    try {
      const updatedMovie = await movieService.addFavorite(movieId); // Call service to add/remove from watchlist
      setIsFavorite(!isFavorite); // Update the local state to reflect the change
    } catch (err) {
      console.error('Error adding to watchlist:', err.message);
    }
  }

  async function handleAddComment() {
    try {
      const updatedMovie = await movieService.createComment(movieId, { text: newComment });
      setMovie(updatedMovie); 
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  }

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

        <button
          className={`watchlist-btn ${isFavorite ? 'added' : ''}`}
          onClick={handleAddToWatchlist}
        >
          {isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>

        <h2>Comments</h2>
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
          ></textarea>
          <button onClick={handleAddComment}>Add Comment</button>
        </div>

        {movie.comments.length > 0 ? (
          <ul className="comments-list">
            {movie.comments.map((comment, index) => (
              <li key={index} className="comment">
                <p><strong>{comment.author?.name }</strong>: {comment.text}</p>
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


