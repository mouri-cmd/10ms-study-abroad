import React from 'react';
import Link from 'next/link';
import { LogoFullWhite } from './Logo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link href="/">
            <img 
              src="/logo-dark.png" 
              alt="10 Minute School Study Abroad" 
              className="footer-logo"
              style={{ height: '36px', width: 'auto', display: 'block', marginBottom: '16px' }}
            />
          </Link>
          <p className="footer-desc">
            Your trusted partner in navigating the path to higher education overseas.
          </p>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-col">
            <h3>Support</h3>
            <Link href="/counseling">Book Counseling</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} 10 Minute School. All rights reserved.</p>
      </div>
    </footer>
  );
}
