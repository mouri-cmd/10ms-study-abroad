import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Award, Users, FileText, ChevronRight } from 'lucide-react';
import './page.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title bn h-display">
              বিদেশে পড়ার স্বপ্ন পূরণের পথ এখান থেকেই শুরু
            </h1>
            <p className="hero-subtitle bn">
              বিশ্বসেরা সব বিশ্ববিদ্যালয় এক্সপ্লোর করো, তুলনা করো এবং ফ্রি গাইডেন্স নাও — দেশের হাজারো শিক্ষার্থীর আস্থার জায়গা
            </p>
            
            <div className="search-box card">
              <Search className="search-icon" size={20} color="var(--fg-2)" />
              <input 
                type="text" 
                className="search-input bn" 
                placeholder="দেশ, বিশ্ববিদ্যালয় বা প্রোগ্রাম খোঁজো..."
              />
              <button className="btn btn-primary search-btn bn">খুঁজুন</button>
            </div>

            <div className="quick-filters bn">
              <span>জনপ্রিয়:</span>
              <span className="badge">UK</span>
              <span className="badge">USA</span>
              <span className="badge">IELTS ছাড়াই</span>
              <span className="badge">স্কলারশিপ</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="globe-container">
              {/* Simplified animated globe/map visual */}
              <div className="globe">
                <div className="pin pin-1"><MapPin size={24} color="var(--premium-gold-2)" fill="var(--premium-gold-2)"/></div>
                <div className="pin pin-2"><MapPin size={24} color="var(--premium-gold-2)" fill="var(--premium-gold-2)"/></div>
                <div className="pin pin-3"><MapPin size={24} color="var(--premium-gold-2)" fill="var(--premium-gold-2)"/></div>
                <div className="globe-orbit"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header flex items-center justify-between">
            <h2 className="bn h1">জনপ্রিয় দেশসমূহ</h2>
            <Link href="/destinations" className="view-all bn">সব দেখো <ChevronRight size={16}/></Link>
          </div>

          <div className="destinations-grid">
            {/* Sample Country Cards */}
            {[
              { name: 'United Kingdom', flag: '🇬🇧', tuition: '£10,000 - £38,000', programs: 'Business, Engineering, Law' },
              { name: 'United States', flag: '🇺🇸', tuition: '$20,000 - $55,000', programs: 'Computer Science, MBA' },
              { name: 'Canada', flag: '🇨🇦', tuition: 'CAD 15,000 - 40,000', programs: 'IT, Nursing, Management' },
              { name: 'Australia', flag: '🇦🇺', tuition: 'AUD 20,000 - 50,000', programs: 'Accounting, Hospitality' }
            ].map((country) => (
              <Link href={`/destinations/${country.name.toLowerCase().replace(' ', '-')}`} key={country.name} className="card destination-card">
                <div className="dest-flag">{country.flag}</div>
                <h3 className="h3">{country.name}</h3>
                <p className="dest-tuition">Tuition: {country.tuition}</p>
                <div className="dest-tags">
                  <span className="meta">{country.programs.split(', ')[0]}</span>
                  <span className="meta">{country.programs.split(', ')[1]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="section">
        <div className="container">
          <div className="quiz-banner card flex items-center justify-between">
            <div className="quiz-content">
              <h2 className="bn h1">কোথা থেকে শুরু করবে বুঝতে পারছো না?</h2>
              <p className="bn">৫ মিনিটের এই কুইজে অংশ নাও এবং তোমার বাজেট, ব্যাকগ্রাউন্ড ও লক্ষ্যের ওপর ভিত্তি করে পারসোনালাইজড সাজেশন পেয়ে যাও।</p>
              <Link href="/quiz" className="btn btn-primary mt-4 bn">কুইজ শুরু করো →</Link>
            </div>
            <div className="quiz-visual">
              <Award size={80} color="var(--premium-gold-2)" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section bg-alt">
        <div className="container">
          <h2 className="text-center mb-12 bn h1">কেন 10MS Study Abroad?</h2>
          
          <div className="trust-grid">
            <div className="trust-card card text-center">
              <Users size={48} color="var(--success)" className="mx-auto mb-4"/>
              <h3 className="bn">৫০০+</h3>
              <p className="bn">শিক্ষার্থীকে স্বপ্নের বিশ্ববিদ্যালয়ে পৌঁছাতে সাহায্য করেছি</p>
            </div>
            <div className="trust-card card text-center">
              <MapPin size={48} color="var(--success)" className="mx-auto mb-4"/>
              <h3 className="bn">২০+</h3>
              <p className="bn">দেশের আপডেট ও তথ্য নিয়ে কাজ করি</p>
            </div>
            <div className="trust-card card text-center">
              <FileText size={48} color="var(--success)" className="mx-auto mb-4"/>
              <h3 className="bn">ফ্রি গাইডেন্স</h3>
              <p className="bn">আমাদের এক্সপার্টরা আছেন প্রতিটি পদক্ষেপে গাইড করতে</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
