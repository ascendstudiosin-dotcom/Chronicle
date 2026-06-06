import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Archive.css';

const archiveData = [
  { id: "1", number: "01", title: "Salahuddin Ayyubi", category: "Historical Epic", image: "/salahuddin_ayyubi.png", locked: false },
  { id: "2", number: "02", title: "Coming Soon", category: "Locked", image: "", locked: true },
  { id: "3", number: "03", title: "Coming Soon", category: "Locked", image: "", locked: true },
  { id: "4", number: "04", title: "Coming Soon", category: "Locked", image: "", locked: true },
  { id: "5", number: "05", title: "Coming Soon", category: "Locked", image: "", locked: true },
  { id: "6", number: "06", title: "Coming Soon", category: "Locked", image: "", locked: true }
];

export default function Archive() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.archive-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.archive-grid-item', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div className="archive-page" ref={containerRef}>
        <div className="container">
          <h1 className="archive-title">Archive.</h1>
          
          <div className="archive-grid">
            {archiveData.map((item) => {
              const Wrapper = item.locked ? 'div' : Link;
              return (
                <Wrapper 
                  to={!item.locked ? `/story/${item.id}` : undefined} 
                  key={item.id} 
                  className={`archive-grid-item ${item.locked ? 'locked' : ''}`}
                >
                  <div className="archive-item-image-wrapper">
                    {item.locked ? (
                      <div className="archive-locked-placeholder">
                        <span>LOCKED</span>
                      </div>
                    ) : (
                      <img src={item.image} alt={item.title} className="archive-item-image" />
                    )}
                  </div>
                  <div className="archive-item-meta">
                    <span className="archive-item-number">{item.number}</span>
                    <h3 className="archive-item-title">{item.title}</h3>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
