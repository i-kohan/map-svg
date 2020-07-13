import React from 'react';

export default ({
  className,
  position: { x, y },
  text,
}) => {
  return (
    <svg className={className} height="100%" width="100%">
      <circle cx={x} cy={y} r="15" fill="#2B5CAB"/>
      <text x={x} y={y} textAnchor="middle" fill="white" dy=".3em">{text}</text>
    </svg>
  )
}
