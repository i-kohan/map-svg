import { useEffect, useState } from 'react';

const useIntersection = (ref, options) => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = useState(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === 'function') {
        const handler = (entries) => {
          setIntersectionObserverEntry(entries);
        };

        const observer = new IntersectionObserver(handler, options);

        if (Array.isArray(ref.current)) {
          for (let i of ref.current) {
            observer.observe(i);
          }
        } else {
          observer.observe(ref.current);
        }

        return () => {
          setIntersectionObserverEntry(null);
          observer.disconnect();
        };
    }

    return () => {};
  }, [ref]);

  return intersectionObserverEntry;
};

export default useIntersection;
