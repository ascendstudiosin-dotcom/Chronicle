import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part3() {
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

      <StoryNavbar currentPartId={3} title="THE ROAD TO EGYPT" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/shirkuh_salahuddin.png" 
            alt="The Road to Egypt" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 3</h1>
          <h2 className="story-page-title">THE ROAD TO EGYPT</h2>
          <p className="story-page-subtitle">The Quiet Scholar Enters the Storm</p>
        </div>
      </header>

      {/* SECTION 1: THE EDGE OF DISASTER */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Fractured Realm</span>
            <h2 className="sticky-title reveal-up">By the middle of the 12th century, the Muslim world stood at the edge of disaster.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            Jerusalem remained under Crusader occupation. Syria lived under constant threat. And now… Egypt was beginning to collapse from within.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up">
            Once powerful and wealthy, the Fatimid Caliphate in Cairo had become weak, divided, and consumed by political corruption. Ministers betrayed one another. Armies fought for influence. The rulers inside the palaces argued while Crusader kingdoms watched hungrily from the north.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/fatimid_cairo_palace.png" alt="Fatimid Palace in Cairo" />
          </div>
          
          <div className="editorial-pull-quote reveal-up">
            Whoever controlled Egypt… could control the future of the entire region.
          </div>

          <p className="editorial-p reveal-up">
            If the Crusaders seized Egypt, the Muslim lands of Syria and Iraq could be trapped from both sides. Nur ad-Din Zangi understood this danger better than anyone. So he prepared a military expedition toward Egypt.
          </p>
          
          <p className="editorial-p reveal-up">
            Leading the mission was his most feared commander: Asad ad-Din Shirkuh. And among the soldiers riding beside Shirkuh… almost unnoticed… was his nephew. Yusuf ibn Ayyub. Salahuddin.
          </p>

          <p className="editorial-p reveal-up">
            At this stage of his life, Salahuddin was still not famous. Not feared. Not celebrated. He was simply another young officer accompanying his uncle into a dangerous political war. In truth… he did not even seem fully comfortable with military life yet. Islamic chroniclers mention that he still carried the nature of a scholar more than that of a warrior.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', textAlign: 'center'}}>
            But Allah was now dragging him into history.
          </p>
        </div>
      </section>

      {/* SECTION 2: FULL WIDTH BREAK - THE JOURNEY */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The First Journey</span>
            <h2 className="editorial-giant-text reveal-up">
              Into Egypt
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            <p className="editorial-p reveal-up">
              The road from Damascus to Egypt was harsh and exhausting. Armies crossed endless deserts beneath burning heat. Dust filled the air. Water was scarce. And every mile carried uncertainty.
            </p>
            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem 0'}}>
              <img className="editorial-image" src="/desert_army_journey.png" alt="Islamic army crossing the desert" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE LESSON OF CHAOS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">A Battlefield Without Stability</span>
            <h2 className="sticky-title reveal-up">For Salahuddin, this journey was more than military movement. It was the beginning of transformation.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            As the army advanced toward Cairo, he witnessed things he had previously known only through stories: political manipulation, fragile alliances, betrayal between Muslim factions, and the growing aggression of Crusader forces.
          </p>
          
          <p className="editorial-p reveal-up">
            Egypt itself had become a battlefield without stability. The Fatimid viziers invited foreign powers against one another in desperate attempts to survive. At times they sought help from Nur ad-Din. At other times they negotiated with Crusaders. Loyalty shifted constantly. No one trusted anyone.
          </p>
          
          <div className="editorial-pull-quote reveal-up">
            And within this chaos, young Salahuddin learned one of the greatest lessons of leadership: A divided Ummah destroys itself before enemies ever need to attack.
          </div>
        </div>
      </section>

      {/* SECTION 4: THE LION OF WAR */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Shirkuh</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.5rem'}}>The Lion of War.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            If Salahuddin was the calm mind… Shirkuh was the raging sword.
          </p>
          
          <p className="editorial-p reveal-up">
            Massive in presence and terrifying in battle, Shirkuh moved through Egypt like a storm. His military brilliance forced both Crusaders and Fatimid politicians into panic. Even his enemies respected him. But Shirkuh’s personality was intense. He was bold. Direct. Aggressive.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            Meanwhile, Salahuddin observed quietly from beside him. Watching. Learning. Absorbing. Islamic historians often portray this period as Allah training Salahuddin through hardship rather than comfort.
          </p>
          
          <p className="editorial-p reveal-up">
            He learned how rulers manipulate religion for power, how armies collapse from weak leadership, how fear controls politicians, and how patience can defeat stronger enemies. These lessons would later define his rule.
          </p>
        </div>
      </section>

      {/* SECTION 5: CRUSADERS AND ALEXANDRIA */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Furnace of Leadership</span>
            <h2 className="sticky-title reveal-up">The Crusaders Arrive & The Siege of Alexandria</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Soon, the situation exploded further. The Crusader Kingdom of Jerusalem entered Egypt directly. Now Muslim armies and Crusader armies fought openly for control of the country. For Salahuddin, this was among his first experiences facing Crusader warfare firsthand.
          </p>
          
          <p className="editorial-p reveal-up">
            He witnessed armored knights, siege warfare, massacres, political deception, and the terrifying discipline of Crusader military forces. This was no longer the scholarly world of Damascus. This was survival.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/crusader_siege_alexandria.png" alt="Crusader Siege of Alexandria" />
          </div>
          
          <div className="editorial-pull-quote reveal-up">
            And slowly… the quiet young man began changing. Not into a tyrant. Not into a savage. But into someone who understood that protecting the Ummah required strength as well as piety.
          </div>

          <p className="editorial-p reveal-up">
            One of the defining moments of Salahuddin’s early career came during the struggle for Alexandria. The city became trapped in conflict. Crusader pressure intensified. Chaos spread. And suddenly, Salahuddin found himself entrusted with major responsibility for the city’s defense.
          </p>

          <p className="editorial-p reveal-up">
            This shocked many people. He was still young. Still relatively unknown. Still overshadowed by Shirkuh. Yet during the siege, something began emerging inside him: calm under pressure, intelligence in negotiation, patience during crisis, and unusual composure during fear.
          </p>

          <p className="editorial-p reveal-up">
            People around him started noticing. This was not merely a scholar. There was leadership inside him. Hidden. Quiet. But real.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE DEATH THAT CHANGED EVERYTHING */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <span className="editorial-kicker reveal-up" style={{margin: '0 auto'}}>A Man Who Never Sought The Throne</span>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto 8rem auto'}}>
              Perhaps the most fascinating part of Salahuddin’s rise is this: He did not obsess over becoming king. Unlike the ambitious politicians surrounding him, Salahuddin did not spend his youth desperately chasing authority. Islamic chroniclers repeatedly emphasize this point. And maybe that is why Allah opened leadership for him. Because history often places enormous responsibility upon those who never sought it for ego.
            </p>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              The Death That Changed Everything
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              In 1169 CE, after years of struggle in Egypt… Shirkuh suddenly died. The lion of war was gone. The military giant everyone feared had fallen unexpectedly after only a short time as vizier of Egypt. The political world of Cairo exploded into uncertainty.
            </p>

            <div className="story-divider" style={{margin: '4rem auto'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Who would replace him? Powerful commanders wanted influence. Fatimid elites feared Nur ad-Din’s growing control. Everyone expected a ruthless military figure to emerge.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto'}}>
              Instead… the position was given to someone few considered dangerous. A young man in his early thirties. Soft-spoken. Educated. Respectful toward scholars. Often underestimated. Yusuf ibn Ayyub. Salahuddin.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw'}}>
              When the news spread through Egypt, many elites secretly smiled. “This young man will be easy to control. He is weak.” They had no idea they were witnessing the rise of one of history’s greatest rulers.
            </div>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '4rem 0', fontSize: '5rem'}}>
              The Weight of Power
            </h2>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Salahuddin suddenly found himself carrying impossible responsibility. Egypt was unstable. The Crusaders threatened invasion. The Fatimid regime distrusted him. Nur ad-Din expected results. And enemies surrounded him from every direction.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '2rem auto'}}>
              For many men, power creates arrogance. For Salahuddin… power created fear of Allah. Islamic historians describe him increasing in prayer, caution, consultation with scholars, and seriousness. Because now he understood something terrifying: The future of the Muslim world might depend on what he did next.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem 0'}}>
              <img className="editorial-image" src="/salahuddin_cairo.png" alt="Salahuddin bearing the weight of power in Cairo" />
            </div>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', marginTop: '6rem', color: 'var(--royal-red)'}}>
              And deep inside Cairo… beneath layers of political tension… another revolution was approaching. One that would completely reshape Islamic history. The fall of the Fatimid Caliphate.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 3
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={3} />
    </article>
  );
}
