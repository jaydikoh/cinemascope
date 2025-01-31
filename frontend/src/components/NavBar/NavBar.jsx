import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  return (
    <nav className="NavBar">
      <div className="nav-container">
        <NavLink to="/" className="logo">
        <img src="/images/cinemascopelogo.png" alt="CinemaScope Logo" className="logo-image"/>
        </NavLink>

        {user && (
        <ul className="nav-links">
          <li>
          <NavLink to="/now-playing">Now Playing</NavLink> 
          </li>
          <li>
          <NavLink to="/watchlist">Watchlist</NavLink>
          </li>
        </ul>
        )}

        <div className="auth-links">
          {user ? (
            <>
            
              <span>Welcome, {user.name}</span>
              <button className="logout-btn" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="auth-link">
                Log In
              </NavLink>
              <NavLink to="/signup" className="auth-link">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

