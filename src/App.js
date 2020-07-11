import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

import { useIntersection } from './hooks';
import { SVGPoints } from './components';

import map from './map.png';
import './App.css';

const points = {
  block1: {
    className: 'points1',
    positions: [{ x: '50%', y: '55%' }, { x: '35%', y: '30%' }],
    fadeOutBlock: 'block3',
  },
  block2: {
    className: 'points2',
    positions: [{ x: '70%', y: '50%' }, { x: '15%', y: '40%' }],
  },
  block3: {
    className: 'points3',
    positions: [{ x: '40%', y: '65%' }, { x: '75%', y: '20%' }],
  },
  block4: {
    className: 'points4',
    positions: [{ x: '10%', y: '50%' }, { x: '15%', y: '30%' }],
  },
  block5: {
    className: 'points5',
    positions: [{ x: '80%', y: '55%' }, { x: '35%', y: '10%' }],
  },
}

function App() {
  const sectionsRefs = useRef([]);
  const [currentPointsClassName, setCurrentPointsClassName] = useState(null);

  const intersection = useIntersection(sectionsRefs, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  const fadeIn = element => {
    gsap.to(element, 1, {
      opacity: 1,
      ease: "power4.out",
    });
  };

  const fadeOut = element => {
    gsap.to(element, 1, {
      opacity: 0,
      ease: "power4.out"
    });
  };

  useEffect(() => {
    intersection && intersection.map(i => {
      const point = points[i.target.className];
  
      if (i.intersectionRatio > 0.5 && point) {
        fadeOut(`.${currentPointsClassName}`);

        setCurrentPointsClassName(point.className);

        fadeIn(`.${point.className}`)
      }
  
      return undefined;
    })
  }, [intersection, currentPointsClassName])  

  return (
    <div className="wrapper">
      <div className="map">
        <img src={map} className="map-image" alt="logo" />
        {Object.values(points).map(({ positions, className }) => (
          <SVGPoints key={className} positions={positions} className={className} />
        ))}
      </div>
      <div className="blocks">
        <div ref={el => sectionsRefs.current[0] = el} className="block1"></div>
        <div ref={el => sectionsRefs.current[1] = el} className="block2"></div>
        <div ref={el => sectionsRefs.current[2] = el} className="block3"></div>
        <div ref={el => sectionsRefs.current[3] = el} className="block4"></div>
        <div ref={el => sectionsRefs.current[4] = el} className="block5"></div>
      </div>
    </div>
  );
}

export default App;
