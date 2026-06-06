import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const leftGate = {
  initial: { x: "0%" },
  enter: { 
    x: "-100%", 
    transition: { duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 1.2 } 
  },
  exit: { 
    x: "0%", 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
  }
};

const rightGate = {
  initial: { x: "0%" },
  enter: { 
    x: "100%", 
    transition: { duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 1.2 } 
  },
  exit: { 
    x: "0%", 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
  }
};

const overlayText = {
  initial: { opacity: 1, scale: 1, filter: "blur(0px)" },
  enter: { 
    opacity: 0, scale: 1.05, filter: "blur(10px)", 
    transition: { duration: 1.0, delay: 1.0, ease: "easeInOut" } 
  },
  exit: { 
    opacity: 1, scale: 1, filter: "blur(0px)", 
    transition: { duration: 0.8, delay: 0.4, ease: "easeOut" } 
  }
};

export default function PageTransition({ children }) {
  useLayoutEffect(() => {
    // Force scroll to top before the gates open on the new page
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div>
      {/* Left Temple Gate */}
      <motion.div
        variants={leftGate}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          position: 'fixed', top: 0, left: 0, width: '50vw', height: '100vh',
          backgroundColor: '#110e0c',
          zIndex: 999998,
          borderRight: '1px solid rgba(140, 17, 17, 0.4)'
        }}
      />
      
      {/* Right Temple Gate */}
      <motion.div
        variants={rightGate}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          position: 'fixed', top: 0, right: 0, width: '50vw', height: '100vh',
          backgroundColor: '#110e0c',
          zIndex: 999998,
          borderLeft: '1px solid rgba(140, 17, 17, 0.4)'
        }}
      />
      
      {/* Center Cinematic Title Card */}
      <motion.div
        variants={overlayText}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 999999, display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'
        }}
      >
        <span style={{ 
          fontFamily: 'var(--font-display)', 
          fontStyle: 'italic', 
          fontSize: 'clamp(3rem, 7vw, 7rem)', 
          color: 'var(--cream)', 
          lineHeight: 1,
          letterSpacing: '-0.02em',
          textShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          Chronicle
        </span>
        <span style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: 'clamp(0.6rem, 1vw, 0.85rem)', 
          letterSpacing: '0.6em', 
          color: 'var(--royal-red)', 
          textTransform: 'uppercase', 
          marginTop: '2rem' 
        }}>
          Historical Epic
        </span>
      </motion.div>

      {children}
    </motion.div>
  );
}
