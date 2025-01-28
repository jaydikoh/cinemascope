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
        {/* Logo */}
        <NavLink to="/" className="logo">
          CinemaScope
        </NavLink>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/showtimes">Showtimes</NavLink>
          </li>
          <li>
            <NavLink to="/theaters">Theaters</NavLink>
          </li>
          <li>
          <NavLink to="/now-playing">Now Playing</NavLink> {/* New Link */}
          </li>
          <li>
            <NavLink to="/support">Support</NavLink>
          </li>
        </ul>

        {/* Auth Links */}
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

