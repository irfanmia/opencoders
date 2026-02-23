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
      className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg border transition-colors ${
        voted ? "bg-primary text-white border-primary" : "bg-white border-gray-200 text-gray-700 hover:bg-primary-light hover:border-primary"
      }`}
    >
      <span className={`text-lg font-bold transition-transform ${voted ? "scale-110" : ""}`}>▲</span>
      <span className="text-xs font-semibold">{count}</span>
    </button>
  );
}
