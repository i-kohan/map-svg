import React from 'react';

import { SVGPoint } from './';
import {
  mapZoomIn,
  mapZoomOut,
  fadeIn,
  fadeOut,
} from '../utils';

import map from '../images/map.jpg';
import map1 from '../images/map1.jpg';

// const animationHandlers = {
//   fade: () => {
//     const getPointsInBlock = (points, blockClassName) => points.reduce((acc, cur) => cur.blocks.includes(blockClassName) ? [...acc, cur] : acc, []);
//     const getPointsClassNames = (points) => points.reduce((acc, cur) => acc.includes(cur.className) ? acc : [...acc, cur.className], []);

//     const curBlockClassName = i.target.className
//   }
// }

const points = [
  {
    text: '1',
    className: 'points1',
    position: { x: '23%', y: '52%' },
    blocks: ['block1', 'block2'],
  },
  {
    text: '2',
    className: 'points1',
    position: { x: '30%', y: '60%' },
    blocks: ['block1', 'block2'],
  },
  {
    text: '3',
    className: 'points2',
    position: { x: '15%', y: '40%' },
    blocks: ['block2'],
  },
  {
    text: '4',
    className: 'points2',
    position: { x: '70%', y: '50%' },
    blocks: ['block2'],
  },
  {
    text: '5',
    className: 'points3',
    position: { x: '75%', y: '20%' },
    blocks: ['block3'],
  },
  {
    text: '6',
    className: 'points3',
    position: { x: '40%', y: '65%' },
    blocks: ['block3'],
  },
  {
    text: '9',
    className: 'points5',
    position: { x: '35%', y: '10%' },
    blocks: ['block5'],
  },
  {
    text: '10',
    className: 'points5',
    position: { x: '80%', y: '55%' },
    blocks: ['block5'],
  },
];

export default ({ intersection }) => {
  const [prevBlockClassName, setPrevBlockClassName] = React.useState(null);

  React.useEffect(() => {
    intersection && intersection.map(i => { 
      if (i.intersectionRatio > 0.5) {
        const getPointsInBlock = (points, blockClassName) => points.reduce((acc, cur) => cur.blocks.includes(blockClassName) ? [...acc, cur] : acc, []);
        const getPointsClassNames = (points) => points.reduce((acc, cur) => acc.includes(cur.className) ? acc : [...acc, cur.className], [])

        const curBlockClassName = i.target.className

        if (curBlockClassName === 'block4') {
          mapZoomIn('.map1');
        }

        if (prevBlockClassName === 'block4' && curBlockClassName !== 'block4') { // Intersection Observer triggered twice
          mapZoomOut('.map1');
        }

        const prevBlockPoints = getPointsInBlock(points, prevBlockClassName);
        const curBlockPoints = getPointsInBlock(points, curBlockClassName);

        const fadeOutPoints = prevBlockPoints.filter(p => !p.blocks.includes(curBlockClassName));
        const fadeInPoints = curBlockPoints.filter(p => !p.blocks.includes(prevBlockClassName));

        if (fadeOutPoints.length) {
          const pointsClassNames = getPointsClassNames(fadeOutPoints);
          fadeOut(pointsClassNames.map(i => `.${i}`).join(', '));
        }

        if (fadeInPoints.length) {
          const pointsClassNames = getPointsClassNames(fadeInPoints);
          fadeIn(pointsClassNames.map(i => `.${i}`).join(', '));
        }

        setPrevBlockClassName(curBlockClassName);
      }
  
      return undefined;
    })
  }, [intersection, prevBlockClassName])  

  return (
    <div className="map">
      <img src={map} className="map-image" alt="logo" />
      <img src={map1} className="map-image map1" alt="zoomed map" />
      {points.map(({ position, className, text }) => (
        <SVGPoint key={`${position.x},${position.y}`} position={position} className={className} text={text} />
      ))}
    </div>
  )
}
