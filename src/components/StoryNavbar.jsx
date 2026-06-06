import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORY_PARTS = [
  { id: 1, title: "Salahuddin Ayyubi", locked: false },
  { id: 2, title: "The Child Born in Exile", locked: false },
  { id: 3, title: "The Road to Egypt", locked: false },
  { id: 4, title: "The Fall of the Fatimids", locked: false },
  { id: 5, title: "The Death of Nur ad-Din", locked: false },
  { id: 6, title: "The Sword Turns Toward Jerusalem", locked: false },
  { id: 7, title: "The Battle of Hattin", locked: false },
  { id: 8, title: "The Return to Jerusalem", locked: false },
  { id: 9, title: "The Lionheart and the Sultan", locked: false },
  { id: 10, title: "The Final Days of Salahuddin", locked: false },
  { id: 11, title: "The Legacy of Salahuddin", locked: false },
  { id: 12, title: "The Eternal Echo of Salahuddin", locked: false }
];

export default function StoryNavbar({ currentPartId = 1 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPart = STORY_PARTS.find(p => p.id === parseInt(currentPartId));

  // Lock background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* DESKTOP CINEMATIC NAV (100% UNTOUCHED) */}
      <nav className="cinematic-nav-wrapper">
        <Link to="/#stories" className="nav-back-button">
          ← RETURN
        </Link>

        <div 
          className={`dynamic-island ${menuOpen ? 'expanded' : ''}`}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <div className="island-header">
            <span className="island-part-label">PART {currentPartId}</span>
            <span className="island-separator">❖</span>
            <span className="island-title">{currentPart?.title}</span>
          </div>

          <div className="island-content">
            <div className="island-scroll" data-lenis-prevent="true">
              {STORY_PARTS.map(part => {
                const CardWrapper = part.locked ? 'div' : Link;
                const linkProps = part.locked ? {} : { to: `/story/${part.id}` };
                return (
                  <CardWrapper 
                    key={part.id}
                    {...linkProps}
                    className={`island-item ${part.id === parseInt(currentPartId) ? 'active' : ''} ${part.locked ? 'locked' : ''}`}
                  >
                    <span className="item-num">
                      {part.locked ? '🔒' : (part.id === parseInt(currentPartId) ? '❖' : part.id)}
                    </span>
                    <span className="item-title">{part.title}</span>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* DEDICATED MOBILE STORY NAV */}
      <nav className="mobile-story-nav-container">
        <div className={`mobile-story-topbar ${mobileMenuOpen ? 'drawer-open' : ''}`}>
          <Link to="/#stories" className="mobile-story-back">
            ← RETURN
          </Link>
          <button 
            className={`mobile-story-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="toggle-label">PART {currentPartId}</span>
            <span className="toggle-icon">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        {/* FULL SCREEN MOBILE PARTS DRAWER */}
        <div 
          className={`mobile-story-drawer ${mobileMenuOpen ? 'open' : ''}`} 
          data-lenis-prevent="true"
        >
          <div className="mobile-drawer-header">
            <span className="drawer-subtitle">SELECT A MANUSCRIPT</span>
            <h3 className="drawer-title">THE CHRONICLES</h3>
          </div>
          <div className="mobile-drawer-list">
            {STORY_PARTS.map(part => {
              const CardWrapper = part.locked ? 'div' : Link;
              const linkProps = part.locked ? {} : { to: `/story/${part.id}` };
              return (
                <CardWrapper 
                  key={part.id}
                  {...linkProps}
                  onClick={() => !part.locked && setMobileMenuOpen(false)}
                  className={`mobile-drawer-item ${part.id === parseInt(currentPartId) ? 'active' : ''} ${part.locked ? 'locked' : ''}`}
                >
                  <div className="drawer-item-left">
                    <span className="drawer-item-num">
                      {part.locked ? '🔒' : (part.id === parseInt(currentPartId) ? '❖' : part.id)}
                    </span>
                    <span className="drawer-item-title">{part.title}</span>
                  </div>
                  <span className="drawer-item-arrow">{part.locked ? '' : '→'}</span>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
