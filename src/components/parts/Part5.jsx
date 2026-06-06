import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part5() {
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

      <StoryNavbar currentPartId={5} title="THE DEATH OF NUR AD-DIN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/nur_ad_din_deathbed.png" 
            alt="The Shield of the Ummah Fell" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 5</h1>
          <h2 className="story-page-title">THE DEATH OF NUR AD-DIN</h2>
          <p className="story-page-subtitle">When the Shield of the Ummah Fell</p>
        </div>
      </header>

      {/* SECTION 1: THE SHIELD OF THE UMMAH FELL */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Shield</span>
            <h2 className="sticky-title reveal-up">There are moments in history when an empire collapses not because walls fall… but because one man dies.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            For the Muslim world of the 12th century, that man was Nur ad-Din Zangi. For years, Nur ad-Din had been the shield standing between the Ummah and complete disaster. He united cities. Revived Islamic learning. Strengthened armies. Defended Syria from Crusader invasions.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up">
            And above all else… he carried Jerusalem in his heart. Every decision he made pointed toward Al-Quds. Even his nights were consumed by it. Historians mention that he would sit with scholars discussing the virtues of Jerusalem until tears filled his eyes.
          </p>
          
          <div className="editorial-pull-quote reveal-up">
            He was not merely building a kingdom. He was trying to rebuild a broken Ummah.
          </div>

          <p className="editorial-p reveal-up">
            And then… in the year 1174 CE… death came suddenly. Nur ad-Din fell ill. The great ruler weakened rapidly. The man who terrified Crusaders… the man who inspired scholars… the man who dreamed of liberating Jerusalem… lay helpless on his bed in Damascus.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', textAlign: 'center'}}>
            And when news of his death spread… it felt as if the sky itself had cracked.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE DREAM IN DANGER */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>Fragmentation</span>
            <h2 className="editorial-giant-text reveal-up">
              The Dream In Danger
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up">
              The moment Nur ad-Din died, the unity he built began trembling. Because strong rulers can unite lands… but after their death, hidden ambitions rise from the shadows.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/salahuddin_lonely_decision.png" alt="Salahuddin bearing the lonely burden in Cairo" />
            </div>
            
            <p className="editorial-p reveal-up">
              Suddenly: governors wanted independence, military commanders wanted power, rival factions began plotting, and enemies sensed weakness. The Muslim world once again stood on the edge of fragmentation. And the Crusaders were watching closely. Waiting. Patiently. Like wolves smelling blood in the air.
            </p>

            <p className="editorial-p reveal-up">
              In Egypt, Salahuddin received the news with deep sorrow. This was not merely the death of a ruler to him. This was the death of his mentor, his political protector, and the man whose vision shaped his entire path.
            </p>
            
            <p className="editorial-p reveal-up">
              For years, Salahuddin had operated under Nur ad-Din’s authority. Now that shield was gone. And suddenly… many people turned suspicious eyes toward him.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: RUMORS OF THE THRONE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Ambition & Betrayal</span>
            <h2 className="sticky-title reveal-up">“Salahuddin wants the throne.”</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Rumors spread quickly. “He wants power.” “He betrayed Nur ad-Din.” “He plans to take Syria for himself.” The accusations came from everywhere. Some genuinely feared him. Others envied him. And some simply could not accept that the quiet Kurdish commander from Tikrit had become so influential.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            At the center of Syria stood Nur ad-Din’s young son: As-Salih Ismail al-Malik. Still only a child. Too young to control the collapsing political situation around him. Powerful emirs began manipulating the young heir while rival factions prepared for conflict.
          </p>

          <p className="editorial-p reveal-up">
            The unity Nur ad-Din had spent years building was beginning to crack apart. And Salahuddin faced an impossible choice. If he remained only in Egypt… the Muslim world could split apart completely. But if he marched into Syria… people would accuse him of ambition and betrayal. Either way, he would be hated by someone.
          </p>

          <div className="editorial-pull-quote reveal-up">
            And this is where many storytellers misunderstand Salahuddin. They imagine him charging toward power with excitement. But Islamic historians describe something very different. They describe hesitation. Heavy responsibility. Fear of causing division.
          </div>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            Because Salahuddin understood: If Muslims fought each other again… Jerusalem would remain lost forever.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE LONELIEST DECISION & THE CITY OF DESTINY */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The City of Destiny</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>He marched toward Damascus.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Night after night, Salahuddin consulted scholars and advisors. What should he do? Stay in Egypt and protect his own territory? Or move into Syria and risk civil war? The burden was enormous.
          </p>
          
          <p className="editorial-p reveal-up">
            Because now the dream of Jerusalem rested on fragile foundations. One wrong move could destroy everything Nur ad-Din had built. Finally… Salahuddin made his decision. Not for wealth. Not for ego. But because he believed Muslim unity had to survive. And so, in 1174 CE… he marched toward Damascus.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/damascus_gates_open.png" alt="The gates of Damascus open for Salahuddin" />
          </div>

          <p className="editorial-p reveal-up">
            Damascus was not just another city to Salahuddin. It was home. The city where he grew up. The city where he studied Quran. The city where his journey truly began. As his forces approached, tension spread everywhere. People feared bloodshed. Would Muslim armies fight one another in the streets? Would Syria descend into chaos?
          </p>
          
          <p className="editorial-p reveal-up">
            But then something unexpected happened. The people of Damascus opened the gates for Salahuddin. Not because he terrified them. But because many trusted him more than the corrupt factions fighting for control.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            And so Salahuddin entered Damascus peacefully. The city of his childhood now stood beneath his authority. Yet instead of celebration… the burden on his shoulders only grew heavier. Because controlling Damascus was one thing. Uniting the Muslim world was another.
          </p>
        </div>
      </section>

      {/* SECTION 5: THE WAR NO ONE WANTED */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The War No One Wanted</span>
            <h2 className="sticky-title reveal-up">There would never be a free Jerusalem while Muslims remained divided.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            The years that followed were painful. Muslim rulers fought Muslims. Cities resisted. Old alliances shattered. Political betrayal spread constantly. And throughout all of this… the Crusaders remained alive and dangerous.
          </p>
          
          <p className="editorial-p reveal-up">
            Salahuddin’s enemies accused him endlessly: “Power hungry.” “Ambitious.” “Destroyer of Nur ad-Din’s legacy.”
          </p>
          
          <div className="editorial-pull-quote reveal-up">
            But slowly, city by city… he brought stability. Not through endless massacres. Not through blind cruelty. But through diplomacy when possible… and force when necessary.
          </div>

          <p className="editorial-p reveal-up">
            Aleppo resisted him. Mosul resisted him. Other rulers feared losing authority. But Salahuddin knew something they did not fully understand: There would never be a free Jerusalem while Muslims remained divided.
          </p>

          <p className="editorial-p reveal-up">
            This belief drove everything he did. Every campaign. Every negotiation. Every sacrifice.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE MAN HE WAS BECOMING */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '4rem 0'}}>
              The Man He Was Becoming
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              War changes men. Sometimes it destroys them. Sometimes it reveals them. By now, Salahuddin was no longer the unnoticed scholar from Damascus. Years of responsibility had transformed him.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto'}}>
              But unlike rulers consumed by power… he became more humble as his authority grew.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/salahuddin_praying_war.png" alt="Salahuddin kneeling in deep prayer during a military campaign" />
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Islamic chroniclers describe him: praying regularly with deep sincerity, listening to Quran emotionally, giving enormous charity, and avoiding arrogance despite controlling vast territories.
            </p>

            <div className="story-divider" style={{margin: '4rem auto'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              And perhaps most importantly… he never lost sight of Jerusalem. Even during civil wars. Even during betrayals. Even during moments when survival itself seemed uncertain. Al-Quds remained ahead of him like a distant light in darkness.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              Everything was moving toward it. Everything.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem'}}>
              And soon… the moment would finally come when Salahuddin stood face to face with the Crusader kingdom itself. Not through small raids. Not through border conflicts. But through the war that would decide the future of the Holy Land forever.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 5
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={5} />
    </article>
  );
}
