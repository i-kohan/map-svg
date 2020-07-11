import React from 'react';

export default ({
  className,
  positions,
}) => {
  return positions.map(({ x, y }) => (
    <svg className={className} height="100%" width="100%">
      <circle cx={x} cy={y} r="10" stroke="black" strokeWidth="3" fill="red" />
    </svg>
  ))
}
