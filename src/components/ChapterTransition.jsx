import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const quotes = {
  '1': "The fall before the rise.",
  '2': "A child born in the shadow of exile.",
  '3': "The quiet scholar enters the storm.",
  '4': "The throne that trembled.",
  '5': "When the shield of the Ummah fell.",
  '6': "The promise of revenge.",
  '7': "The day the desert burned.",
  '8': "The day Al-Quds returned.",
  '9': "When kings went to war.",
  '10': "When death silenced the sword.",
  '11': "When a man becomes larger than history.",
  '12': "When an echo becomes eternal.",
  'the-battle-of-hattin': "The day the desert burned.",
  'the-return-to-jerusalem': "The day Al-Quds returned.",
  'the-lionheart-and-the-sultan': "When kings went to war.",
  'the-final-days-of-salahuddin': "When death silenced the sword.",
  'the-legacy-of-salahuddin': "When a man becomes larger than history.",
  'the-eternal-echo-of-salahuddin': "When an echo becomes eternal."
};

const getQuote = (id) => quotes[id] || "The pages of history turn.";

const blackScreen = {
  initial: { opacity: 1 },
  animate: { 
    opacity: 0,
    transition: { duration: 1.5, ease: "easeInOut", delay: 4.0 }
  },
  exit: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" } 
  }
};

const quoteAnim = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: [0, 1, 1, 0],
    scale: [0.95, 1, 1.02, 1.05],
    transition: { 
      duration: 4.5, 
      times: [0, 0.2, 0.8, 1], 
      ease: "easeInOut",
      delay: 0.5 
    }
  },
  exit: { opacity: 0, transition: { duration: 0 } }
};

const contentAnim = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { duration: 0.6, ease: "easeIn" } 
  }
};

export default function ChapterTransition({ children, currentId }) {
  useLayoutEffect(() => {
    // Only scroll to top when the new page is mounting and the screen is pitch black
    window.scrollTo(0, 0);
  }, []);

  const getPartNumber = (id) => {
    if (id === 'the-battle-of-hattin') return '7';
    if (id === 'the-return-to-jerusalem') return '8';
    if (id === 'the-lionheart-and-the-sultan') return '9';
    if (id === 'the-final-days-of-salahuddin') return '10';
    if (id === 'the-legacy-of-salahuddin') return '11';
    if (id === 'the-eternal-echo-of-salahuddin') return '12';
    return id;
  };

  return (
    <>
      {/* The Cinematic Content Fade */}
      <motion.div
        variants={contentAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>

      {/* The Pitch Black Void Overlay */}
      <motion.div
        variants={blackScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: '#0a0807', // Deepest black/brown
          zIndex: 999998,
          pointerEvents: 'none'
        }}
      />

      {/* The Interlude Quote */}
      <motion.div
        variants={quoteAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 999999, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none',
          padding: '0 10vw', textAlign: 'center'
        }}
      >
        <span style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', 
          letterSpacing: '0.4em', 
          color: 'var(--royal-red)', 
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Part {getPartNumber(currentId)}
        </span>
        <span style={{ 
          fontFamily: 'var(--font-display)', 
          fontStyle: 'italic', 
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
          color: 'var(--cream)',
          lineHeight: 1.2,
          maxWidth: '800px'
        }}>
          "{getQuote(currentId)}"
        </span>
      </motion.div>
    </>
  );
}
