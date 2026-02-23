"use client";
import { useEffect, useState, useRef } from "react";

function parseValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^([\d,]+)\+?$/);
  if (match) {
    return { num: parseInt(match[1].replace(/,/g, ""), 10), suffix: val.includes("+") ? "+" : "" };
  }
  return { num: 0, suffix: val };
}

function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}

export default function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const { num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * num));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref} className={className}>
      {formatNum(display)}{suffix}
    </span>
  );
}
