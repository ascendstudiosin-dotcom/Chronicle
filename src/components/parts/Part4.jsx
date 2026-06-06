import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part4() {
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

      <StoryNavbar currentPartId={4} title="THE FALL OF THE FATIMIDS" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/cairo_whispers.png" 
            alt="The Throne That Trembled" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 4</h1>
          <h2 className="story-page-title">THE FALL OF THE FATIMIDS</h2>
          <p className="story-page-subtitle">The Throne That Trembled</p>
        </div>
      </header>

      {/* SECTION 1: CAIRO WHISPERS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A City of Whispers</span>
            <h2 className="sticky-title reveal-up">Behind its golden palaces and crowded markets, fear moved silently through the corridors of power.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            Cairo was a city of whispers. Every smile hid suspicion. Every alliance carried betrayal. And at the center of it all sat a young man nobody fully understood.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up">
            Salahuddin Ayyubi. The new vizier of Egypt. The scholars saw him as pious. The soldiers saw him as calm. The politicians saw him as weak. But the Crusaders… the Crusaders were beginning to pay attention.
          </p>
          
          <p className="editorial-p reveal-up">
            Because while the nobles of Cairo drowned themselves in luxury and politics… Salahuddin was rebuilding discipline. Quietly. Patiently. Like a man laying foundations beneath the earth before anyone notices the structure rising above it.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE DYING CALIPHATE */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>Rot from within</span>
            <h2 className="editorial-giant-text reveal-up">
              The Dying Caliphate
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            <p className="editorial-p reveal-up">
              For nearly two centuries, the Fatimid Caliphate had ruled Egypt. But now it was rotting from the inside. Its rulers lived in unimaginable luxury while the state collapsed around them. Armies were divided by ethnicity and loyalty. The treasury weakened. The people suffered.
            </p>
            
            <p className="editorial-p reveal-up" style={{marginTop: '2rem'}}>
              And outside Egypt’s borders, Crusader kingdoms waited like wolves surrounding a wounded animal.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)', margin: '6rem 0'}}>
              Salahuddin walked through Cairo and understood something terrifying: "If Egypt falls… Jerusalem may never return to Islam again."
            </div>
            
            <p className="editorial-p reveal-up">
              This was bigger than politics now. Bigger than dynasties. Bigger than kings. The future of the Ummah itself was at stake.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE YOUNG VIZIER */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Patient Chess Player</span>
            <h2 className="sticky-title reveal-up">At first, many people expected Salahuddin to fail quickly.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            The Fatimid elites laughed at him privately. He did not behave like power-hungry rulers. He did not enter halls screaming commands. He did not drown himself in gold or celebrations.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/salahuddin_chess.png" alt="Salahuddin strategizing like a chess player" />
          </div>

          <p className="editorial-p reveal-up">
            Instead: he prayed, consulted scholars, inspected armies, strengthened defenses, and slowly placed loyal people into positions of authority. Like a patient chess player… he moved carefully.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            The people of Egypt began noticing the difference. Corruption started shrinking. Discipline returned. The army improved. And most importantly… religious revival began spreading again. Masjids filled. Scholars gained support. The atmosphere of the city slowly changed.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            Not through fear. But through leadership. And that frightened his enemies even more.
          </p>

          <div className="editorial-pull-quote reveal-up">
            Because tyrants understand something very well: A ruler who controls armies is dangerous. But a ruler who wins hearts… is unstoppable.
          </div>
        </div>
      </section>

      {/* SECTION 4: THE NIGHT OF FEAR */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Conspiracy</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>The city stood on the edge of civil war.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Still, Salahuddin’s position remained incredibly fragile. The Fatimid court hated him. Secret plots formed constantly. Spies moved through Cairo’s streets. One wrong step could destroy him.
          </p>
          
          <p className="editorial-p reveal-up">
            And then… the conspiracy finally came. A dangerous plot emerged inside Egypt involving forces loyal to the old regime. The plan was brutal: assassinate Salahuddin, weaken Nur ad-Din’s influence, and return Egypt fully into chaos.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            But Salahuddin moved quickly. The conspiracy was crushed before it could fully erupt. For the first time, many in Cairo realized: This quiet young man was not weak. He was dangerous.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--royal-red)', textAlign: 'center'}}>
            Not because of rage. Not because of cruelty. But because of control.
          </p>
        </div>
      </section>

      {/* SECTION 5: THE END OF AN EMPIRE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Khutbah That Changed History</span>
            <h2 className="sticky-title reveal-up">The Fatimid Caliphate had fallen. After nearly 200 years of rule… its era ended almost silently.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Then came the moment that would shake the Islamic world. The Fatimid Caliph — weak, sick, and isolated — was nearing death. And Salahuddin now faced the decision that would define history.
          </p>
          
          <p className="editorial-p reveal-up">
            For centuries, Egypt had recognized the Fatimid Caliphate. But Salahuddin knew the Muslim world could not unite while division remained. He also understood the risks. Ending Fatimid rule could trigger: rebellion, assassination, civil war, and foreign invasion. Everything rested on one decision.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/friday_khutbah.png" alt="The Khutbah that ended an empire" />
          </div>

          <p className="editorial-p reveal-up">
            Then one Friday… inside the masjids of Egypt… the khutbah changed. Instead of the Fatimid ruler’s name… the name of the Abbasid Caliph in Baghdad was announced. It was over.
          </p>

          <p className="editorial-p reveal-up">
            No massive battle. No dramatic final stand. Just one khutbah. One name replaced by another. And with that moment… Egypt returned to Sunni authority.
          </p>

          <div className="editorial-pull-quote reveal-up">
            Islamic historians describe the event almost like the lifting of a heavy darkness. Because now, for the first time in generations: Egypt and Syria could truly unite.
          </div>
        </div>
      </section>

      {/* SECTION 6: THE TEARS OF NUR AD-DIN */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            <h2 className="editorial-giant-text reveal-up">
              The Man Who Cried For Jerusalem
            </h2>
            
            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px', height: '60vh'}}>
              <img className="editorial-image" src="/nur_ad_din_tears.png" alt="Nur ad-Din Zangi crying for Jerusalem" style={{objectPosition: 'top center'}} />
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Far away in Damascus, Nur ad-Din heard the news. Egypt was now effectively under Sunni control. His dream was becoming reality. Historians say Nur ad-Din had tears in his eyes when speaking about Jerusalem.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto'}}>
              Everything he built… every madrasa, every army, every campaign, every sacrifice… was for one purpose: Al-Quds. And now Salahuddin was becoming the sword of that dream. Though even then… neither man fully understood what Allah had planned ahead.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 7: THE TRANSFORMATION */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              The Death of His Father
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Just as Salahuddin’s power grew… tragedy struck him personally. Najm ad-Din Ayyub — the man who had guided him since childhood — died after a riding accident in Cairo. The loss crushed Salahuddin emotionally. Because his father had always been: his advisor, his stabilizer, his source of wisdom.
            </p>

            <div className="story-divider" style={{margin: '4rem auto'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              And now… for the first time… he truly stood alone. Islamic chroniclers mention that Salahuddin became even more serious after this. Less carefree. More reflective. More attached to responsibility. As if he understood life was no longer preparing him. It was testing him now.
            </p>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '6rem 0', fontSize: '4.5rem'}}>
              The Transformation
            </h2>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Something had changed inside Salahuddin completely. The young scholar from Damascus was disappearing. In his place emerged a leader forged by: politics, war, betrayal, loss, and responsibility.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw'}}>
              Yet unlike many rulers… power did not harden his heart. It softened it toward Allah.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Baha ad-Din ibn Shaddad later described Salahuddin as a man deeply attached to Quran and prayer. Even while ruling vast lands, he remained emotionally moved by Islamic reminders. And perhaps that is what made people follow him. Not fear. Not wealth. But sincerity.
            </p>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', marginTop: '6rem', color: 'var(--royal-red)'}}>
              Still… the greatest challenge had not arrived yet. Because while Salahuddin strengthened Egypt… the man who dreamed of Jerusalem before everyone else… was nearing the end of his life. And when he died… the Muslim world would explode into chaos again.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 4
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={4} />
    </article>
  );
}
