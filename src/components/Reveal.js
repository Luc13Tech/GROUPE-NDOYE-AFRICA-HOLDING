import React, { useEffect, useRef, useState } from 'react';

/** Reveal an element when it enters the viewport; it remains visible afterwards. */
export default function Reveal({
  children,
  className = '',
  style = {},
  variant = 'up',
  delay = 0,
  as: Element = 'div',
  ...props
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver !== 'function' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform = {
    up: 'translate3d(0, 20px, 0)',
    down: 'translate3d(0, -20px, 0)',
    left: 'translate3d(-20px, 0, 0)',
    right: 'translate3d(20px, 0, 0)',
    none: 'none',
  }[variant] || 'translate3d(0, 20px, 0)';

  return (
    <Element
      ref={elementRef}
      className={className}
      style={{
        ...style,
        opacity: visible ? (style.opacity ?? 1) : 0,
        transform: visible ? (style.transform ?? 'none') : hiddenTransform,
        transition: `${style.transition ? `${style.transition}, ` : ''}opacity 650ms ease, transform 650ms ease`,
        transitionDelay: `${Math.max(0, Number(delay) || 0)}s`,
      }}
      {...props}
    >
      {children}
    </Element>
  );
}
