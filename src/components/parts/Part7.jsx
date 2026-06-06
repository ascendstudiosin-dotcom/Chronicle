import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StoryNavbar from '../StoryNavbar';
import StoryFooter from '../StoryFooter';
import '../StoryPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function Part7() {
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

      <StoryNavbar currentPartId={7} title="THE BATTLE OF HATTIN" />
      
      {/* HERO SECTION */}
      <header className="story-page-hero">
        <div className="story-page-hero-bg">
          <img 
            ref={heroImgRef}
            src="/battle_of_hattin.png" 
            alt="The Day the Desert Burned" 
            className="story-page-hero-image" 
          />
          <div className="story-page-overlay"></div>
        </div>
        
        <div className="story-page-header-text">
          <h1 className="story-page-part-number">PART 7</h1>
          <h2 className="story-page-title">THE BATTLE OF HATTIN</h2>
          <p className="story-page-subtitle">The Day the Desert Burned</p>
        </div>
      </header>

      {/* SECTION 1: THE SUN ROSE OVER HATTIN */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Punishment</span>
            <h2 className="sticky-title reveal-up">The earth itself felt cursed beneath the feet of men marching toward death.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p drop-cap reveal-up">
            The sun rose over Hattin like a punishment from the sky. The heat was merciless.
          </p>
          
          <p className="editorial-p reveal-up">
            And across the dry hills, two armies faced one another. One carried crosses. The other carried the hope of an entire Ummah.
          </p>
          
          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/crusaders_march_hattin.png" alt="Crusaders marching through the scorching desert of Hattin" />
          </div>
          
          <div className="story-divider"></div>
          
          <p className="editorial-p reveal-up">
            For nearly ninety years, the Crusader Kingdom of Jerusalem had stood like a knife inside the Muslim world. Generation after generation of Muslims had grown up hearing stories of occupied Al-Quds. Children became old men before seeing hope return.
          </p>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            But now… that hope stood armed beneath the banners of Salahuddin.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE TRAP CLOSES */}
      <div className="full-width-break">
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Strategy</span>
            <h2 className="editorial-giant-text reveal-up">
              The Trap Closes
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up">
              The Crusader army had marched under terrible conditions. Salahuddin had planned this carefully. He avoided reckless confrontation. Instead, he slowly dragged the Crusaders deeper into heat and thirst.
            </p>

            <p className="editorial-p reveal-up">
              Away from water. Away from safety. Toward the burning plains of Hattin.
            </p>
            
            <p className="editorial-p reveal-up">
              Every hour weakened them further. Their heavy armor trapped heat inside their bodies. Horses collapsed. Mouths dried. Confusion spread through their ranks.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)'}}>
              And then Salahuddin tightened the trap. Muslim forces surrounded the Crusaders from multiple sides. Archers rained arrows relentlessly. Smoke filled the air as dry grass was set ablaze.
            </div>

            <p className="editorial-p reveal-up">
              The wind carried fire and suffocating heat directly toward the Crusader army. Panic began spreading. And for the first time… the seemingly unstoppable Crusader forces looked afraid.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: ALLAHU AKBAR */}
      <section className="story-section story-grid">
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Chaos</span>
            <h2 className="sticky-title reveal-up">Because this battle was not merely about victory. It was about ending an era.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', textAlign: 'center', margin: '4rem 0'}}>
            “ALLAHU AKBAR”
          </p>
          
          <p className="editorial-p reveal-up">
            Across the battlefield, cries of "Allahu Akbar!" echoed through the smoke and dust. Muslim cavalry charged repeatedly. Steel crashed against steel. Men screamed. Horses thundered across the scorched earth. The battle became chaos.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/hattin_salahuddin_directing.png" alt="Salahuddin directing his forces amidst the chaos of battle" />
          </div>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            But inside that chaos… Salahuddin remained calm. Watching. Directing. Waiting for the perfect moment.
          </p>

          <p className="editorial-p reveal-up">
            The Crusaders attempted desperate counterattacks. Knights charged with terrifying force. Again and again, they tried breaking through the Muslim lines. But thirst had already defeated them before swords ever could. The heat consumed their strength.
          </p>

          <p className="editorial-p reveal-up">
            And slowly… the army protecting Crusader Jerusalem began collapsing.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE FALL OF THE TRUE CROSS & THE KING CAPTURED */}
      <section className="story-section story-grid" style={{backgroundColor: '#ebe4db', paddingTop: '10rem'}}>
        <div className="sticky-col">
          <div className="sticky-content">
            <span className="editorial-kicker">The Relic & The King</span>
            <h2 className="sticky-title reveal-up" style={{fontSize: '3rem'}}>The mighty Crusader army was no longer fighting to win. It was fighting to survive.</h2>
          </div>
        </div>
        
        <div className="scroll-col">
          <p className="editorial-p reveal-up">
            Among the Crusaders, one object held enormous symbolic importance. The "True Cross." A relic they believed carried sacred power. It was brought onto the battlefield as a sign of divine support.
          </p>
          
          <p className="editorial-p reveal-up">
            But as the Crusader army shattered… the relic was captured by Muslim forces. Shock spread through Christian ranks. Panic deepened. And suddenly, the impossible became reality.
          </p>
          
          <div className="story-divider"></div>

          <p className="editorial-p reveal-up">
            One by one, the Crusader leaders fell. Then came the moment no one imagined possible. Guy of Lusignan — the King of Jerusalem himself — was captured alive.
          </p>
          
          <p className="editorial-p reveal-up">
            Beside him… another prisoner stood in chains. The man whose crimes had ignited Salahuddin’s fury. Raynald de Châtillon. The butcher of caravans. The breaker of treaties. The man who mocked Islam openly.
          </p>

          <div className="editorial-image-wrapper reveal-up" style={{margin: '4rem 0'}}>
            <img className="editorial-image" src="/hattin_raynald_captured.png" alt="Raynald de Châtillon captured and brought in chains" />
          </div>

          <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
            At last… he stood powerless before Salahuddin.
          </p>
        </div>
      </section>

      {/* SECTION 5: THE TENT OF SALAHUDDIN */}
      <div className="full-width-break" style={{backgroundColor: 'var(--coffee-dark)'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1'}}>
            <span className="editorial-kicker" style={{color: 'var(--cream)', opacity: 0.5}}>The Vow</span>
            <h2 className="editorial-giant-text reveal-up">
              The Tent of Salahuddin
            </h2>
            <div className="story-divider" style={{backgroundColor: 'var(--cream)', margin: '3rem auto', maxWidth: '300px'}}></div>
            
            <p className="editorial-p reveal-up">
              After the battle, the captured leaders were brought into Salahuddin’s tent. The atmosphere was heavy. The exhausted Crusader king trembled from thirst and fear. Salahuddin offered him water.
            </p>

            <p className="editorial-p reveal-up">
              This act carried deep meaning. In Arab custom, giving food or drink symbolized protection and mercy. The king drank desperately. Then he handed the cup toward Raynald.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{color: 'var(--cream)', borderColor: 'var(--cream)'}}>
              But Salahuddin immediately spoke: "I did not give him permission to drink."
            </div>

            <p className="editorial-p reveal-up">
              The meaning was terrifying. Mercy had not been extended to Raynald. Then Salahuddin confronted him directly. He reminded him of: broken treaties, attacks on pilgrims, betrayal, and insults against Islam.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/hattin_tent_vow.png" alt="Salahuddin fulfilling his solemn vow inside the royal tent" />
            </div>

            <p className="editorial-p reveal-up">
              Some reports narrate that Salahuddin invited him to accept Islam. Raynald refused arrogantly. And then… after years of rage and promises… Salahuddin struck him down himself. The vow had been fulfilled.
            </p>

            <p className="editorial-p reveal-up">
              Islamic chroniclers describe this moment not as uncontrolled revenge… but as justice against a man whose brutality became infamous even among enemies.
            </p>

            <p className="editorial-p reveal-up" style={{marginTop: '4rem'}}>
              Meanwhile, the King of Jerusalem remained alive. Salahuddin turned to him and said words later repeated across history:
            </p>

            <p className="editorial-p reveal-up" style={{fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3rem', color: 'var(--royal-red)', textAlign: 'center', margin: '4rem 0'}}>
              “Kings do not kill kings.”
            </p>

            <p className="editorial-p reveal-up" style={{textAlign: 'center'}}>
              Even in victory… he distinguished between justice and cruelty. This became one of the defining moments shaping his legendary reputation.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 6: THE BATTLE THAT CHANGED HISTORY */}
      <section className="story-section" style={{paddingBottom: '15rem'}}>
        <div className="story-grid">
          <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
            
            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--royal-red)', margin: '4rem 0'}}>
              The Battle That Changed History
            </h2>
            
            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              By sunset… the Battle of Hattin was over. The Crusader military power in the Holy Land had been shattered. Completely. Entire elite forces were destroyed. Fortresses suddenly stood vulnerable. Cities panicked. Roads toward Jerusalem lay open.
            </p>

            <div className="editorial-image-wrapper reveal-up" style={{margin: '6rem auto', maxWidth: '800px'}}>
              <img className="editorial-image" src="/hattin_victory_looking_quds.png" alt="Salahuddin looking toward Al-Quds after the historic victory" />
            </div>

            <div className="story-divider" style={{margin: '4rem auto'}}></div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              Across the Muslim world, news spread like wildfire. People wept from joy. Masjids filled with prayers. For the first time in generations… Jerusalem no longer felt unreachable.
            </p>

            <div className="editorial-pull-quote reveal-up" style={{border: 'none', padding: 0, margin: '8rem 0', fontSize: '3vw', color: 'var(--royal-red)'}}>
              And somewhere in the silence after battle… Salahuddin stood looking toward the south. Toward Al-Quds.
            </div>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              The city that haunted his childhood. The city Nur ad-Din dreamed of freeing. The city drowned in blood since 1099. Now… the road to Jerusalem was finally open.
            </p>

            <h2 className="editorial-giant-text reveal-up" style={{color: 'var(--coffee-dark)', margin: '6rem 0', fontSize: '4.5rem'}}>
              The Man Who Did Not Celebrate
            </h2>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto'}}>
              What made Salahuddin different from many conquerors was what happened next. He did not lose himself in arrogance. He did not drown in celebrations. Islamic historians describe him remaining serious even after the greatest victory of his life.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', marginTop: '2rem'}}>
              Because he understood something others did not: Hattin was not the end. It was only the door.
            </p>

            <p className="editorial-p reveal-up" style={{maxWidth: '800px', margin: '0 auto', marginTop: '4rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.5rem', color: 'var(--royal-red)'}}>
              The real test still waited ahead. Jerusalem itself. The city every believer’s heart longed for. And now… after nearly ninety years of occupation… Salahuddin was finally marching toward it.
            </p>
            
            <div className="reveal-up" style={{marginTop: '8rem', letterSpacing: '0.4em', fontSize: '1rem', color: 'var(--royal-red)', textTransform: 'uppercase', fontFamily: 'var(--font-sans)'}}>
              End of Part 7
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATION */}
      <StoryFooter currentPartId={7} />
    </article>
  );
}
