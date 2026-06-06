import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part11() {
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

      <StoryNavbar currentPartId={11} title="THE LEGACY OF SALAHUDDIN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/salahuddin_ayyubi.png" 
            alt="The Legacy of Salahuddin" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 11</h1>
          <h2 className="story-page-title">THE LEGACY OF SALAHUDDIN</h2>
          <p className="story-page-subtitle">The Man Who Became Larger Than History</p>
        </div>
      </header>

      {/* SECTION 1: WHEN SALAHUDDIN DIED */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Immortal Memory</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>Many conquerors are feared during their lives… then forgotten after death. But Salahuddin became something else. A symbol.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            When Salahuddin Ayyubi died in Damascus (modern-day Syria) in 1193 CE… something strange happened.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The war ended.<br/>
            The armies moved on.<br/>
            Kings rose and fell.<br/>
            Empires changed.
          </p>
          
          <p className="editorial-p reveal-up">
            And yet… his name refused to disappear. Centuries passed. Still, people spoke of him. Not only Muslims. Even his enemies remembered him.
          </p>

          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            That is rare in history. Very rare. Because many conquerors are feared during their lives… then forgotten after death. But Salahuddin became something else.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            A symbol. A memory larger than kingdoms. A man whose story escaped time itself.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE MAN EUROPE COULD NOT HATE */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Ideal Knight</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>They expected brutality. Instead, they saw discipline. They expected revenge. Instead, they saw mercy.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            The Man Europe Could Not Hate
          </h3>

          <p className="editorial-p reveal-up">
            The Crusaders fought Salahuddin for years. He destroyed their armies. Took Jerusalem (modern-day Palestine) from them. Shattered their dominance in the Holy Land. And yet… many European chroniclers still respected him deeply.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            Why?<br/>
            Because they expected brutality. Instead, they saw discipline.<br/>
            They expected revenge. Instead, they saw mercy.<br/>
            They expected arrogance. Instead, they saw dignity.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/salahuddin_chess.png" alt="A depiction of the legendary chivalry, honor, and mutual respect recognized even by his enemies" />
          </div>

          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Stories about Salahuddin spread across Europe almost like legends. The Muslim Sultan who: spared civilians, honored agreements, treated enemies with respect, and remained humble despite enormous power.
          </p>

          <p className="editorial-p reveal-up">
            To the European imagination, he slowly became the image of the “ideal knight.” Ironically… the Muslim ruler fighting Crusaders became admired inside Crusader lands themselves.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--royal-red)', marginTop: '4rem'}}>
            That tells you how powerful character can become. Even enemies struggle to erase sincerity.
          </p>
        </div>
      </section>

      {/* SECTION 3: WHAT PEOPLE GET WRONG ABOUT HIM */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Inner World</span>
            <h2 className="editorial-giant-text reveal-up">
              What People Get Wrong About Him
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--royal-red)', margin: '4rem 0' }}>
              But over time… many people began misunderstanding Salahuddin completely. Some reduced him to nothing more than: a warrior, a conqueror, or a political genius.
            </p>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              But Islamic history paints a deeper picture. Because Salahuddin was not simply created by battle. He was created by: Quran, scholars, discipline, revival, hardship, and years of spiritual development. Without Islam… there is no Salahuddin. This is one of the greatest truths many modern retellings miss.
            </p>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.6rem', maxWidth: '800px', margin: '0 auto 4rem auto', color: 'var(--cream)' }}>
              His connection to jihad was never just nationalism or politics. For him, it was worship. Responsibility before Allah. Defense of the Ummah. Protection of sacred lands.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '1000px'}}>
              <img className="editorial-image" src="/salahuddin_praying_war.png" alt="Salahuddin in profound prayer and devotion, illustrating that his inner world mattered more than his sword" />
            </div>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)', maxWidth: '800px', margin: '5rem auto'}}>
              That is why Islamic chroniclers constantly emphasize: his prayers, his tears during Quran recitation, his generosity, his fear of arrogance, and his closeness to scholars. Because they understood: His inner world mattered more than his sword.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE REVIVAL BEFORE THE VICTORY */}
      <div className="full-width-break" style={{backgroundColor: '#ebe4db', color: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Seeds of Revival</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)'}}>
              The Revival Before the Victory
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--coffee-dark)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto', color: 'var(--coffee-dark)' }}>
              One of the greatest lessons from Salahuddin’s story is often ignored. Jerusalem was not liberated in one battle. It was liberated through decades of revival before the battle even happened. Long before Hattin… there were scholars reviving faith. Long before Jerusalem returned… there were rulers like Nur ad-Din Zangi building unity slowly.
            </p>

            <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', maxWidth: '600px', margin: '3rem auto', textAlign: 'left', color: 'var(--coffee-dark)' }}>
              Madrasas were built.<br/>
              Knowledge spread.<br/>
              Discipline returned.<br/>
              Corruption was challenged.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--royal-red)', borderColor: 'var(--royal-red)', maxWidth: '800px', margin: '5rem auto', textAlign: 'left'}}>
              The Ummah spiritually rose before it militarily rose. And only then did Allah open the doors of victory.
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/damascus_scholars.png" alt="Scholars gathering in madrasas, spreading knowledge and reviving faith across the Ummah" />
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--royal-red)' }}>
              This is why many Islamic historians see Salahuddin not as an isolated hero… but as the final result of an entire revival movement. A fruit growing from seeds planted by many righteous people before him.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: HIS GREATEST WEAPON & THE LONELINESS OF LEADERSHIP */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Sincerity & Solitude</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>People assume Salahuddin’s greatest strength was military genius. It was not. His greatest weapon was trust.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            His Greatest Weapon
          </h3>

          <p className="editorial-p reveal-up">
            People assume Salahuddin’s greatest strength was military genius. It was not. Others believe it was courage. Not even that. His greatest weapon was trust.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            People trusted him.<br/>
            Soldiers trusted him.<br/>
            Scholars trusted him.<br/>
            Ordinary people trusted him.<br/>
            Even some enemies respected him.
          </p>

          <p className="editorial-p reveal-up">
            Why? Because they believed he genuinely cared about something larger than himself. He did not live only for luxury or personal glory. And humans naturally follow leaders who sacrifice for a higher cause. This is why his armies stayed loyal even during terrible hardship. Because sincerity inspires deeper loyalty than fear ever can.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/salahuddin_lonely_decision.png" alt="The intense solitude and heavy burden of expectations upon the legendary Sultan" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Loneliness of Leadership
          </h3>

          <p className="editorial-p reveal-up">
            Still… Salahuddin’s life was not romantic perfection. It carried immense loneliness. Think about it: he fought Muslims and Crusaders, lost friends and family, carried endless political pressure, spent years in war, and constantly feared failure. One wrong decision could have destroyed everything.
          </p>

          <p className="editorial-p reveal-up">
            And perhaps the heaviest burden of all… was expectation. Once people began viewing him as the hope of the Ummah… he could no longer live like an ordinary man. Every action mattered. Every mistake mattered. Every victory mattered. The weight must have been crushing at times. Yet somehow… he continued forward.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE TRUTH ABOUT GREATNESS & THE LESSON FOR EVERY GENERATION */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Conquering the Ego</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>Many men conquer cities. Very few conquer their own ego.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            The Truth About Greatness
          </h3>

          <p className="editorial-p reveal-up">
            History usually teaches greatness through conquest. Islamic history teaches it differently. The greatness of Salahuddin was not simply that he liberated Jerusalem.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            It was:<br/>
            how he behaved after victory,<br/>
            how he remained humble during power,<br/>
            how he restrained revenge,<br/>
            and how he stayed attached to Allah while ruling an empire.
          </p>

          <p className="editorial-p reveal-up">
            That is much harder than winning battles. Many men conquer cities. Very few conquer their own ego. And perhaps that is why Allah raised his name across centuries.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/salahuddin_promise.png" alt="A symbol of the unshakeable promise, humility, and restraint demonstrated after victory" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Lesson for Every Generation
          </h3>

          <p className="editorial-p reveal-up">
            Every generation of Muslims eventually rediscovers Salahuddin. Especially during times of weakness. Because his story carries hope. It reminds people that: broken Ummahs can rise again, unity is possible, faith still matters, and history can change through sincerity and patience.
          </p>

          <p className="editorial-p reveal-up">
            But his story also carries warning. Because the same divisions that weakened Muslims before Jerusalem’s fall… eventually returned after his death too. History repeated itself. As it often does. And maybe that is why his story continues feeling painfully relevant even today. Not because he was perfect. But because the struggles of his era still exist in different forms. Division. Power. Corruption. Occupation. Loss of purpose. The human condition does not change much.
          </p>
        </div>
      </section>

      {/* SECTION 7: THE MAN AND THE MYTH */}
      <section className="story-section" style={{paddingBottom: '15rem', backgroundColor: '#110e0c'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Beyond Time</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--cream)', margin: '2rem 0 4rem 0'}}>
              The Man and the Myth
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              Over centuries, stories about Salahuddin grew larger and larger. Poets praised him. Historians glorified him. Films dramatized him. Legends surrounded him. But behind all the myth… there remained a real human being.
            </p>

            <div className="reveal-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '6rem auto', maxWidth: '700px', textAlign: 'left', borderLeft: '2px solid var(--royal-red)', paddingLeft: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A child born in exile in Tikrit (modern-day Iraq).</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A quiet student in Damascus (modern-day Syria).</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A reluctant politician in Egypt (modern-day Egypt).</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A warrior carrying impossible burdens.</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A believer crying during Quran recitation.</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A ruler terrified of arrogance.</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', color: 'var(--cream)' }}>✦ A man who died owning almost nothing.</p>
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/salahuddin_cairo.png" alt="A towering symbol of revival, dignity, and unity inspiring generations across centuries" />
            </div>

            <div className="story-divider" style={{margin: '6rem auto', backgroundColor: 'rgba(255,255,255,0.1)'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '4rem auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)'}}>
              And perhaps that reality is more powerful than any legend. Because it proves greatness is not born from perfection. It is born from sincerity, sacrifice, patience, and faith.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 11
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={11} />
    </article>
  );
}
