import React from 'react';
import { EnvelopeSimple, Phone, MapPin, Clock } from '@phosphor-icons/react/ssr';
import './contact.css';

export const metadata = {
  title: 'Contact Us | 10 Minute School Study Abroad',
  description: 'Get in touch with the 10 Minute School Study Abroad team for questions about destinations, applications, or counseling.',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have a question about a destination, an application, or your quiz results?
            Reach out and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-list">
            <div className="contact-info-card">
              <span className="contact-info-icon">
                <EnvelopeSimple size={20} weight="fill" />
              </span>
              <div>
                <h3>Email</h3>
                <a href="mailto:support@10minuteschool.com">support@10minuteschool.com</a>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">
                <Phone size={20} weight="fill" />
              </span>
              <div>
                <h3>Phone / WhatsApp</h3>
                <a href="https://wa.me/8801792608084" target="_blank" rel="noreferrer">+880 1792-608084</a>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">
                <MapPin size={20} weight="fill" />
              </span>
              <div>
                <h3>Office</h3>
                <p>10 Minute School, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="contact-info-card">
              <span className="contact-info-icon">
                <Clock size={20} weight="fill" />
              </span>
              <div>
                <h3>Support Hours</h3>
                <p>Saturday–Thursday, 10am–7pm (GMT+6)</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card card">
            <h2>Send us a message</h2>
            <form>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" className="input" placeholder="Your name" required />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" className="input" placeholder="+880..." />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" className="input" placeholder="you@example.com" required />
              </div>

              <div className="contact-form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="input" placeholder="How can we help?" required />
              </div>

              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
