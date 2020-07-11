import React, { useRef } from 'react';

import { Map, Blocks } from './components';
import { useIntersection } from './hooks';

import './App.css';

function App() {
  const sectionsRefs = useRef([]);

  const intersection = useIntersection(sectionsRefs, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  return (
    <div className="wrapper">
      <Map intersection={intersection} />
      <Blocks ref={sectionsRefs} />
    </div>
  );
}

export default App;
