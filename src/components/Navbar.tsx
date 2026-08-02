"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, X, Globe } from '@phosphor-icons/react';
import { LogoFull, LogoFullWhite } from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
    localStorage.setItem('lang', nextLang);
    window.dispatchEvent(new Event('langChange'));
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="logo">
          <img
            src="/logo.png"
            alt="10 Minute School Study Abroad"
            height={32}
            style={{ height: '32px', width: 'auto', display: 'block' }}
          />
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/destinations" className="nav-link bn">দেশসমূহ</Link>

          <div className="nav-actions">
            <button onClick={toggleLang} className="lang-toggle bn">
              <Globe size={18} />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
            <Link href="/quiz" className="btn btn-primary nav-cta bn">
              আমার জন্য কোন দেশ, দেখে নিন
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
