import { useEffect, useRef, useState } from 'react';

/**
 * Observe an element entering the viewport.
 * Returns [ref, inView, seen]; `seen` stays true after the first intersection.
 */
export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const threshold = options.threshold ?? 0.1;
  const rootMargin = options.rootMargin ?? '0px';

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver !== 'function' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      setSeen(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setSeen(true);
          if (options.once !== false) observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, options.once]);

  return [ref, inView, seen];
}
