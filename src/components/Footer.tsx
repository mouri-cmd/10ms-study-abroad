import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo"><span>10MS</span> Study Abroad</h2>
          <p className="footer-desc">
            Your trusted partner in navigating the path to higher education overseas.
          </p>
        </div>
        
        <div className="footer-links-grid">
          <div className="footer-col">
            <h3>Destinations </h3>
            <Link href="/destinations/united-kingdom">UK</Link>
            <Link href="/destinations/united-states">USA</Link>
            <Link href="/destinations/canada">Canada</Link>
            <Link href="/destinations/australia">Australia</Link>
          </div>
          
          <div className="footer-col">
            <h3>Resources</h3>
            <Link href="/programs">Explore Programs</Link>
            <Link href="/scholarships">Scholarships</Link>
            <Link href="/compare">Compare Universities</Link>
            <Link href="/quiz">Study Abroad Quiz</Link>
            <Link href="/resources">Blog & Guides</Link>
          </div>
          
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
