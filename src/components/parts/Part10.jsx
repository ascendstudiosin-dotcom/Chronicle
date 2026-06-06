import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part10() {
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

      <StoryNavbar currentPartId={10} title="THE FINAL DAYS OF SALAHUDDIN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/part10_final_days_hero.png" 
            alt="The Final Days of Salahuddin" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 10</h1>
          <h2 className="story-page-title">THE FINAL DAYS OF SALAHUDDIN</h2>
          <p className="story-page-subtitle">The Man Who Conquered a Kingdom but Owned Almost Nothing</p>
        </div>
      </header>

      {/* SECTION 1: THE WARS WERE FINALLY QUIETING */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Fading Thunder</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>The smiling youth who once rode beside Shirkuh through the deserts of Egypt had become an aging Sultan whose body carried scars invisible to the eye.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            The wars were finally quieting. For the first time in decades, the endless thunder of armies began fading from the lands of Sham (Greater Syria / modern-day Syria, Palestine, Jordan, and Lebanon regions).
          </p>
          
          <p className="editorial-p reveal-up">
            But peace did not bring rest to Salahuddin. It brought exhaustion. The kind that settles deep inside a man after carrying an entire Ummah upon his shoulders for years.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            By now, the young scholar from Damascus (modern-day Syria) was gone forever. The smiling youth who once rode beside Shirkuh through the deserts of Egypt (modern-day Egypt) had become an aging Sultan whose body carried scars invisible to the eye.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            He had fought:<br/>
            Crusaders,<br/>
            rebellions,<br/>
            political betrayals,<br/>
            collapsing kingdoms,<br/>
            endless campaigns,<br/>
            and the crushing burden of leadership.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            And slowly… his strength began leaving him.
          </p>
        </div>
      </section>

      {/* SECTION 2: RETURN TO DAMASCUS */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Circle of Life</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>While other rulers built extravagant palaces… Salahuddin prepared for the akhirah.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            Return to Damascus
          </h3>

          <p className="editorial-p reveal-up">
            After years of warfare, Salahuddin returned to Damascus. The city of his childhood. The city where he first studied Quran. The city where his story truly began.
          </p>

          <p className="editorial-p reveal-up">
            There is something almost poetic about this. History carried him across battlefields and kingdoms… only to bring him back to the same streets where he once walked as an unknown young man.
          </p>

          <p className="editorial-p reveal-up">
            But now the people looked at him differently. To them, he was no longer Yusuf ibn Ayyub. He was: the liberator of Jerusalem, the defender of Islam, the Sultan who stood against Europe’s greatest kings.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/part10_damascus_humble_reflection.png" alt="Salahuddin reflecting quietly in Damascus, far removed from the extravagance of kings" />
          </div>

          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Yet despite all this… those close to him noticed something unusual. He remained humble. Very humble. Islamic chroniclers repeatedly mention that Salahuddin feared arrogance deeply. He understood how power destroys men.
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            So instead of drowning in luxury, he spent much of his wealth:<br/>
            supporting scholars,<br/>
            helping the poor,<br/>
            funding jihad,<br/>
            maintaining public welfare,<br/>
            and caring for his armies.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            While other rulers built extravagant palaces… Salahuddin prepared for the akhirah.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE ILLNESS & THE FINAL MOMENTS */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Final Trial</span>
            <h2 className="editorial-giant-text reveal-up">
              The Illness
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--royal-red)', margin: '4rem 0' }}>
              Then, in early 1193 CE… the illness began. At first, it seemed small. A fever. Weakness. Exhaustion. But day after day, his condition worsened.
            </p>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              The physicians tried treating him. Scholars gathered around him. Recitation of Quran filled the room. And slowly… everyone began realizing the terrifying truth. The Sultan was dying.
            </p>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.6rem', maxWidth: '800px', margin: '0 auto 4rem auto', color: 'var(--cream)' }}>
              The man who liberated Jerusalem… the man who united the Muslim world… the man whose name shook kings… was now lying helpless upon a bed in Damascus (modern-day Syria). And perhaps that is one of the greatest lessons of his story. No matter how powerful a person becomes… death eventually silences every sword.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '1000px'}}>
              <img className="editorial-image" src="/nur_ad_din_deathbed.png" alt="Scholars and loved ones gathered in quiet prayer and Quran recitation around the dying Sultan" />
            </div>

            <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--royal-red)', margin: '6rem 0 2rem 0' }}>
              The Final Moments
            </h3>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              Islamic narrations surrounding his final days are deeply emotional. As his illness worsened, Quran was recited beside him constantly. Those around him read verses of mercy and hope. And Salahuddin listened quietly.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)', maxWidth: '800px', margin: '5rem auto'}}>
              The conqueror who spent decades commanding armies now focused only on Allah. Not kingdoms. Not victory. Not fame. Only Allah.
            </div>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              One narration mentions that when Surah Yasin was recited near him, he listened attentively until his soul departed. And on March 4, 1193 CE… Salahuddin Ayyubi died in Damascus. He was around fifty-five years old.
            </p>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--royal-red)', fontSize: '1.8rem', fontStyle: 'italic' }}>
              The Muslim world fell into grief. People cried openly in the streets. Because this was not merely the death of a ruler. It felt like the end of an era.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE SHOCKING TRUTH */}
      <div className="full-width-break" style={{backgroundColor: '#ebe4db', color: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Worldly Expectations Shattered</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)'}}>
              The Shocking Truth
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--coffee-dark)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto', color: 'var(--coffee-dark)' }}>
              Then came the discovery that stunned even those closest to him. After decades of ruling enormous territories… Salahuddin left behind almost no personal wealth. Very little. Some reports mention: only a few silver coins, and a single piece of gold remained. That was all.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--royal-red)', borderColor: 'var(--royal-red)', maxWidth: '800px', margin: '5rem auto', textAlign: 'left'}}>
              The man who ruled: Egypt, Syria, Yemen, parts of Iraq, and the Holy Land… died with almost nothing to his name. Why? Because he had spent his wealth constantly: on charity, soldiers, scholars, hospitals, public welfare, and the struggle to defend Muslim lands.
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/nur_ad_din_praying.png" alt="A symbol of open-handed generosity, prayer, and public welfare left behind for the people" />
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--royal-red)' }}>
              Islamic historians mention this repeatedly because it shattered worldly expectations. Kings usually die surrounded by treasure. But Salahuddin died almost empty-handed before Allah. And somehow… that made him even greater.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: THE FUNERAL & THE EMPTY HORSE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Final Procession</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>“This is all that Salahuddin, conqueror of so many lands, leaves behind from the dunya.”</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            The Funeral
          </h3>

          <p className="editorial-p reveal-up">
            His funeral in Damascus became a scene of overwhelming grief. Scholars. Soldiers. Ordinary people. Many wept openly. Men who fought beside him could barely speak. Because they knew they were burying more than a Sultan. They were burying the man who restored dignity to the Ummah after generations of humiliation.
          </p>

          <p className="editorial-p reveal-up">
            Eventually, he was buried near the Umayyad Mosque in Damascus (modern-day Syria). And there his tomb remains until today. Quiet. Simple. Far less grand than people might expect for someone whose name entered history forever. Perhaps fittingly so. Because simplicity was always closer to Salahuddin’s heart than luxury.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/nur_ad_din_tears.png" alt="Overwhelming grief among soldiers and scholars during the funeral procession in Damascus" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Empty Horse
          </h3>

          <p className="editorial-p reveal-up">
            One famous narration associated with his death became legendary across the Muslim world. During his funeral procession, a rider reportedly carried Salahuddin’s belongings upon a horse while calling out to the people:
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '3rem 0'}}>
            “This is all that Salahuddin, conqueror of so many lands, leaves behind from the dunya.”
          </p>

          <p className="editorial-p reveal-up">
            The message struck hearts deeply. Because it reminded everyone of a truth Islam constantly teaches: Power fades. Kingdoms disappear. Wealth vanishes. But deeds remain. And perhaps this is why Salahuddin survived history while so many kings were forgotten. Not because he conquered cities. But because he conquered his own ego.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE DREAM THAT OUTLIVED HIM */}
      <section className="story-section" style={{paddingBottom: '15rem', backgroundColor: '#110e0c'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Eternal Legacy</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--cream)', margin: '2rem 0 4rem 0'}}>
              The Dream That Outlived Him
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              After his death, the empire eventually weakened through division among successors. As often happens in history, unity proved difficult to preserve. Yet despite political decline… Salahuddin’s legacy never died.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '6rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              Across centuries, Muslims remembered him not merely as a warrior… but as: a servant of Islam, a man of sincerity, a symbol of revival, and the liberator of Al-Quds. Even many European writers respected him. Because enemies could defeat armies… but they could not deny character.
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/salahuddin_unites_empire.png" alt="A towering symbol of revival, dignity, and unity inspiring generations across centuries" />
            </div>

            <div className="story-divider" style={{margin: '6rem auto', backgroundColor: 'rgba(255,255,255,0.1)'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              And long after his death… his story continued inspiring generations who dreamed of dignity, justice, and faith. But to truly understand Salahuddin… one final truth remains.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '4rem auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)'}}>
              The greatest thing he liberated… may not have been Jerusalem. It may have been the spirit of the Ummah itself.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 10
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={10} />
    </article>
  );
}
