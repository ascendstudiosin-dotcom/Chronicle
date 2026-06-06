import React from 'react';
import { Link } from 'react-router-dom';

export default function StoryFooter({ currentPartId = 1 }) {
  const parts = [
    { id: 1, title: 'Salahuddin Ayyubi' },
    { id: 2, title: 'The Child Born in Exile' },
    { id: 3, title: 'The Road to Egypt' },
    { id: 4, title: 'The Fall of the Fatimids' },
    { id: 5, title: 'The Death of Nur ad-Din' },
    { id: 6, title: 'The Sword Turns Toward Jerusalem' },
    { id: 7, title: 'The Battle of Hattin' },
    { id: 8, title: 'The Return to Jerusalem' },
    { id: 9, title: 'The Lionheart and the Sultan' },
    { id: 10, title: 'The Final Days of Salahuddin' },
    { id: 11, title: 'The Legacy of Salahuddin' },
    { id: 12, title: 'The Eternal Echo of Salahuddin' }
  ];

  const currentIndex = parts.findIndex(p => p.id === parseInt(currentPartId));
  const prevPart = currentIndex > 0 ? parts[currentIndex - 1] : null;
  const nextPart = currentIndex < parts.length - 1 ? parts[currentIndex + 1] : null;

  return (
    <footer className="story-footer-plaque">
      <div className="plaque-divider">
        <div className="line"></div>
        <div className="ornament">❖</div>
        <div className="line"></div>
      </div>

      <div className="plaque-layout">
        <div className="plaque-side left">
          {prevPart && (
            <Link to={`/story/${prevPart.id}`} className="plaque-side-link">
              <span className="side-label">← PART {prevPart.id}</span>
              <span className="side-title">{prevPart.title}</span>
            </Link>
          )}
        </div>

        <div className="plaque-center">
          {nextPart ? (
            <Link to={`/story/${nextPart.id}`} className="plaque-btn">
              <div className="plaque-inner-border"></div>
              <div className="plaque-fill"></div>
              <span className="plaque-icon-top">❖</span>
              <span className="plaque-label">PART {nextPart.id}</span>
              <h3 className="plaque-title">{nextPart.title}</h3>
              <span className="plaque-icon-bottom">↓</span>
            </Link>
          ) : (
            <Link to="/" className="plaque-btn">
              <div className="plaque-inner-border"></div>
              <div className="plaque-fill"></div>
              <span className="plaque-icon-top">❖</span>
              <span className="plaque-label">THE END</span>
              <h3 className="plaque-title">Return to Library</h3>
              <span className="plaque-icon-bottom">↓</span>
            </Link>
          )}
        </div>

        <div className="plaque-side right">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="plaque-side-link"
          >
            <span className="side-label">❖ ASCEND</span>
            <span className="side-title">Scroll to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
