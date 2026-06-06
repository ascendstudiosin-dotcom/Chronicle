import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part8() {
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

      <StoryNavbar currentPartId={8} title="THE RETURN TO JERUSALEM" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/part8_jerusalem_return_hero.png" 
            alt="The Day Al-Quds Returned" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 8</h1>
          <h2 className="story-page-title">THE RETURN TO JERUSALEM</h2>
          <p className="story-page-subtitle">The Day Al-Quds Returned</p>
        </div>
      </header>

      {/* SECTION 1: AFTER HATTIN */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Collapse</span>
            <h2 className="sticky-title reveal-up">One fortress after another collapsed like pieces of a dying empire.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            After Hattin (near modern-day Tiberias, Palestine/Israel region)… the world changed. The Crusader army that once terrified the Muslim world had been broken.
          </p>
          
          <p className="editorial-p reveal-up">
            And now, city after city began falling before Salahuddin’s forces.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            Acre (modern-day Akko, Israel/Palestine region) surrendered.<br/>
            Nablus (modern-day Palestine) surrendered.<br/>
            Jaffa (modern-day Jaffa / Tel Aviv region) surrendered.<br/>
            Beirut (modern-day Lebanon) surrendered.
          </p>

          <p className="editorial-p reveal-up">
            Panic spread across Crusader lands. Because everyone understood the truth now.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            Salahuddin was coming for Jerusalem. Al-Quds.
          </p>

          <p className="editorial-p reveal-up">
            The city that had lived in the hearts of Muslims through nearly a century of pain. And as his armies advanced southward… the memories returned.
          </p>

          <p className="editorial-p reveal-up" style={{ color: 'var(--royal-red)' }}>
            The massacre of 1099.<br/>
            The blood in the streets.<br/>
            The cries inside Masjid Al-Aqsa.<br/>
            The humiliation carried for generations.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', marginTop: '4rem'}}>
            Now history stood at the edge of reversal.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE CITY OF PROPHETS */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>Sacred Ground</span>
            <h2 className="editorial-giant-text reveal-up">
              The City of Prophets
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up">
              Jerusalem (modern-day Palestine) was not an ordinary city. Not to Muslims. Not to Christians. Not to Jews. It was the city of prophets.
            </p>

            <p className="editorial-p reveal-up" style={{ fontSize: '1.5rem', lineHeight: 1.8, color: 'var(--royal-red)', textAlign: 'center', margin: '4rem 0' }}>
              The land of:<br/>
              Ibrahim عليه السلام,<br/>
              Dawud عليه السلام,<br/>
              Sulayman عليه السلام,<br/>
              Isa عليه السلام,<br/>
              and the blessed Night Journey of Prophet Muhammad ﷺ.
            </p>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center' }}>
              Every stone carried memory. Every street carried history.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)'}}>
              And for Muslims especially… Masjid Al-Aqsa was sacred beyond words.
            </div>

            <p className="editorial-p reveal-up">
              For nearly ninety years, the adhan had not risen freely over the city under Muslim rule. Generations had died dreaming of hearing it again.
            </p>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', textAlign: 'center', marginTop: '4rem'}}>
              Now Salahuddin stood outside its walls.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE SIEGE BEGINS & THE MEMORY OF 1099 */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Sacred Trust</span>
            <h2 className="sticky-title reveal-up">The battle for Jerusalem had become more than war. It had become destiny.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Inside Jerusalem, fear spread rapidly. The Crusaders knew Hattin had destroyed their strongest armies. There would be no massive rescue force coming. Still, the city prepared for siege.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            Defenses strengthened.<br/>
            Weapons gathered.<br/>
            Church bells rang through the streets.
          </p>

          <p className="editorial-p reveal-up">
            And outside the walls… Muslim camps stretched across the horizon. But Salahuddin did not rush blindly. This mattered too much.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/part8_jerusalem_siege_camp.png" alt="Muslim forces encamped outside the fortified walls" />
          </div>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Jerusalem was not merely territory to him. It was a sacred trust. Islamic historians describe him handling the siege with seriousness and restraint. Because he knew the entire Muslim world was watching.
          </p>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Memory of 1099
          </h3>

          <p className="editorial-p reveal-up">
            As negotiations began, the defenders of Jerusalem threatened something horrifying. If the Muslims stormed the city violently, they warned: Muslim prisoners would be killed, holy sites destroyed, and chaos unleashed.
          </p>

          <p className="editorial-p reveal-up">
            The threat carried terrifying weight. Because everyone remembered what happened in 1099 when the Crusaders captured the city. At that time: Muslims were massacred, civilians slaughtered, blood reportedly flowed through the streets, and Masjid Al-Aqsa itself witnessed unimaginable horror.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', marginTop: '4rem'}}>
            Now the roles were reversed. And the world waited to see: Would Salahuddin seek revenge? Would Jerusalem drown in blood again?
          </p>
        </div>
      </section>

      {/* SECTION 4: THE MAN WHO CHOSE MERCY */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Reversal</span>
            <h2 className="editorial-giant-text reveal-up">
              The Man Who Chose Mercy
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontSize: '2rem', color: 'var(--royal-red)', margin: '4rem 0' }}>
              On October 2, 1187 CE… Jerusalem surrendered.
            </p>

            <p className="editorial-p reveal-up">
              After eighty-eight years of Crusader occupation… Al-Quds returned to Muslim rule. And then came the moment that immortalized Salahuddin forever.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)'}}>
              He did not massacre the city. He did not unleash revenge. He did not repeat the horrors of 1099. Instead… he granted mercy.
            </div>

            <p className="editorial-p reveal-up">
              Ransoms were arranged for civilians. Many Christians were allowed to leave safely. Churches remained standing. Order replaced chaos. Even many Western historians later admitted that Salahuddin’s conduct shocked Europe because it contrasted so sharply with the brutality of the earlier Crusader conquest.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/part8_jerusalem_gates_mercy.png" alt="The gates of Jerusalem opening to peace and mercy" />
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.8rem' }}>
              Islamic chroniclers describe people weeping openly upon entering the city. Not from fear. But from overwhelming emotion. Because after nearly ninety years… Jerusalem was free again.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: THE RETURN OF THE ADHAN & THE MINBAR */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Echo of Faith</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>“Allahu Akbar… Allahu Akbar…”</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            And then… came the moment generations had waited for. The adhan rose over Jerusalem once more. Imagine it. The sound echoing through the sacred city after decades of silence.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', textAlign: 'center', margin: '4rem 0'}}>
            “Allahu Akbar… Allahu Akbar…”
          </p>
          
          <p className="editorial-p reveal-up">
            Men cried openly. Scholars fell into sajdah. Soldiers who survived years of war wept like children. Masjid Al-Aqsa (modern-day Jerusalem, Palestine) was purified and reopened for Muslim worship. The crosses placed upon Islamic holy sites were removed. Quran recitation filled the masjid once more.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/part8_al_aqsa_prayers.png" alt="The blessed gathering and prayers inside Masjid Al-Aqsa" />
          </div>

          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            And somewhere within that emotional storm stood Salahuddin. Quiet. Humbled. Overwhelmed. Because this victory did not belong to him alone.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            It belonged to:<br/>
            the scholars who preserved faith,<br/>
            the martyrs who died before seeing this day,<br/>
            Nur ad-Din who dreamed of it,<br/>
            and generations of believers who never stopped praying for Jerusalem.
          </p>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Minbar of Nur ad-Din
          </h3>

          <p className="editorial-p reveal-up">
            One famous detail from Islamic history carries enormous emotional weight: The beautiful minbar commissioned years earlier by Nur ad-Din Zangi… the one built long before Jerusalem was liberated… was finally brought into Masjid Al-Aqsa.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/nur_ad_din_minbar.png" alt="The exquisite wooden minbar commissioned by Nur ad-Din brought into Al-Aqsa" />
          </div>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            The dream had been completed. Though Nur ad-Din himself never lived to see it.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE NAME THAT ECHOED & THE THIRD CRUSADE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Gathering Storm</span>
            <h2 className="sticky-title reveal-up">War was not over. In many ways… it was only becoming larger.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            News of Jerusalem’s liberation exploded across continents. In the Muslim world: celebrations erupted, masjids overflowed, and Salahuddin became a symbol of revival.
          </p>
          
          <p className="editorial-p reveal-up">
            But in Europe… shock turned into fury. Jerusalem had fallen. The Crusader dream was collapsing. And soon, kings from across Europe began preparing for a massive response.
          </p>
          
          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Third Crusade
          </h3>

          <p className="editorial-p reveal-up">
            Led by some of the most powerful rulers in Christendom. Among them stood one man whose name would become forever linked with Salahuddin’s:
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            Richard I of England.<br/>Richard the Lionheart.
          </p>

          <p className="editorial-p reveal-up">
            War was not over. In many ways… it was only becoming larger.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE LONELY MOMENT AFTER VICTORY */}
      <section className="story-section" style={{paddingBottom: '15rem', backgroundColor: '#110e0c'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              The Lonely Moment After Victory
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              But before the next storm arrived… there was one quiet moment. One human moment often forgotten beneath the greatness of history. After liberating Jerusalem, Salahuddin reportedly walked through the city reflecting silently.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/part8_salahuddin_silent_walk.png" alt="Salahuddin walking silently through Al-Quds in quiet reflection" />
            </div>

            <div className="story-divider" style={{margin: '4rem auto', backgroundColor: 'rgba(255,255,255,0.1)'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              No celebration could erase the years of bloodshed. No victory could return the dead. And perhaps deep inside him… he understood something dangerous:
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              Victory itself can become a test. Because many men remain humble while chasing power… but lose themselves after achieving it.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              Salahuddin feared this deeply. So while the world praised him… he turned more toward prayer. More toward Quran. More toward humility.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', marginTop: '4rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
              As if he understood: Jerusalem was not the end of his mission. It was the beginning of a greater trial. Because from across the sea… Europe was already preparing to strike back.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 8
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={8} />
    </article>
  );
}
