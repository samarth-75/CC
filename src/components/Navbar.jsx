import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Trophy, 
  Sword, 
  Target, 
  User, 
  LogOut,
  Code2,
  Star
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/arena', label: 'Arena', icon: Sword },
    { path: '/challenges', label: 'Challenges', icon: Target },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="relative">
              <Code2 className="h-8 w-8 text-purple-400" />
              <div className="absolute -inset-1 bg-purple-400/20 rounded-lg blur"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CodeCrafters
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300 hidden sm:block">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-purple-400" />
                <span className="font-medium text-white">{user?.username}</span>
              </div>
              <div className="text-xs text-purple-400">
                <span className="text-white font-bold">
                    Level {user?.xp !== undefined ? Math.floor(user.xp / 100) : 0}
                  </span> • {user?.xp} XP
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-purple-500/20">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/50">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                location.pathname === path
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;