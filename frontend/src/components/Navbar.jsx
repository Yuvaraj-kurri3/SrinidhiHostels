import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
        sessionStorage.removeItem('user');
        setLogoutMessage('✓ Logout successful! Redirecting...');
        setTimeout(() => {
          setLogoutMessage('');
          navigate('/');
        }, 500);
      }
    catch (error) {
      setLogoutMessage('✗ Logout failed. Please try again.');
      setTimeout(() => {
        setLogoutMessage('');
      }, 3000);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <Link to="/" className="logo">
          Srinidhi<span className="text-gradient">Hostels</span>
        </Link>

        <div className="desktop-links">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="desktop-actions">
          <button className="btn-login" onClick={handleLoginClick}>Login</button>

          <button className=" btn-logout" onClick={handleLogoutClick}>Logout</button>
        </div>

        {logoutMessage && (
          <div className="logout-message" style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            backgroundColor: logoutMessage.includes('✓') ? '#10b981' : '#ef4444',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '9999',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {logoutMessage}
          </div>
        )}

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <button className="btn-login mobile" onClick={handleLoginClick}>Login</button>
          <button className="btn-logout mobile" onClick={handleLogoutClick}>Logout</button>

        </div>
      </div>
    </nav>

  );
};

export default Navbar;
