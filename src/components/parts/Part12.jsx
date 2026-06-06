import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part12() {
  const { id } = useParams();
  const pageRef = useRef(null);
  const heroImgRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    let ctx = gsap.context(() => {
      // Hero Parallax
      if (heroImgRef.current) {
        gsap.fromTo(heroImgRef.current, { yPercent: 0 }, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".story-page-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Reading Progress Bar
      gsap.to('.reading-progress-bar', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Image Mask Reveals
      const imageWrappers = gsap.utils.toArray('.editorial-image-wrapper');
      imageWrappers.forEach(wrapper => {
        gsap.to(wrapper, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%"
          }
        });
      });

      // Parallax Images within content
      const images = gsap.utils.toArray('.editorial-image');
      images.forEach(img => {
        gsap.fromTo(img, 
          { yPercent: -15 },
          { 
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      // Text Reveals
      const reveals = gsap.utils.toArray('.reveal-up');
      reveals.forEach(text => {
        gsap.fromTo(text, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });

      // Dividers Reveal
      const dividers = gsap.utils.toArray('.story-divider');
      dividers.forEach(divider => {
        gsap.fromTo(divider, 
          { scaleX: 0 },
          { 
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 90%"
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, pageRef.current);

    return () => ctx.revert();
  }, [id]);

  useEffect(() => {
    gsap.fromTo('.story-page-hero-bg',
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out', delay: 5.0 }
    );
    gsap.fromTo('.story-page-part-number',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 5.2 }
    );
    gsap.fromTo('.story-page-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: 'power4.out', delay: 5.4 }
    );
    gsap.fromTo('.story-page-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: 'power4.out', delay: 5.6 }
    );
  }, [id]);

  return (
    <article className="story-page-layout" ref={pageRef}>
      <div className="noise-overlay"></div>
      
      <div className="reading-progress-container">
        <div className="reading-progress-bar"></div>
      </div>

      <StoryNavbar currentPartId={12} title="THE ETERNAL ECHO OF SALAHUDDIN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/tikrit_river_escape.png" 
            alt="The Eternal Echo of Salahuddin" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 12</h1>
          <h2 className="story-page-title">THE ETERNAL ECHO OF SALAHUDDIN</h2>
          <p className="story-page-subtitle">The Man Who Never Truly Left</p>
        </div>
      </header>

      {/* SECTION 1: HISTORY FORGETS MOST PEOPLE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Immortal Memory</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>A child was born in Tikrit on a night of fear and exile. No throne waited for him. No prophecy surrounded him.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            History forgets most people. Even kings. Even conquerors. Even empires that once believed themselves eternal.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The palaces collapse.<br/>
            The banners disappear.<br/>
            The armies become dust beneath the earth.
          </p>
          
          <p className="editorial-p reveal-up">
            And eventually… silence swallows almost every name. But some names refuse to die. Not because they ruled the world. But because they touched something deeper inside the human soul.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3.5rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            Salahuddin Ayyubi was one of those names.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/tikrit_exile.png" alt="The perilous journey into darkness and exile from Tikrit" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Child Who Left in Darkness
          </h3>

          <p className="editorial-p reveal-up">
            Sometimes history feels almost poetic. A child was born in Tikrit (modern-day Iraq) on a night of fear and exile. No throne waited for him. No prophecy surrounded him. His family rode into darkness carrying nothing but uncertainty.
          </p>

          <p className="editorial-p reveal-up">
            And yet… that same child would one day ride into Jerusalem (modern-day Palestine) as its liberator. Not through magic. Not through destiny alone.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            But through decades of:<br/>
            sacrifice,<br/>
            patience,<br/>
            hardship,<br/>
            sincerity,<br/>
            and faith.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', marginTop: '4rem'}}>
            That is what makes his story timeless. Because it feels human. Painfully human.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE REAL BATTLE & JERUSALEM WAS NEVER JUST A CITY */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Invisible War</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>History is filled with conquerors stronger than Salahuddin. But very few remained humble after victory.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            The Real Battle
          </h3>

          <p className="editorial-p reveal-up">
            People think Salahuddin’s greatest battle happened at Hattin (modern-day Palestine / Israel region). Or during the liberation of Jerusalem. But perhaps his greatest battle was invisible.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The battle against:<br/>
            arrogance,<br/>
            power,<br/>
            ego,<br/>
            despair,<br/>
            and the corruption that destroys rulers from within.
          </p>

          <p className="editorial-p reveal-up">
            Because history is filled with conquerors stronger than Salahuddin. But very few remained humble after victory. Very few died with almost no wealth despite ruling empires. Very few inspired even enemies to respect them.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            And very few carried both: the sword of war, and the softness of sincere faith. That balance is what made him extraordinary.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/jerusalem_fall.png" alt="The monumental liberation of Al-Quds, restoring dignity and hope to the Ummah" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            Jerusalem Was Never Just a City
          </h3>

          <p className="editorial-p reveal-up">
            For Salahuddin… Jerusalem was never merely land. Never merely politics. Never merely conquest. It was identity. Memory. Faith. Honor. A wound carried by the Ummah for generations.
          </p>

          <p className="editorial-p reveal-up">
            And perhaps that is why the liberation of Al-Quds became larger than military victory. Because when Jerusalem returned… Muslims felt something inside themselves return too. Dignity. Hope. Belief. The feeling that decline was not permanent. That broken people could rise again.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE DREAM OF NUR AD-DIN & THE WARNING INSIDE HIS STORY */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>Seeds & Harvest</span>
            <h2 className="editorial-giant-text reveal-up">
              The Dream of Nur ad-Din
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--royal-red)', margin: '4rem 0' }}>
              There is something deeply emotional hidden inside Salahuddin’s story. The man who dreamed of Jerusalem most passionately… never lived to see it free.
            </p>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              Nur ad-Din Zangi spent years preparing: armies, scholars, institutions, and unity. But death came before the victory. And perhaps that itself is a lesson. Not every righteous person witnesses the result of their struggle. Some plant seeds… while others harvest them later.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '1000px'}}>
              <img className="editorial-image" src="/shirkuh_salahuddin.png" alt="Shirkuh and young Salahuddin, symbolizing the mentors and predecessors who laid the groundwork for the dream" />
            </div>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)', maxWidth: '800px', margin: '5rem auto'}}>
              Salahuddin became the completion of a dream that began long before him. Which means even greatness itself is never truly built alone.
            </div>

            <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--royal-red)', margin: '6rem 0 2rem 0' }}>
              The Warning Inside His Story
            </h3>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              But Salahuddin’s story is not only inspiration. It is also warning. Because after his death… division slowly returned. Rivalries returned. Political struggles returned. And over time, many of the same weaknesses that once shattered the Muslim world appeared again. History repeated itself. As it always does when lessons are forgotten.
            </p>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', color: 'var(--cream)' }}>
              That may be one of the most haunting parts of his story. Victory alone cannot save a civilization permanently. Not unless faith, justice, and unity survive afterward too. And perhaps this is why Muslims across centuries continue returning to Salahuddin’s memory during difficult times.
            </p>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '4rem auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)' }}>
              Because his story asks an uncomfortable question: “If a broken Ummah once rose again… why can it not rise again now?”
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE TOMB IN DAMASCUS */}
      <div className="full-width-break" style={{backgroundColor: '#ebe4db', color: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Simplicity & Silence</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)'}}>
              The Tomb in Damascus
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--coffee-dark)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto', color: 'var(--coffee-dark)' }}>
              Today, in Damascus (modern-day Syria), Salahuddin lies buried near the Umayyad Mosque. His tomb is surprisingly simple. Quiet. Almost humble. Tourists visit it. Historians study it. Travelers stand silently beside it.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--royal-red)', borderColor: 'var(--royal-red)', maxWidth: '800px', margin: '5rem auto', textAlign: 'left'}}>
              And many leave shocked by one thought: “This small grave belongs to the man who once shook the world.”
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/cairo_whispers.png" alt="The tranquil and serene atmosphere of Damascus, where the legendary Sultan lies in a humble grave" />
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--royal-red)' }}>
              No armies stand beside him now. No banners wave above him. No kingdoms remain under his command. Only deeds followed him into the grave. Exactly as Islam teaches every human being. And perhaps that is the final beauty of his story. He spent his entire life chasing something greater than dunya. So when dunya finally left him… his name still remained alive.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: WHY HIS STORY STILL LIVES & THE FINAL IMAGE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">An Idea Beyond Time</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>Jerusalem was not liberated in a single day. It was liberated through decades of preparation long before the battle began.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            Why His Story Still Lives
          </h3>

          <p className="editorial-p reveal-up">
            Centuries later… children still hear his name. Scholars still speak about him. Warriors still admire him. Writers still study him. Because Salahuddin became more than a historical figure. He became an idea.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The idea that:<br/>
            leadership can have morality,<br/>
            power can exist with humility,<br/>
            faith can shape history,<br/>
            and sincere people can change the world.
          </p>

          <p className="editorial-p reveal-up">
            Not instantly. Not magically. But slowly. Patiently. Through years of sacrifice invisible to most people. And maybe that is the greatest truth hidden inside his story: Jerusalem was not liberated in a single day. It was liberated through decades of preparation long before the battle began.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/friday_khutbah.png" alt="The adhan echoing once again across Al-Quds, filling the sacred sanctuary with prayer and devotion" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Final Image
          </h3>

          <p className="editorial-p reveal-up">
            Imagine the final scene. The night sky above Jerusalem. The adhan echoing once again through Masjid Al-Aqsa (modern-day Palestine). The same city once drowned in blood now filled with prayer again. And somewhere among the believers… stands Salahuddin Ayyubi.
          </p>

          <p className="editorial-p reveal-up">
            Not smiling proudly. Not intoxicated by victory. But humbled. Quiet. Perhaps remembering the long road from Tikrit. From exile… to liberation. From an unknown child… to a man history would never forget.
          </p>
        </div>
      </section>

      {/* SECTION 6: GRAND FINALE */}
      <section className="story-section" style={{paddingBottom: '15rem', backgroundColor: '#110e0c'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>The Eternal Message</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--cream)', margin: '2rem 0 4rem 0', fontSize: '5vw'}}>
              Empires fall.<br/>Darkness spreads.<br/>Nations break.
            </h2>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '6rem 0', fontSize: '3.5vw', color: 'var(--royal-red)', lineHeight: 1.3}}>
              But as long as faith, sincerity, and courage remain alive…<br/>history can rise again.
            </div>

            <div className="story-divider" style={{margin: '6rem auto', backgroundColor: 'rgba(255,255,255,0.1)'}}></div>

            <h2 className="reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '4rem', color: 'var(--cream)', marginTop: '8rem'}}>
              THE END
            </h2>
            
            <div className="reveal-up" style={{marginTop: '2rem', letterSpacing: '0.4em', fontSize: '1.2rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              The Story of Sultan Salahuddin Ayyubi
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={12} />
    </article>
  );
}
