import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  
  // Real-time clock for that premium editorial feel
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initial drop down animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-animate', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <nav className="fixed-royal-nav" ref={navRef}>
        <div className="nav-left nav-animate">
          <span className="nav-meta">EDITION NO. 1</span>
          <span className="nav-time">{time}</span>
        </div>
        
        <div className="nav-center nav-animate">
          <Link to="/" className="nav-logo-premium" onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>
            Chronicles.
          </Link>
        </div>
        
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/#the-order" className="nav-link-premium nav-animate" onClick={(e) => handleNav(e, 'the-order')}>
            <span>About</span>
          </a>
          <a href="/#manuscripts" className="nav-link-premium nav-animate" onClick={(e) => handleNav(e, 'manuscripts')}>
            <span>Stories</span>
          </a>
          <Link to="/archive" className="nav-link-premium nav-animate">
            <span>Archive</span>
          </Link>
        </div>
      </nav>

      <nav className="mobile-royal-nav">
        <Link to="/" className="mobile-nav-logo" onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          Chronicles.
        </Link>
        <div className="mobile-nav-links">
          <a href="/#the-order" className="mobile-nav-link" onClick={(e) => handleNav(e, 'the-order')}>About</a>
          <a href="/#manuscripts" className="mobile-nav-link" onClick={(e) => handleNav(e, 'manuscripts')}>Stories</a>
          <Link to="/archive" className="mobile-nav-link">Archive</Link>
        </div>
      </nav>
    </>
  );
}
