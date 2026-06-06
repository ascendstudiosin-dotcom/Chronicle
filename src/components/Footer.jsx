import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      
      // Giant text slide up reveal
      gsap.fromTo('.footer-giant-text span',
        { y: isMobile ? '0%' : '120%' },
        {
          y: '0%', 
          duration: 1.5, 
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: footerRef.current,
            start: isMobile ? 'top 95%' : 'top 85%',
          }
        }
      );
      
      gsap.fromTo('.footer-top-line', 
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <footer id="epistles" className="footer-ultra" ref={footerRef}>
      <div className="footer-top-line"></div>
      
      <div className="footer-grid container">
        <div className="footer-left">
          <p className="footer-manifesto">
            Curating the profound.<br/>
            An editorial sanctuary.
          </p>
          <div className="footer-socials">
            <a href="#">IG</a>
            <a href="#">TW</a>
            <a href="#">IN</a>
          </div>
        </div>
        
        <div className="footer-right">
          <p className="footer-production">
            A <a href="https://voidstudio.co" target="_blank" rel="noopener noreferrer" className="void-link">Ascend</a> CREATION
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} CHRONICLE.<br/>
            ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      <div className="footer-giant-wrapper">
        <h2 className="footer-giant-text">
          <span>C</span><span>H</span><span>R</span><span>O</span><span>N</span><span>I</span><span>C</span><span>L</span><span>E</span><span>.</span>
        </h2>
      </div>
    </footer>
  );
}
