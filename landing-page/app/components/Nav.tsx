"use client";

import { useEffect, useRef, useState } from "react";

interface NavLink {
  label: string;
  id: string;
}

interface NavProps {
  links: NavLink[];
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Nav({ links, activeSection, onNavClick }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onNavClick(id);
    setMenuOpen(false);
  };

  const activeLabel = links.find((l) => l.id === activeSection)?.label ?? "Menu";

  return (
    <nav className="app-nav fixed top-0 left-0 right-0 z-50 justify-between">
      <div className="text-base font-bold text-[var(--ink)]">
        Au<span className="text-[var(--accent)]">Tuber</span>
      </div>

      {/* Desktop: individual tab buttons */}
      <div className="nav-tabs-desktop flex gap-2">
        {links.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => onNavClick(id)}
            className={`app-nav__tab ${activeSection === id ? "app-nav__tab--active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile: dropdown */}
      <div className="nav-dropdown-mobile" ref={menuRef}>
        <button
          className={`app-nav__tab ${activeSection ? "app-nav__tab--active" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          {activeLabel} ▾
        </button>
        {menuOpen && (
          <div className="nav-dropdown__menu">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={`nav-dropdown__item ${activeSection === id ? "nav-dropdown__item--active" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
