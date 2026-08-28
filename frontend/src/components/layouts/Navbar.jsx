import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import FireArrowButton from '../ui/FireArrowButton';
import { Menu, X, LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-navy-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-pulse-orange transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-pulse-orange transition-colors">How It Works</a>
            <a href="#prediction" className="hover:text-pulse-orange transition-colors">Prediction Tech</a>
            <Link to="/dashboard" className="hover:text-pulse-orange transition-colors flex items-center gap-1.5">
              <LayoutDashboard className="w-4 h-4 text-pulse-orange" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-400" />
              <span>Login</span>
            </Link>
            <FireArrowButton
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
              size="md"
            >
              Get Started
            </FireArrowButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-navy-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 space-y-4">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-pulse-orange py-2 font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-pulse-orange py-2 font-medium"
          >
            How It Works
          </a>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-pulse-orange py-2 font-medium"
          >
            Dashboard
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-slate-300 font-semibold border border-slate-700 rounded-xl"
            >
              Login
            </Link>
            <FireArrowButton
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/register');
              }}
              size="md"
              className="w-full"
            >
              Get Started
            </FireArrowButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
