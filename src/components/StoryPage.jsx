import React from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterTransition from './ChapterTransition';
import Part1 from './parts/Part1';
import Part2 from './parts/Part2';
import Part3 from './parts/Part3';
import Part4 from './parts/Part4';
import Part5 from './parts/Part5';
import Part6 from './parts/Part6';
import Part7 from './parts/Part7';
import Part8 from './parts/Part8';
import Part9 from './parts/Part9';
import Part10 from './parts/Part10';
import Part11 from './parts/Part11';
import Part12 from './parts/Part12';

export default function StoryPage() {
  const { id } = useParams();

  const renderPart = () => {
    if (id === 'the-eternal-echo-of-salahuddin' || id === '12') return <Part12 />;
    if (id === 'the-legacy-of-salahuddin' || id === '11') return <Part11 />;
    if (id === 'the-final-days-of-salahuddin' || id === '10') return <Part10 />;
    if (id === 'the-lionheart-and-the-sultan' || id === '9') return <Part9 />;
    if (id === 'the-return-to-jerusalem' || id === '8') return <Part8 />;
    if (id === 'the-battle-of-hattin' || id === '7') return <Part7 />;
    if (id === 'the-sword-turns-toward-jerusalem' || id === '6') return <Part6 />;
    if (id === 'the-death-of-nur-ad-din' || id === '5') return <Part5 />;
    if (id === 'the-fall-of-the-fatimids' || id === '4') return <Part4 />;
    if (id === 'the-road-to-egypt' || id === '3') return <Part3 />;
    if (id === 'the-child-born-in-exile' || id === '2') return <Part2 />;
    return <Part1 />;
  };

  return (
    <div style={{ backgroundColor: '#110e0c', minHeight: '100vh' }}>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={id}>
          <ChapterTransition currentId={id}>
            {renderPart()}
          </ChapterTransition>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
