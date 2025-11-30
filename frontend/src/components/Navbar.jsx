import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-brand text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-brand">
          Rent&Sparkle
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/items" className={navClasses}>
            Items
          </NavLink>
          <NavLink to="/add-item" className={navClasses}>
            Add Item
          </NavLink>
          {user && (
            <>
              <NavLink to="/bookings" className={navClasses}>
                My Bookings
              </NavLink>
              <NavLink to="/owner-items" className={navClasses}>
                My Listings
              </NavLink>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={handleLogout} className="px-3 py-2 text-sm bg-gray-200 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-sm text-brand">
                Login
              </Link>
              <Link to="/register" className="px-3 py-2 text-sm bg-brand text-white rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


