import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part6() {
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

      <StoryNavbar currentPartId={6} title="THE SWORD TURNS TOWARD JERUSALEM" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/salahuddin_unites_empire.png" 
            alt="The Sword Turns Toward Jerusalem" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 6</h1>
          <h2 className="story-page-title">THE SWORD TURNS TOWARD JERUSALEM</h2>
          <p className="story-page-subtitle">The Promise of Revenge</p>
        </div>
      </header>

      {/* SECTION 1: THE MISSION */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Unified Force</span>
            <h2 className="sticky-title reveal-up">For the first time since the First Crusade… a single powerful Muslim leader stood against them.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            For years, Salahuddin had been fighting Muslims more than Crusaders. Not because he wanted to. But because the Ummah had already been shattered into pieces long before he rose to power.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up">
            Every city he united… every rebellion he ended… every alliance he negotiated… was part of a larger mission. A mission people were finally beginning to understand: Jerusalem. Al-Quds. The dream that had haunted the Muslim world for nearly a century.
          </p>

          <p className="editorial-p reveal-up">
            By the early 1180s, something extraordinary had happened. Against impossible odds, Salahuddin had united Egypt, Damascus, Aleppo, Mosul’s surrounding regions, and vast territories across the Muslim world. Not perfectly. Not without resistance. But enough.
          </p>

          <p className="editorial-p reveal-up">
            Enough for the Crusaders to become afraid. And deep inside the castles of the Crusader Kingdom of Jerusalem… fear was growing.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE MAN WHO WANTED WAR */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Spark</span>
            <h2 className="editorial-giant-text reveal-up">
              Raynald de Châtillon
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up">
              Among the Crusaders was a man whose name became infamous across the Muslim world. Raynald was not like ordinary rulers. Even many Crusaders considered him reckless. Violent. Cruel. Driven by hatred and greed.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/raynald_attack_caravan.png" alt="Raynald attacking a peaceful pilgrim caravan" />
            </div>
            
            <p className="editorial-p reveal-up">
              He attacked caravans carrying Muslim pilgrims. Broke peace treaties repeatedly. Raided trade routes. And committed acts so brutal that rage spread through Muslim lands wherever his name was mentioned.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)'}}>
              But then… he crossed a line that changed history forever.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE ATTACK ON THE PILGRIMS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Sacred Vow</span>
            <h2 className="sticky-title reveal-up">“If Allah grants me victory… I will kill Raynald with my own hands.”</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            One caravan traveling peacefully between Muslim lands was suddenly attacked by Raynald’s forces. The travelers were robbed. Captured. Humiliated. Some reports say members of Salahuddin’s own family may have been among those affected.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            But worse than this… Raynald openly mocked Islam itself. Muslim chroniclers narrate that when prisoners begged him to respect the peace treaty, he laughed arrogantly. Some accounts even describe him insulting Prophet Muhammad ﷺ.
          </p>

          <p className="editorial-p reveal-up">
            When news reached Salahuddin… something changed inside him. For years, he had shown patience. For years, he balanced diplomacy and war carefully. But this… this became personal. Not for ego. Not for pride. But because the sanctity of Islam had been violated openly.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/salahuddin_promise.png" alt="Salahuddin making a solemn oath" />
          </div>

          <p className="editorial-p reveal-up">
            And before witnesses, Salahuddin made a promise. A terrifying promise. The words spread across the region like fire. Everyone understood now. War was coming. And this time… it would not end with negotiations.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE GATHERING STORM & NIGHT BEFORE WAR */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Burden</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>A man terrified of accountability before Allah.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Throughout the Muslim world, armies began preparing. From Egypt… from Syria… from Upper Mesopotamia… fighters gathered beneath Salahuddin’s banner. But this army was different. These were not merely soldiers chasing wealth. Many believed they were participating in something sacred.
          </p>
          
          <p className="editorial-p reveal-up">
            For decades, Muslims had dreamed of reclaiming Jerusalem. Now, for the first time in generations… that dream no longer felt impossible.
          </p>
          
          <p className="editorial-p reveal-up">
            Meanwhile, inside Jerusalem, the Crusaders argued among themselves. Some wanted peace with Salahuddin. Others wanted war. But men like Raynald pushed constantly toward confrontation. Arrogance blinded them. They still remembered the divided Muslim world of earlier decades. They did not realize history had changed.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Before the great campaigns began, Islamic chroniclers describe Salahuddin spending long hours in prayer. Modern retellings often reduce him to a warrior alone. But the Islamic narratives portray something far deeper. A man carrying the burden of an entire Ummah. A man who knew thousands might die in the battles ahead.
          </p>
          
          <p className="editorial-p reveal-up">
            Baha ad-Din ibn Shaddad later wrote that Salahuddin remained deeply attached to Quran and worship even during military campaigns. At night, while armies rested… he often listened to the recitation of Quran. And somewhere inside him burned the memory of Jerusalem.
          </p>
        </div>
      </section>

      {/* SECTION 5: THE CRUSADERS MAKE THEIR MOVE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Hattin</span>
            <h2 className="sticky-title reveal-up">A place where thirst itself could become a weapon.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            In 1187 CE, the tension finally exploded. The Crusader army marched out in massive force. Knights in steel armor. Crosses raised high. Banners moving beneath the blazing sun.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/crusaders_march_hattin.png" alt="Crusaders marching through the desert" />
          </div>

          <p className="editorial-p reveal-up">
            This was no small skirmish anymore. This was the decisive confrontation both sides had feared for years. The Crusaders hoped to crush Salahuddin before his growing power became unstoppable.
          </p>
          
          <div className="editorial-pull-quote reveal-up">
            Salahuddin, meanwhile, understood the importance of patience. He did not rush recklessly. He studied: the terrain carefully, the water sources carefully, the supply routes carefully. Because he knew: Battles are not won only by courage. They are won by intelligence.
          </div>

          <p className="editorial-p reveal-up">
            And so he began pulling the Crusader army toward a place called: Hattin. A dry land. Burning hot. Merciless beneath the summer sun.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE ARMY OF THE UMMAH */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '4rem 0'}}>
              The Army of the Ummah
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              As Salahuddin’s forces gathered near Hattin, something remarkable could be seen. Kurds. Turks. Arabs. Former rivals. Men from different lands standing together beneath one cause. For perhaps the first time in generations… the Ummah looked united again.
            </p>

            <div className="story-divider" style={{margin: '4rem auto'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              And at the center stood Salahuddin. Not screaming. Not intoxicated by power. But calm. Focused. Watching history move closer. He understood the next battle could decide everything: the future of Jerusalem, the survival of Crusader power, and the destiny of the Muslim world itself.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              That night, fires burned across the hills. Soldiers sharpened swords. Prayers echoed through the camps.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem'}}>
              And somewhere in the darkness… Salahuddin looked toward the horizon of occupied Jerusalem. The city he had heard about since childhood. The city Nur ad-Din dreamed of freeing. The city drenched in the blood of Muslims nearly ninety years earlier.<br/><br/>Tomorrow… history would begin changing.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 6
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={6} />
    </article>
  );
}
