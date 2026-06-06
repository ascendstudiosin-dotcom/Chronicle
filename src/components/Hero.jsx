import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-kicker',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 1.8 }
      )
      .fromTo('.hero-title-word', 
        { y: '120%', rotate: 5, opacity: 0 },
        { 
          y: '0%', 
          rotate: 0, 
          opacity: 1, 
          duration: 1.8, 
          stagger: 0.1, 
          ease: 'power4.out'
        },
        "-=1.2"
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        "-=1.2"
      )
      .fromTo('.scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
        "-=1"
      );
      
      // Subtle parallax on scroll
      gsap.to('.hero-title-container', {
        yPercent: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-minimal" ref={containerRef}>
      <div className="container hero-title-container">
        <p className="hero-kicker">Ascend PRESENTS</p>
        <h1 className="hero-title">
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-title-word" style={{ display: 'block' }}>CHRONICLES</span>
          </div>
        </h1>
      </div>
      
      <div className="hero-bottom">
        <p className="hero-subtitle">Curating the profound.<br/>An editorial sanctuary for narratives that shift paradigms.</p>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
}
