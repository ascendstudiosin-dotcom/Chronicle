import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function StoryPage() {
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

      <StoryNavbar currentPartId={1} title={id === 'salahuddin-ayyubi' ? 'SALAHUDDIN AYYUBI' : id.replace('-', ' ').toUpperCase()} />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/salahuddin_ayyubi.png" 
            alt="Hero" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 1</h1>
          <h2 className="story-page-title">THE WORLD BEFORE SALAHUDDIN</h2>
          <p className="story-page-subtitle">The Fall Before the Rise</p>
        </div>
      </header>

      {/* SECTION 1: THE BROKEN UMMAH */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The State of the World</span>
            <h2 className="sticky-title reveal-up">A World Drowning from Within</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            Before the world knew the name Salahuddin Ayyubi… before Jerusalem trembled at his arrival… before kings feared him and the oppressed prayed for him… the Muslim world was drowning.
          </p>
          
          <div className="story-divider"></div>
          
          <div className="editorial-pull-quote reveal-up">
            The Ummah was broken.
          </div>

          <p className="editorial-p reveal-up">
            Not broken by lack of numbers.<br/>
            Not broken by lack of wealth.<br/>
            But broken from within.
          </p>
          
          <p className="editorial-p reveal-up">
            Kingdoms fought one another while the Crusaders marched deeper into Muslim lands. Muslim rulers argued over power while Jerusalem cried beneath occupation. Cities that once echoed with Quran and knowledge had become poisoned by politics, greed, jealousy, and fear.
          </p>
        </div>
      </section>

      {/* SECTION 2: AL-QUDS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Blessed City</span>
            <div className="editorial-image-wrapper">
              <img className="editorial-image" src="/jerusalem_fall.png" alt="Jerusalem in flames during the Crusades" />
            </div>
            <h2 className="sticky-title reveal-up" style={{fontSize: '2.5rem'}}>Now it was covered in blood.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            And in the middle of this darkness stood Jerusalem — Al-Quds.
          </p>
          <p className="editorial-p reveal-up">
            The blessed city. The city of prophets. The city where Umar ibn al-Khattab once entered with humility and justice.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            When the Crusaders captured Jerusalem in 1099, the streets became rivers of death. Muslim historians wrote that men, women, and children were slaughtered without mercy. Mosques were desecrated. Homes were burned. The cries of the believers echoed through the alleys of Al-Quds while the Muslim world watched helplessly.
          </p>
          <p className="editorial-p reveal-up">
            For decades afterward, mothers whispered stories of Jerusalem with tears in their eyes. Children grew up hearing about a city they had never seen.
          </p>
          <div className="editorial-pull-quote reveal-up" style={{fontSize: '2.5rem', color: 'var(--coffee-dark)', borderColor: 'var(--coffee-dark)'}}>
            “Jerusalem is not lost because the enemy is strong.<br/>
            It is lost because the Ummah has become weak.”
          </div>
        </div>
      </section>

      {/* SECTION 3: FULL WIDTH BREAK - NUR AD-DIN */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Obsession with Revival</span>
            <h2 className="editorial-giant-text reveal-up">
              Nur ad-Din Zangi
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            <p className="editorial-p reveal-up">
              Among the believers, one ruler carried this pain more deeply than most.<br/>
              He was not merely a king. He was a man obsessed with revival.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE MINBAR */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Vision of Return</span>
            <h2 className="sticky-title reveal-up">While others chased luxury, he prepared armies.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            While others built palaces, he built madrasas. While rulers competed for kingdoms, Nur ad-Din dreamed only of Jerusalem. At night, he would sit listening to scholars speak about the suffering of Al-Aqsa, and tears would fall from his eyes.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            It is said that he once commissioned a magnificent wooden minbar — a pulpit — not for a mosque in Syria… but for Masjid Al-Aqsa in Jerusalem. Even though the city was still under Crusader rule.
          </p>
          
          <div className="editorial-image-wrapper">
            <img className="editorial-image" src="/nur_ad_din_minbar.png" alt="The Minbar of Nur ad-Din" />
          </div>

          <p className="editorial-p reveal-up">
            People were confused. “How can you build a minbar for a masjid you do not even control?”
          </p>
          <p className="editorial-p reveal-up">
            But Nur ad-Din believed something others could not yet see. He believed Allah would one day return Jerusalem to the Muslims. He simply did not know through whom.
          </p>
        </div>
      </section>

      {/* SECTION 5: TIKRIT */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Banks of Tikrit</span>
            <h2 className="sticky-title reveal-up">The night that changed everything.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            Far away from the courts of kings… beyond the politics of Syria… near the lands of Iraq… destiny was already moving. In the city of Tikrit lived a Kurdish family known for honor, discipline, and quiet strength.
          </p>
          <p className="editorial-p reveal-up">
            They were not kings. They did not possess empires. No one looked at them and imagined history would remember their name. The father was <strong>Najm ad-Din Ayyub</strong>. Wise. Calm. Intelligent. Beside him stood his younger brother, <strong>Asad ad-Din Shirkuh</strong>, a fierce warrior whose presence frightened enemies.
          </p>
          
          <div className="editorial-image-wrapper">
            <img className="editorial-image" src="/tikrit_river_escape.png" alt="The Riverbanks of Tikrit Escape" />
          </div>
          
          <div className="editorial-pull-quote reveal-up">
            A hunted commander arrived near Tikrit under the cover of darkness.
          </div>

          <div className="story-divider" style={{borderColor: 'var(--royal-red)'}}></div>

          <p className="editorial-p reveal-up">
            Exhausted. Pursued. Desperate. That commander was none other than Zangi himself — the father of Nur ad-Din. Many feared helping him. Helping a fugitive could mean death.
          </p>
          <p className="editorial-p reveal-up">
            But Ayyub and Shirkuh chose loyalty over fear. Under the darkness of night, they secretly helped Zangi escape across the river.
          </p>
          
          <h2 className="editorial-giant-text reveal-up" style={{fontSize: '4vw', margin: '6rem 0'}}>
            One act. One decision. One moment of courage.
          </h2>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2rem', color: 'var(--royal-red)', textAlign: 'center'}}>
            “The road to Jerusalem began at the riverbanks of Tikrit.”
          </p>
        </div>
      </section>

      {/* SECTION 6: THE BIRTH */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto 4rem'}}>
              Years passed. Zangi never forgot the men who had helped him. He rewarded the family and brought them into his service. Slowly, the Ayyub family rose through the ranks of Syria and Iraq.
            </p>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              But Allah was preparing something far greater than politics.
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Far greater than kingship. Far greater than war.<br/><br/>
              Soon, in the same city of Tikrit… a child would be born into exile.
            </p>

            <div className="story-divider" style={{margin: '8rem auto', maxWidth: '400px'}}></div>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '5vw'}}>
              A child whose name would one day shake the world.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Yet on the night he entered this dunya, no one saw greatness. No one saw a liberator. No one saw the future conqueror of Jerusalem.
            </p>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', marginTop: '4rem'}}>
              They only saw a newborn wrapped in cloth…<br/>
              while his family fled into the darkness.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 1
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={1} />
    </article>
  );
}
