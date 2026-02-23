"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/explore", label: "Explore" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-[75vw] items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-gray-900">
            <span className="text-primary">OPEN</span>CODERS
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="btn-primary text-sm px-5 py-2">
            Sign In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-sm text-gray-700 hover:bg-section">
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} className="block rounded-lg px-4 py-3 font-medium text-sm text-primary">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
