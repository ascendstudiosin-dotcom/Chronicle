import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part9() {
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

      <StoryNavbar currentPartId={9} title="THE LIONHEART AND THE SULTAN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/part9_lionheart_sultan_hero.png" 
            alt="The Lionheart and the Sultan" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 9</h1>
          <h2 className="story-page-title">THE LIONHEART AND THE SULTAN</h2>
          <p className="story-page-subtitle">When the World’s Greatest Kings Went to War</p>
        </div>
      </header>

      {/* SECTION 1: THE FALL OF JERUSALEM & THE THIRD CRUSADE */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Holy War</span>
            <h2 className="sticky-title reveal-up">An army of kings. An army of legends. An army marching directly toward Salahuddin.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            The fall of Jerusalem (modern-day Palestine) shook Europe like an earthquake. Church bells rang across kingdoms. Priests stood before crowds calling for holy war.
          </p>
          
          <p className="editorial-p reveal-up">
            Kings who once fought each other now prepared for a single mission: Take Jerusalem back.
          </p>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The news spread through:<br/>
            England (modern-day United Kingdom),<br/>
            France (modern-day France),<br/>
            and the Holy Roman Empire (central European regions)<br/>
            with fury and disbelief.
          </p>

          <p className="editorial-p reveal-up">
            To many in Europe, the loss of Jerusalem was unbearable. And so began the largest Crusade the Muslim world had faced in generations.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3.5rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            The Third Crusade
          </p>
        </div>
      </section>

      {/* SECTION 2: THE KINGS OF EUROPE & THE OLD MAN WHO NEVER ARRIVED */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Three Titans</span>
            <h2 className="editorial-giant-text reveal-up">
              The Kings of Europe
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontSize: '1.8rem', color: 'var(--royal-red)', margin: '4rem 0' }}>
              Three of the most powerful rulers in Europe answered the call.
            </p>

            <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', margin: '6rem 0', textAlign: 'left' }}>
              <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--royal-red)', marginBottom: '1rem' }}>Richard I of England</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--cream)' }}>The warrior king of England. Fearless. Aggressive. Obsessed with battle.</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--royal-red)', marginBottom: '1rem' }}>Philip II of France</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--cream)' }}>A calculating ruler with enormous political influence.</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--royal-red)', marginBottom: '1rem' }}>Frederick Barbarossa</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--cream)' }}>An aging emperor whose reputation alone terrified enemies.</p>
              </div>
            </div>

            <p className="editorial-p reveal-up">
              Never before had such powerful European rulers marched together toward the Muslim world. The scale of the threat was enormous. Even after Jerusalem’s liberation… Salahuddin’s greatest challenge was only beginning.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '1000px'}}>
              <img className="editorial-image" src="/part9_barbarossa_march.png" alt="Barbarossa's massive army marching across the rugged terrain of Anatolia" />
            </div>

            <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--royal-red)', margin: '6rem 0 2rem 0' }}>
              The Old Man Who Never Arrived
            </h3>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              Among the strangest twists of history came before the Crusaders even reached the Holy Land. Frederick Barbarossa — leading a massive army across Anatolia (modern-day Türkiye) — suddenly died during the journey.
            </p>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              Some reports say he drowned crossing a river. Others describe exhaustion and illness. But whatever the cause… his death shattered morale among his forces. Large portions of his army dissolved before ever reaching Palestine.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)', maxWidth: '800px', margin: '5rem auto'}}>
              Muslim historians later viewed this as one of the unseen ways Allah weakened the Crusade before the major battles even began.
            </div>

            <p className="editorial-p reveal-up" style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
              Still… the danger remained terrifying. Because one man was still coming. Richard the Lionheart. And unlike many kings… Richard lived for war.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE ARRIVAL OF RICHARD & THE WAR OF EXHAUSTION */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">Clash of Commanders</span>
            <h2 className="sticky-title reveal-up">For the first time in years… Salahuddin faced an enemy worthy of his full attention.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            When Richard arrived in the Holy Land (modern-day Palestine / Israel region)… the balance of war shifted immediately. He was exactly what the Crusader forces desperately needed: fearless, charismatic, militarily brilliant, and terrifying in battle. Even Muslim chroniclers acknowledged his courage.
          </p>
          
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0'}}>
            The war that followed became legendary across both Muslim and European history. Not because it was clean or glorious. But because it brought together two of the most famous commanders of the medieval world. Richard and Salahuddin.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/part9_acre_siege_warfare.png" alt="The brutal and bloodstained siege warfare along the coastal fortresses" />
          </div>
          
          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The War of Exhaustion
          </h3>

          <p className="editorial-p reveal-up">
            The battles of the Third Crusade were brutal. Coastal cities became bloodstained battlegrounds. Sieges lasted for months. Thousands died from wounds, hunger, and disease. At Acre (modern-day Akko region), fighting became especially horrific.
          </p>

          <p className="editorial-p reveal-up">
            The city changed hands amid terrible suffering. Executions shocked both sides. And the war slowly transformed into something darker: A war of endurance. Who would break first?
          </p>

          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            The Crusaders wanted Jerusalem.<br/>
            Salahuddin wanted to preserve everything he had fought decades to build.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', marginTop: '4rem'}}>
            Every decision carried enormous weight. Because if Jerusalem fell again… all the sacrifices before it might collapse into dust.
          </p>
        </div>
      </section>

      {/* SECTION 4: RESPECT BETWEEN ENEMIES */}
      <div className="full-width-break" style={{backgroundColor: '#ebe4db', color: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Chivalry Amid Bloodshed</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)'}}>
              Respect Between Enemies
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--coffee-dark)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto', color: 'var(--coffee-dark)' }}>
              One of the most fascinating aspects of this war was the strange respect that developed between Salahuddin and Richard. They were enemies. But not ordinary enemies. Both recognized greatness in the other. Islamic and European chroniclers preserved stories that became legendary.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--royal-red)', borderColor: 'var(--royal-red)', maxWidth: '800px', margin: '5rem auto', textAlign: 'left'}}>
              At one point, when Richard fell ill, Salahuddin reportedly sent: fruit, snow for cooling drinks, and even physicians to assist him. In another narration, when Richard’s horse was killed in battle, Salahuddin sent him replacement horses.
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto', color: 'var(--coffee-dark)' }}>
              To modern minds this may seem unbelievable. But medieval concepts of honor and chivalry carried deep importance. Even amid war… both men saw each other as extraordinary opponents.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/part9_richard_salahuddin_standoff.png" alt="A symbolic representation of the tactical and chivalrous standoff between Richard and Salahuddin" />
            </div>

            <p className="editorial-p reveal-up" style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '1.8rem', maxWidth: '800px', margin: '0 auto', color: 'var(--royal-red)' }}>
              Yet make no mistake: the fighting remained ruthless. Respect did not erase bloodshed. Thousands still died. Cities still burned. And Jerusalem still hung in the balance.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 5: THE SULTAN GROWS TIRED & THE ROAD TO JERUSALEM STOPS */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Weight of Decades</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3.2rem'}}>Capturing Jerusalem was one thing. Holding it against Salahuddin was another.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', marginBottom: '2rem' }}>
            The Sultan Grows Tired
          </h3>

          <p className="editorial-p reveal-up">
            Years of endless warfare began consuming Salahuddin physically. This is something many heroic retellings ignore. By now, he was no longer young.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            He had spent decades:<br/>
            fighting wars,<br/>
            managing rebellions,<br/>
            negotiating politics,<br/>
            leading armies,<br/>
            carrying the burden of the Ummah.
          </p>
          
          <p className="editorial-p reveal-up">
            And the exhaustion was beginning to show. Islamic chroniclers describe periods where stress and illness weakened him badly. Yet he refused to abandon the struggle. Because Jerusalem remained sacred beyond exhaustion.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/part9_aging_sultan_war_toll.png" alt="The heavy physical and emotional toll of endless warfare upon the aging Sultan" />
          </div>

          <div className="story-divider"></div>

          <h3 className="reveal-up" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--royal-red)', margin: '4rem 0 2rem 0' }}>
            The Road to Jerusalem Stops
          </h3>

          <p className="editorial-p reveal-up">
            Eventually, Richard advanced frighteningly close toward Jerusalem. Muslim anxiety spread rapidly. What if the city fell again? What if everything was lost? But Richard faced problems too.
          </p>
          
          <p className="editorial-p reveal-up" style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--royal-red)', margin: '3rem 0' }}>
            His forces were exhausted.<br/>
            Supplies weakened.<br/>
            Internal Crusader politics created division.
          </p>

          <p className="editorial-p reveal-up">
            And deep down… even Richard understood something dangerous: Capturing Jerusalem was one thing. Holding it against Salahuddin was another. At last, after years of brutal warfare… both sides moved toward negotiation. Neither side had truly destroyed the other. Neither side could continue endlessly. And so… history approached a fragile conclusion.
          </p>
        </div>
      </section>

      {/* SECTION 6: THE TREATY & THE MAN AFTER WAR */}
      <section className="story-section" style={{paddingBottom: '15rem', backgroundColor: '#110e0c'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <span className="editorial-kicker" style={{color: 'var(--royal-red)'}}>Fragile Peace</span>
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--cream)', margin: '2rem 0 4rem 0'}}>
              The Treaty
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              In 1192 CE, a treaty was reached. Jerusalem would remain under Muslim control. But Christian pilgrims would be allowed peaceful access to the holy city. The war ended without the Crusaders retaking Al-Quds.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '6rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              For the Muslim world, this mattered enormously. Despite the full fury of Europe’s greatest kings… Jerusalem remained free. Salahuddin had held the line. The dream of Nur ad-Din survived.
            </div>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/part9_treaty_ramla_peace.png" alt="The historic sealing of the treaty securing Jerusalem under Muslim control" />
            </div>

            <div className="story-divider" style={{margin: '6rem auto', backgroundColor: 'rgba(255,255,255,0.1)'}}></div>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              The Man After War
            </h2>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              But war had taken something from Salahuddin. Years of struggle carved exhaustion into him. The victorious liberator of Jerusalem now carried the weight of countless campaigns upon his body and soul. And perhaps most painfully… he understood something ordinary people did not.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '4rem auto', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
              Victory never truly lasts forever in dunya. Kingdoms rise. Kingdoms fall. Cities are liberated. Then tested again.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', color: 'var(--cream)'}}>
              And somewhere inside him… Salahuddin likely knew his own time was nearing its end. The warrior who spent his life chasing Jerusalem… was finally growing tired.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 9
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={9} />
    </article>
  );
}
