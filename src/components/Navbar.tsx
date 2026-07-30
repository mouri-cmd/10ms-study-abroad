"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, X, Globe, Moon, Sun } from '@phosphor-icons/react';
import { LogoFull, LogoFullWhite } from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) {
      setLang(saved);
    }
    // The no-flash script in layout.tsx already set data-theme on <html>
    // before paint (falling back to the system preference) — read that
    // back rather than re-deriving it, so the toggle icon matches reality.
    const current = document.documentElement.getAttribute('data-theme');
    if (current) {
      setTheme(current);
    }
  }, []);

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
    window.dispatchEvent(new Event('langChange'));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new Event('themeChange'));
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="logo">
          <img 
            src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} 
            alt="10 Minute School Study Abroad" 
            height={32}
            style={{ height: '32px', width: 'auto', display: 'block' }}
          />
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/destinations" className="nav-link bn">দেশসমূহ</Link>
          <Link href="/compare" className="nav-link bn">তুলনা করো</Link>
          <Link href="/scholarships" className="nav-link bn">স্কলারশিপ</Link>
          <Link href="/programs" className="nav-link bn">প্রোগ্রামসমূহ</Link>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={toggleLang} className="lang-toggle bn">
              <Globe size={18} />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
            <Link href="/counseling" className="btn btn-primary nav-cta bn">
              ফ্রি সেশন বুক করো
            </Link>
          </div>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>
    </header>
  );
}
