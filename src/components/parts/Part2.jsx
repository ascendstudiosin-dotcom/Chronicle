import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part2() {
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

      <StoryNavbar currentPartId={2} title="THE CHILD BORN IN EXILE" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/tikrit_exile.png" 
            alt="The night destiny left Tikrit" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 2</h1>
          <h2 className="story-page-title">THE CHILD BORN IN EXILE</h2>
          <p className="story-page-subtitle">The Night Destiny Left Tikrit</p>
        </div>
      </header>

      {/* SECTION 1: THE EXILE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Future Unknown</span>
            <h2 className="sticky-title reveal-up">The night Salahuddin was born did not feel like the beginning of greatness.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            There were no celebrations. No grand palace waiting for him. No scholars predicting that he would one day unite the Muslim world. Instead… there was fear.
          </p>
          
          <div className="story-divider"></div>
          
          <div className="editorial-pull-quote reveal-up">
            Outside the walls of Tikrit, the cold winds of uncertainty moved through the darkness while his family prepared to leave the city forever.
          </div>

          <p className="editorial-p reveal-up">
            The child had barely entered the world. And already, exile awaited him. Islamic historians narrate that around the year 1137 or 1138 CE, the household of Najm ad-Din Ayyub was thrown into political turmoil after a violent dispute involving his brother, Shirkuh.
          </p>
          
          <p className="editorial-p reveal-up">
            Shirkuh — fierce by nature and feared for his temper in battle — had killed a man during a conflict. The incident enraged the local authorities of Tikrit. The result was immediate. The Ayyub family was ordered to leave. That very night.
          </p>
          
          <div className="story-divider" style={{borderColor: 'var(--royal-red)'}}></div>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            “Allah caused him to leave his first home as a stranger… so he would understand the pain of a land taken from its people.”
          </p>
        </div>
      </section>

      {/* SECTION 2: FULL WIDTH BREAK - DAMASCUS */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Cradle of Character</span>
            <h2 className="editorial-giant-text reveal-up">
              Damascus
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            <p className="editorial-p reveal-up">
              The family journeyed westward toward the lands of Sham. <br/>
              But the true turning point of young Salahuddin’s life came later… in the city of Damascus.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: SCHOLARS OVER WARRIORS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Pursuit of Knowledge</span>
            <h2 className="sticky-title reveal-up">Young Yusuf grew up surrounded more by scholars than warriors.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            Damascus was unlike any city in the Muslim world. Ancient. Beautiful. Alive with knowledge. Its streets echoed with Quran recitation, scholarly debates, merchants from distant lands, soldiers preparing for jihad, and the footsteps of seekers of knowledge.
          </p>
          
          <div className="editorial-image-wrapper">
            <img className="editorial-image" src="/damascus_scholars.png" alt="Scholars in ancient Damascus" />
          </div>

          <p className="editorial-p reveal-up">
            This is one of the greatest misconceptions many modern portrayals get wrong. Salahuddin was not born a hardened military genius. In fact… many reports suggest he was initially more interested in learning than fighting.
          </p>
          
          <p className="editorial-p reveal-up">
            He loved Quran, Arabic poetry, history, genealogy, Islamic law, and religious discussions. He spent more time with scholars and jurists than with swordsmen and soldiers. Islamic chroniclers describe him as thoughtful, calm, soft-spoken, emotionally sensitive, and deeply respectful toward scholars.
          </p>
          
          <div className="editorial-pull-quote reveal-up">
            No one looked at him and thought: “This young man will defeat the Crusaders.”
          </div>
          
          <p className="editorial-p reveal-up">
            And perhaps that is what makes his story so powerful. Allah was shaping him slowly. Quietly. Away from attention.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE SHADOW OF JERUSALEM */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Pain of Al-Aqsa</span>
            <div className="editorial-image-wrapper" style={{height: '40vh'}}>
              <img className="editorial-image" src="/nur_ad_din_praying.png" alt="Nur ad-Din Zangi praying" />
            </div>
            <h2 className="sticky-title reveal-up" style={{fontSize: '2.5rem'}}>Even in Damascus, the pain of Jerusalem never disappeared.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Travelers arriving from occupied lands told horrifying stories. Masjid Al-Aqsa remained under Crusader control. Muslim prisoners suffered humiliation. Entire generations had grown old without seeing Jerusalem free again.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Young Salahuddin grew up hearing these stories repeatedly. And above all others stood one man shaping the atmosphere around him: <strong>Nur ad-Din Zangi</strong>.
          </p>
          
          <p className="editorial-p reveal-up">
            Nur ad-Din was transforming Syria spiritually and militarily. Unlike rulers obsessed with luxury, he lived simply. He prayed at night. Fasted often. Listened to scholars. Built institutions of Islamic learning. And prepared tirelessly for jihad against the Crusaders.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--royal-red)', textAlign: 'center'}}>
            The seeds were already being planted inside him. Not merely the dream of power. But the dream of restoring dignity to the Ummah.
          </p>
        </div>
      </section>

      {/* SECTION 5: THE FIRST CALL */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '4rem 0'}}>
              The First Call to Destiny
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Years passed. The young scholar from Damascus slowly entered military service under Nur ad-Din’s command. Not because he desperately sought glory… but because history was moving around him.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem 0'}}>
              <img className="editorial-image" src="/shirkuh_salahuddin.png" alt="Shirkuh and Salahuddin riding to Egypt" />
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Then came the moment that changed everything. News arrived from Egypt. The Fatimid Caliphate was collapsing. Crusader forces wanted control of the region. If Egypt fell completely… the Muslim world could be surrounded.
            </p>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto'}}>
              Nur ad-Din understood the danger immediately. And so he turned to the one man he trusted most for difficult campaigns: <strong>Shirkuh</strong>. The fierce lion of battle.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '4vw'}}>
              And beside Shirkuh… traveling into the unknown… was the quiet young man few truly noticed yet.
            </div>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', marginTop: '4rem', color: 'var(--royal-red)'}}>
              Yusuf ibn Ayyub. Salahuddin.<br/>
              The journey toward Jerusalem had finally begun.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 2
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={2} />
    </article>
  );
}
