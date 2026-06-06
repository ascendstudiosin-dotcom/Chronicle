import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.about-word');
      gsap.fromTo(words, 
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const text = "Chronicle transcends the traditional reading experience. We curate immersive narratives that demand pause in a world of constant motion. Every story is an artifact. Every word is deliberate.";
  
  return (
    <section id="the-order" className="about-minimal" ref={sectionRef}>
      <div className="container">
        <h2 className="about-statement">
          {text.split(' ').map((word, i) => (
            <span key={i} className="about-word">{word} </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
