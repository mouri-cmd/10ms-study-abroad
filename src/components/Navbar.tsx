"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, Heart } from 'lucide-react';
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
          <span className="logo-text">10MS</span> Study Abroad
        </Link>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link href="/destinations" className="nav-link bn">দেশসমূহ</Link>
          <Link href="/compare" className="nav-link bn">তুলনা করো</Link>
          <Link href="/scholarships" className="nav-link bn">স্কলারশিপ</Link>
          <Link href="/resources" className="nav-link bn">রিসোর্স</Link>
          
          <div className="nav-actions">
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
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
