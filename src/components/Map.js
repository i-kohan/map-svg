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
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';

const animationHandlers = {
  mapZoomIn: (obj) => {
    mapZoomIn(`.${obj.className}`);
  },
  mapZoomOut: (obj) => {
    mapZoomOut(`.${obj.className}`);
  },
  fadeIn: (obj) => {
    fadeIn(`.${obj.className}`);
  },
  fadeOut: (obj) => {
    fadeOut(`.${obj.className}`);
  }
}

const maps = [
  {
    className: 'map-image',
    blocks: ['block1', 'block2', 'block3', 'block4', 'block5'],
    src: map,
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    className: 'map1',
    blocks: ['block4'],
    src: map1,
    inAnimation: 'mapZoomIn',
    outAnimation: 'mapZoomOut',
  },
  {
    className: 'image1',
    blocks: ['block6', 'block7', 'block8'],
    src: image1,
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    className: 'image2',
    blocks: ['block7'],
    src: image2,
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    className: 'image3',
    blocks: ['block8'],
    src: image3,
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
];

const points = [
  {
    text: '1',
    className: 'points1',
    position: { x: '23%', y: '52%' },
    blocks: ['block1', 'block2'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '2',
    className: 'points1',
    position: { x: '30%', y: '60%' },
    blocks: ['block1', 'block2'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '3',
    className: 'points2',
    position: { x: '15%', y: '40%' },
    blocks: ['block2'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '4',
    className: 'points2',
    position: { x: '70%', y: '50%' },
    blocks: ['block2'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '5',
    className: 'points3',
    position: { x: '75%', y: '20%' },
    blocks: ['block3'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '6',
    className: 'points3',
    position: { x: '40%', y: '65%' },
    blocks: ['block3'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '9',
    className: 'points5',
    position: { x: '35%', y: '10%' },
    blocks: ['block5'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
  {
    text: '10',
    className: 'points5',
    position: { x: '80%', y: '55%' },
    blocks: ['block5'],
    inAnimation: 'fadeIn',
    outAnimation: 'fadeOut',
  },
];

export default ({ intersection }) => {
  const [prevBlockClassName, setPrevBlockClassName] = React.useState(null);

  React.useEffect(() => {
    intersection && intersection.map(i => { 
      if (i.intersectionRatio > 0.5) {
        const getAnimationObjectsInBlock = (objects, blockClassName) => objects.reduce((acc, cur) => cur.blocks.includes(blockClassName) ? [...acc, cur] : acc, []);

        const curBlockClassName = i.target.className

        const prevBlockAnimationObjects = getAnimationObjectsInBlock([...maps, ...points], prevBlockClassName);
        const curBlockAnimationObjects = getAnimationObjectsInBlock([...maps, ...points], curBlockClassName);

        const fadeOutAnimationObjects = prevBlockAnimationObjects.filter(p => !p.blocks.includes(curBlockClassName));
        const fadeInAnimationObjects = curBlockAnimationObjects.filter(p => !p.blocks.includes(prevBlockClassName));

        debugger

        fadeOutAnimationObjects.map(obj => animationHandlers[obj.outAnimation](obj));
        fadeInAnimationObjects.map(obj => animationHandlers[obj.inAnimation](obj));

        setPrevBlockClassName(curBlockClassName);
      }
  
      return undefined;
    })
  }, [intersection, prevBlockClassName])  

  return (
    <div className="map">
      {/* <img src={map} className="map-image" alt="logo" /> */}
      {maps.map(({ src, className }) => (
        <img key={src} src={src} className={`${className} map-images`} />
      ))}
      {points.map(({ position, className, text }) => (
        <SVGPoint key={`${position.x},${position.y}`} position={position} className={className} text={text} />
      ))}
    </div>
  )
}
