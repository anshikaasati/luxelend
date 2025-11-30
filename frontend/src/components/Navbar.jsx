import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gem, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 bg-white shadow-xl z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo/Site Name (Vastra Vows in Berry) */}
        <Link to="/" className="text-3xl font-extrabold text-primary-berry tracking-tight flex items-center">
          <div className="h-8 w-8 mr-2 hidden sm:block rounded-full p-0.5 border-2 border-primary-berry bg-secondary-gold/20 shadow-md flex items-center justify-center">
            <Gem className="w-5 h-5 text-primary-berry" />
          </div>
          Vastra Vows
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          <Link to="/items?category=clothes" className="hover:text-primary-berry transition duration-150 relative group">
            Bridal Lehengas
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-secondary-gold group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/items?category=clothes" className="hover:text-primary-berry transition duration-150 relative group">
            Groom's Attire
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-secondary-gold group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/items?category=jewellery" className="hover:text-primary-berry transition duration-150 relative group">
            Luxury Jewelry
            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-secondary-gold group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user && (
                <Link
                  to="/add-item"
                  className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full btn-gradient-vows text-white shadow-xl"
                >
                  <Gem className="w-4 h-4 mr-2" />
                  List Your Attire
                </Link>
              )}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-700 font-medium">Hi, {user.name}</span>
                <Link to="/bookings" className="text-sm text-gray-700 hover:text-primary-berry">Bookings</Link>
                <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-primary-berry">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/add-item"
                className="hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full btn-gradient-vows text-white shadow-xl"
              >
                <Gem className="w-4 h-4 mr-2" />
                List Your Attire
              </Link>
              <Link to="/login" className="hidden md:block text-sm text-gray-700 hover:text-primary-berry font-semibold">
                Login
              </Link>
              <Link to="/register" className="hidden md:block px-4 py-2 text-sm bg-primary-berry text-white rounded-full font-semibold hover:bg-primary-dark">
                Register
              </Link>
            </>
          )}
          <button
            className="p-2 border border-gray-200 rounded-full hover:shadow-lg hover:border-primary-berry transition duration-150 group md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700 group-hover:text-primary-berry" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700 group-hover:text-primary-berry" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/items?category=clothes" className="block py-2 text-gray-700 hover:text-primary-berry">
              Bridal Lehengas
            </Link>
            <Link to="/items?category=jewellery" className="block py-2 text-gray-700 hover:text-primary-berry">
              Luxury Jewelry
            </Link>
            {user ? (
              <>
                <Link to="/bookings" className="block py-2 text-gray-700 hover:text-primary-berry">
                  My Bookings
                </Link>
                <button onClick={handleLogout} className="block w-full text-left py-2 text-gray-700 hover:text-primary-berry">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-primary-berry">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-gray-700 hover:text-primary-berry">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
