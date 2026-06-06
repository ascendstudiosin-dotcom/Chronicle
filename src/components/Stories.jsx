import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const storiesData = [
  { id: "1", number: "01", title: "Salahuddin Ayyubi", category: "Historical Epic", image: "/salahuddin_ayyubi.png" },
  { id: "2", number: "02", title: "Coming Soon", category: "Locked", locked: true },
  { id: "3", number: "03", title: "Coming Soon", category: "Locked", locked: true },
  { id: "4", number: "04", title: "Coming Soon", category: "Locked", locked: true }
];

export default function Stories() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stories-title-minimal',
        { opacity: 0, y: 100 },
        {
          opacity: 1, y: 0, duration: 1.5, ease: 'power4.out',
          scrollTrigger: {
            trigger: '.stories-header-minimal',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.story-list-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stories-list-minimal',
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manuscripts" className="stories-minimal" ref={sectionRef}>
      <div className="stories-header-minimal container">
        <h2 className="stories-title-minimal">Selected<br/>Stories / Biographies</h2>
        <Link to="/archive" className="stories-view-all-minimal">View Archive</Link>
      </div>
      
      <div className="stories-list-minimal">
        {storiesData.map(story => {
          const Wrapper = story.locked ? 'div' : Link;
          return (
            <Wrapper 
              to={!story.locked ? `/story/${story.id}` : undefined} 
              key={story.id} 
              className={`story-list-item ${story.locked ? 'locked' : ''}`}
            >
              <div className="story-item-bg-minimal"></div>
              
              <div className="story-info-minimal container">
                <span className="story-number-minimal">{story.number}</span>
                <h3 className="story-name-minimal">{story.title}</h3>
                <span className="story-category-minimal">
                  {story.locked ? 'LOCKED' : story.category}
                </span>
              </div>

              {!story.locked && (
                <img src={story.image} alt={story.title} className="story-hover-image" />
              )}
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
