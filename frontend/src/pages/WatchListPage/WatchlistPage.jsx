import { useEffect, useState } from "react";
import { Link } from "react-router"; // Correct import
import * as movieService from "../../services/movieService";
import "./WatchlistPage.css";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const movies = await movieService.getFavorites(); // Fetch favorite movies
        setWatchlist(movies);
      } catch (err) {
        console.error("Error fetching watchlist:", err.message);
      }
    }
    fetchWatchlist();
  }, []);

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="empty-message">No movies in your watchlist yet.</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-link">
              <div className="movie-card">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <h2 className="movie-title">{movie.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}