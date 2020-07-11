import React from 'react';
import gsap from 'gsap';

import { SVGPoint } from './';

import map from '../map.png';

const points = [
  {
    className: 'points1',
    position: { x: '50%', y: '55%' },
    blocks: ['block1', 'block2'],
  },
  {
    className: 'points1',
    position: { x: '35%', y: '30%' },
    blocks: ['block1', 'block2'],
  },
  {
    className: 'points2',
    position: { x: '15%', y: '40%' },
    blocks: ['block2'],
  },
  {
    className: 'points2',
    position: { x: '70%', y: '50%' },
    blocks: ['block2'],
  },
  {
    className: 'points3',
    position: { x: '75%', y: '20%' },
    blocks: ['block3'],
  },
  {
    className: 'points3',
    position: { x: '40%', y: '65%' },
    blocks: ['block3'],
  },
  {
    className: 'points4',
    position: { x: '15%', y: '30%' },
    blocks: ['block4'],
  },
  {
    className: 'points4',
    position: { x: '10%', y: '50%' },
    blocks: ['block4'],
  },
  {
    className: 'points5',
    position: { x: '35%', y: '10%' },
    blocks: ['block5'],
  },
  {
    className: 'points5',
    position: { x: '80%', y: '55%' },
    blocks: ['block5'],
  },
];

export default ({ intersection }) => {
  const [prevBlockClassName, setPrevBlockClassName] = React.useState(null);

  const zoomIn = element => {
    gsap.to(element, 0.5, {
      scale: 1.5,
    });
  }

  const zoomOut = element => {
    gsap.to(element, 0.5, {
      scale: 1,
    });
  }


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

  React.useEffect(() => {
    intersection && intersection.map(i => { 
      if (i.intersectionRatio > 0.5) {
        if (i.target.className === 'block4') {
          zoomIn('.map-image');
        }

        debugger

        if (prevBlockClassName === 'block4' && i.target.className !== 'block4') { // Intersection Observer triggered twice
          zoomOut('.map-image');
        }

        const pointsInPrevBlock = points.reduce((acc, cur) => cur.blocks.includes(prevBlockClassName) ? [...acc, cur] : acc, []);
        const pointsInCurrentBlock = points.reduce((acc, cur) => cur.blocks.includes(i.target.className) ? [...acc, cur] : acc, []);

        if (pointsInPrevBlock.length) {
          const pointsClassNames = pointsInPrevBlock.reduce((acc, cur) => acc.includes(cur.className) ? acc : [...acc, cur.className], []);
          pointsClassNames.forEach(className => fadeOut(`.${className}`));
        }

        if (pointsInCurrentBlock.length) {
          const pointsClassNames = pointsInCurrentBlock.reduce((acc, cur) => acc.includes(cur.className) ? acc : [...acc, cur.className], []);
          pointsClassNames.forEach(className => fadeIn(`.${className}`));
        }

        setPrevBlockClassName(i.target.className);
      }
  
      return undefined;
    })
  }, [intersection, prevBlockClassName])  

  return (
    <div className="map">
      <img src={map} className="map-image" alt="logo" />
      {points.map(({ position, className }) => (
        <SVGPoint key={`${position.x},${position.y}`} position={position} className={className} />
      ))}
    </div>
  )
}
