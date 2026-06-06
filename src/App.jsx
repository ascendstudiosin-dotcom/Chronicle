import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stories from './components/Stories';
import Footer from './components/Footer';
import StoryPage from './components/StoryPage';
import Archive from './components/Archive';
import PageTransition from './components/PageTransition';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Stories />
    </>
  );
}

function App() {
  const location = useLocation();
  const lenisRef = React.useRef(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
  
  const handleExitComplete = () => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  const getRouteKey = (pathname) => {
    if (pathname.startsWith('/story/')) return 'story-page';
    return pathname;
  };

  return (
    <main className="app-container">
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <Routes key={getRouteKey(location.pathname)} location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/archive" element={<PageTransition><Archive /></PageTransition>} />
          <Route path="/story/:id" element={<PageTransition><StoryPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      
      <Footer />
    </main>
  );
}

export default App;
