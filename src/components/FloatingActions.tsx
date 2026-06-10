"use client";

import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import './FloatingActions.css';

export default function FloatingActions() {
  return (
    <>
      <div className="mobile-sticky-cta">
        <Link href="/counseling" className="btn btn-primary w-full shadow-lg">
          Book a Free Counseling Session
        </Link>
      </div>

      <a
        href="https://wa.me/message/xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}
