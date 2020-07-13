import React from 'react';

export default React.forwardRef((props, sectionsRefs) => {
  return (
    <div className="blocks">
      <div ref={el => sectionsRefs.current[0] = el} className="block1"></div>
      <div ref={el => sectionsRefs.current[1] = el} className="block2"></div>
      <div ref={el => sectionsRefs.current[2] = el} className="block3"></div>
      <div ref={el => sectionsRefs.current[3] = el} className="block4"></div>
      <div ref={el => sectionsRefs.current[4] = el} className="block5"></div>
      <div ref={el => sectionsRefs.current[5] = el} className="block6"></div>
      <div ref={el => sectionsRefs.current[6] = el} className="block7"></div>
      <div ref={el => sectionsRefs.current[7] = el} className="block8"></div>
    </div>
  )
})