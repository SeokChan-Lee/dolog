import { useEffect, useRef } from "react";

export function useIntersectionObserver(callback: () => void) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [callback]);

  return targetRef;
}
