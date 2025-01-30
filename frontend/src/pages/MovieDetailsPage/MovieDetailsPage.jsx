import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './MovieDetailsPage.css';
import * as movieService from '../../services/movieService'

export default function MovieDetailsPage({ user }) {
  const { movieId } = useParams(); // Extract the movieId from the URL
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState();
  const [newComment, setNewComment] = useState(''); // For storing the new comment text
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movie = await movieService.getMovieDetails(movieId)
        setMovie(movie);
        console.log(user)
        console.log("movie isfavorited", movie.favorites?.includes(user?._id))
        setIsFavorite(movie.favorites?.includes(user?._id)); // Check if the movie is already in the user's favorites
      } catch (err) {
        console.error('Error fetching movie details:', err.message);
      } 
    }

    fetchMovieDetails();
  }, []);

  async function handleAddToWatchlist() {
    try {
      const updatedMovie = await movieService.addFavorite(movieId); // Call service to add/remove from watchlist
      setIsFavorite(!isFavorite); // Check if the movie is already in the user's favorites
      // setIsFavorite(updatedMovie.movie.favorites?.includes(movieId)); // Check if the movie is already in the user's favorites
    } catch (err) {
      console.error('Error adding to watchlist:', err.message);
    }
  }

  // async function handleWatchlistButton() {

  // }

  async function handleAddComment() {
    try {
      const updatedMovie = await movieService.createComment(movieId, { text: newComment });
      console.log(updatedMovie)
      setMovie(updatedMovie); 
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await movieService.deleteComment(movieId, commentId);
      setMovie((prevMovie) => ({
        ...prevMovie,
        comments: prevMovie.comments.filter((c) => c._id !== commentId),
      }));
    } catch (err) {
      console.error("Error deleting comment:", err.message);
    }
  }

  function enableEditMode(comment) {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  }

  async function handleUpdateComment(commentId) {
    try {
      await movieService.updateComment(movieId, commentId, { text: editText });
      setMovie((prevMovie) => ({
        ...prevMovie,
        comments: prevMovie.comments.map((c) =>
          c._id === commentId ? { ...c, text: editText } : c
        ),
      }));
      setEditingCommentId(null);
    } catch (err) {
      console.error("Error updating comment:", err.message);
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
              <li key={comment._id} className="comment">
              {editingCommentId === comment._id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="update-comment-btn" onClick={() => handleUpdateComment(comment._id)}>
                    ✅
                  </button>
                  <button className="cancel-edit-btn" onClick={() => setEditingCommentId(null)}>
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <p>
                    <strong>{comment.author?.name}</strong>: {comment.text}
                  </p>
                  {/* Show delete & edit buttons only for the author */}
                  {/* {user && comment.author?._id === user._id && ( */}
                    <>
                      <button
                        className="delete-comment-btn"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        🗑
                      </button>
                      <button
                        className="edit-comment-btn"
                        onClick={() => enableEditMode(comment)}
                      >
                        ✏️
                      </button>
                    </>
                  {/* )} */}
                </>
              )}
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