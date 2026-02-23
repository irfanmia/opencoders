"use client";
import { useState } from "react";

export default function UpvoteButton({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);

  const toggle = () => {
    setVoted((v) => !v);
    setCount((c) => (voted ? c - 1 : c + 1));
  };

  return (
    <button
      onClick={toggle}
      className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg border-3 border-black text-black shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${
        voted ? "bg-brutal-lime scale-105" : "bg-white hover:bg-brutal-lime/30"
      }`}
    >
      <span className={`text-lg font-black transition-transform ${voted ? "scale-125" : ""}`}>▲</span>
      <span className="text-xs font-extrabold">{count}</span>
    </button>
  );
}
