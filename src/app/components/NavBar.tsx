"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <nav className="app-navbar">
      <ul className="nav-list">
        <li className={pathname === "/tabs" ? "active" : ""}>
          <Link href="/tabs">Tabs</Link>
        </li>
        <li className={pathname === "/prelab" ? "active" : ""}>
          <Link href="/prelab">Pre-lab Questions</Link>
        </li>
        <li className={pathname === "/escape-room" ? "active" : ""}>
          <Link href="/escape-room">Escape Room</Link>
        </li>
        <li className={pathname === "/coding-races" ? "active" : ""}>
          <Link href="/coding-races">Coding Races</Link>
        </li>
        <li className={pathname === "/about" ? "active" : ""}>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <div className="nav-right">
        {/* Dark mode toggle */}
        <span className="mode-icon">{darkMode ? "🌙" : "🌞"}</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>

        {/* Ellipsis button */}
        <div className="ellipsis-menu-wrapper">
          <button
            className={`ellipsis-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>

          {/* Dropdown menu */}
          <div className={`dropdown ${menuOpen ? "show" : ""}`}>
            <button>Settings</button>
            <button>Help</button>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  