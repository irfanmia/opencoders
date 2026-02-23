"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/launchpad", label: "Launchpad", emoji: "🚀" },
  { href: "/explore", label: "Explore", emoji: "🔍" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/15 bg-white">
      <div className="mx-auto flex w-full max-w-[75vw] items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/20 bg-brutal-green shadow-brutal-sm text-xl transition-all group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none text-white">
            🚀
          </div>
          <span className="text-2xl font-black tracking-tight text-black">
            <span className="text-brutal-green">OPEN</span>CODERS
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-black/20 bg-brutal-green-light px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-black shadow-brutal-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none hover:bg-brutal-green-accent hover:text-white"
            >
              {link.emoji} {link.label}
            </Link>
          ))}
          <Link href="/login" className="btn-brutal">
            Sign In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-black/20 bg-white shadow-brutal-sm text-xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-black/15 bg-white px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-lg border border-black/15 bg-brutal-green-light px-4 py-3 font-extrabold uppercase text-sm">
              {link.emoji} {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} className="block rounded-lg border border-black/15 bg-brutal-green-light px-4 py-3 font-extrabold uppercase text-sm">👤 Sign In</Link>
        </div>
      )}
    </nav>
  );
}
