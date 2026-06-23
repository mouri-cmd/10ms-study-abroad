"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Award, Users, FileText, ChevronRight, CheckCircle, Globe, MessageSquare } from 'lucide-react';
import { destinations } from '../data/destinations';
import './page.css';

// Coordinates for the interactive map pins matching dest.id in destinations.ts
const mapPins: Record<string, { x: number; y: number; label: string; enLabel: string }> = {
  'canada': { x: 180, y: 110, label: 'কানাডা', enLabel: 'Canada' },
  'usa': { x: 210, y: 160, label: 'ইউএসএ', enLabel: 'USA' },
  'uk': { x: 470, y: 125, label: 'ইউকে', enLabel: 'UK' },
  'germany': { x: 505, y: 135, label: 'জার্মানি', enLabel: 'Germany' },
  'sweden': { x: 515, y: 95, label: 'সুইডেন', enLabel: 'Sweden' },
  'ireland': { x: 445, y: 125, label: 'আয়ারল্যান্ড', enLabel: 'Ireland' },
  'malaysia': { x: 725, y: 265, label: 'মালয়েশিয়া', enLabel: 'Malaysia' },
  'japan': { x: 805, y: 165, label: 'জাপান', enLabel: 'Japan' },
  'australia': { x: 810, y: 350, label: 'অস্ট্রেলিয়া', enLabel: 'Australia' },
  'newzealand': { x: 885, y: 395, label: 'নিউজিল্যান্ড', enLabel: 'New Zealand' },
};

interface InteractiveMapSectionProps {
  destinations: any[];
  lang: string;
}

function InteractiveMapSection({ destinations, lang }: InteractiveMapSectionProps) {
  // Filter destinations to only those mapped in mapPins
  const validDestinations = destinations.filter(dest => mapPins[dest.id]);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeDest = validDestinations[activeIdx] || validDestinations[0];
  const activeKey = activeDest ? activeDest.id : 'usa';
  const activePin = mapPins[activeKey];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % validDestinations.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + validDestinations.length) % validDestinations.length);
  };

  const t = {
    bn: {
      mapHeading: "একটাই পথ, ",
      mapHeadingHighlight: "একাধিক গন্তব্য",
      mapSubheading: "10 Minute School-এর গাইডেন্স নিয়ে শুরু করো বাংলাদেশ থেকে, পছন্দের দেশ ও বিশ্ববিদ্যালয় বেছে নিয়ে নিশ্চিন্তে পড়তে যাও বিদেশে।",
      mercator: "Mercator projection ব্যবহার করে দেখানো হয়েছে।",
      topChoice: "জনপ্রিয়",
      countryGuide: "কান্ট্রি গাইড",
      explore: "এক্সপ্লোর",
      popularSubjects: "জনপ্রিয় বিষয়",
      workPermit: "ওয়ার্ক পারমিট",
    },
    en: {
      mapHeading: "One path, ",
      mapHeadingHighlight: "multiple destinations",
      mapSubheading: "Start from Bangladesh with 10 Minute School's guidance, select your preferred country and university, and study abroad with confidence.",
      mercator: "Displayed using Mercator projection.",
      topChoice: "Top Choice",
      countryGuide: "Country Guide",
      explore: "Explore",
      popularSubjects: "Popular Subjects",
      workPermit: "Work Permit",
    }
  };

  const currentTranslations = lang === 'bn' ? t.bn : t.en;

  // Origin point: Bangladesh
  const origin = { x: 685, y: 235 };

  return (
    <section className="map-section">
      <div className="container">
        <div className="map-section-heading">
          <h2 className="bn">
            {currentTranslations.mapHeading}
            <span>{currentTranslations.mapHeadingHighlight}</span>
          </h2>
          <p className="bn">{currentTranslations.mapSubheading}</p>
        </div>

        <div className="map-grid-container">
          {/* Left Column: World Map */}
          <div className="map-left-col">
            <div className="svg-map-wrapper">
              <svg viewBox="0 0 1000 450" className="world-map-svg">
                {/* Abstract Stylized World Continents */}
                {/* Greenland */}
                <path d="M 260,40 C 290,40 310,50 300,70 C 280,85 250,80 230,70 C 225,65 240,45 260,40 Z" className="map-landmass" />
                {/* North America */}
                <path d="M 120,80 C 140,80 180,70 240,80 C 260,90 280,100 290,120 C 260,130 250,150 220,160 C 200,165 190,180 180,200 C 170,220 150,225 140,210 C 130,190 120,185 110,180 C 100,170 95,150 90,130 C 90,110 100,90 120,80 Z" className="map-landmass" />
                {/* South America */}
                <path d="M 210,215 C 230,220 250,240 255,260 C 260,285 240,320 220,360 C 210,380 200,410 190,430 C 185,440 180,440 175,430 C 170,410 170,390 172,360 C 175,320 170,290 165,270 C 160,250 165,240 175,230 C 190,220 200,215 210,215 Z" className="map-landmass" />
                {/* Eurasia */}
                <path d="M 350,120 C 370,100 420,80 480,85 C 530,90 580,75 640,80 C 700,85 750,70 820,80 C 860,90 890,100 910,120 C 920,140 910,165 890,180 C 870,195 860,215 870,230 C 850,240 820,250 780,245 C 750,255 720,270 700,265 C 690,260 680,255 675,250 C 650,250 635,270 610,275 C 570,270 540,250 520,240 C 490,235 470,240 450,250 C 430,240 410,220 395,215 C 380,210 375,200 375,190 C 375,170 360,150 350,120 Z" className="map-landmass" />
                {/* Africa */}
                <path d="M 435,225 C 455,220 480,230 500,240 C 520,250 540,270 550,290 C 560,320 540,360 520,390 C 500,410 490,420 485,415 C 475,400 470,370 468,340 C 465,310 450,290 435,280 C 420,270 415,255 425,240 C 430,230 432,225 435,225 Z" className="map-landmass" />
                {/* Australia */}
                <path d="M 760,340 C 790,335 830,340 850,350 C 870,370 860,400 840,420 C 810,430 780,415 765,395 C 750,375 750,350 760,340 Z" className="map-landmass" />

                {/* Curved Connection Lines */}
                {validDestinations.map((dest, idx) => {
                  const pin = mapPins[dest.id];
                  if (!pin) return null;

                  const isActive = idx === activeIdx;
                  const controlX = (origin.x + pin.x) / 2;
                  const controlY = Math.min(origin.y, pin.y) - 50;

                  return (
                    <path
                      key={`line-${dest.id}`}
                      d={`M ${origin.x} ${origin.y} Q ${controlX} ${controlY} ${pin.x} ${pin.y}`}
                      className={`map-curve-line ${isActive ? 'active' : ''}`}
                    />
                  );
                })}

                {/* Bangladesh Origin Pin */}
                <circle cx={origin.x} cy={origin.y} r={10} className="map-origin-ring" />
                <circle cx={origin.x} cy={origin.y} r={5} className="map-origin-pin" />

                {/* Destination Pins */}
                {validDestinations.map((dest, idx) => {
                  const pin = mapPins[dest.id];
                  if (!pin) return null;

                  const isActive = idx === activeIdx;

                  return (
                    <g
                      key={`pin-${dest.id}`}
                      onClick={() => setActiveIdx(idx)}
                      className={`map-dest-pin ${isActive ? 'active' : ''}`}
                    >
                      {isActive && (
                        <circle cx={pin.x} cy={pin.y} r={14} fill="none" stroke="var(--success)" strokeWidth={1} strokeDasharray="2 2" />
                      )}
                      <circle cx={pin.x} cy={pin.y} r={isActive ? 8 : 6} className="map-dest-pin-circle" />
                      {isActive && (
                        <polygon
                          points={`${pin.x},${pin.y - 3} ${pin.x + 1},${pin.y - 1} ${pin.x + 3},${pin.y - 1} ${pin.x + 1.5},${pin.y + 0.5} ${pin.x + 2},${pin.y + 3} ${pin.x},${pin.y + 1.5} ${pin.x - 2},${pin.y + 3} ${pin.x - 1.5},${pin.y + 0.5} ${pin.x - 3},${pin.y - 1} ${pin.x - 1},${pin.y - 1}`}
                          fill="var(--ten-white)"
                        />
                      )}
                      <text x={pin.x} y={pin.y - 12} textAnchor="middle" fill="var(--fg-1)" fontSize="10px" fontWeight="600" className="bn" style={{ pointerEvents: 'none' }}>
                        {lang === 'bn' ? pin.label : pin.enLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <span className="map-caption">{currentTranslations.mercator}</span>
          </div>

          {/* Right Column: Country Card */}
          <div className="map-right-col">
            {activeDest && (
              <div className="country-card-container">
                <div className="country-map-card">
                  <div className="country-card-image-box">
                    <img
                      src={activeDest.hero_image}
                      alt={activeDest.name}
                      className="country-card-img"
                    />
                    {(activeDest.id === 'uk' || activeDest.id === 'usa') && (
                      <span className="country-card-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        {currentTranslations.topChoice}
                      </span>
                    )}
                  </div>

                  <div className="country-card-info-box">
                    <div className="country-card-title-row">
                      <h3 className="bn">{activeDest.name}</h3>
                      <span className="country-card-flag-emoji">{activeDest.flag_emoji}</span>
                    </div>

                    <div className="country-card-detail-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1z"/><path d="M21.5 12v6"/></svg>
                      <div className="country-card-detail-text">
                        <strong>{currentTranslations.popularSubjects}: </strong>
                        {activeDest.popular_subjects.slice(0, 3).join(', ')}
                      </div>
                    </div>

                    <div className="country-card-detail-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2z"/><path d="M7 6h10"/></svg>
                      <div className="country-card-detail-text">
                        <strong>{currentTranslations.workPermit}: </strong>
                        {activeDest.workPermitStr}
                      </div>
                    </div>

                    <div className="country-card-buttons-row">
                      <button className="country-card-btn-outline bn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        {currentTranslations.countryGuide}
                      </button>
                      <Link href={`/destinations/${activeDest.slug}`} className="country-card-btn-filled bn">
                        {currentTranslations.explore}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="carousel-controls-row">
                  <button className="carousel-arrow-btn" onClick={handlePrev}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  </button>

                  <div className="carousel-progress-wrapper">
                    <div
                      className="carousel-progress-bar"
                      style={{ width: `${((activeIdx + 1) / validDestinations.length) * 100}%` }}
                    />
                  </div>

                  <button className="carousel-arrow-btn" onClick={handleNext}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState('en');

  // Initialize lang from localStorage and listen to language toggles
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved);

    const handleLangChange = () => {
      const updated = localStorage.getItem('lang');
      if (updated) setLang(updated);
    };

    window.addEventListener('langChange', handleLangChange);
    return () => {
      window.removeEventListener('langChange', handleLangChange);
    };
  }, []);

  // Extract existing testimonials from the codebase
  const homeTestimonials = destinations
    .flatMap((dest) =>
      dest.testimonials.map((test) => ({
        ...test,
        countryName: dest.name,
        countryFlag: dest.flag_emoji,
      }))
    )
    .slice(0, 3);

  return (
    <div className="home">
      {/* 1. Hero Section (Split layout inspired by upGrad) */}
      <section className="hero-split-section">
        <div className="container hero-split-container">
          <div className="hero-split-left">
            <h1 className="hero-split-title bn">
              তোমার পথ, তোমার গন্তব্য
            </h1>
            <p className="hero-split-subtitle">
              Our path, your destination — trusted study abroad guidance from 10 Minute School
            </p>
            <Link href="/counseling" className="btn btn-primary btn-pulse bn hero-split-cta">
              ফ্রি কাউন্সেলিং বুক করো
            </Link>
          </div>
          <div className="hero-split-right">
            <div className="hero-image-wrapper">
              <img 
                src="/images/study_abroad_hero.png" 
                alt="Student at University Campus" 
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Box Card */}
      <div className="hero-search-wrapper container">
        <div className="search-card card">
          <div className="search-box-inner">
            <Search className="search-icon" size={20} color="var(--fg-2)" />
            <input 
              type="text" 
              className="search-input bn" 
              placeholder="দেশ, বিশ্ববিদ্যালয় বা প্রোগ্রাম খোঁজো..."
            />
            <button className="btn btn-primary search-btn bn">খুঁজুন</button>
          </div>
          
          <div className="quick-filters bn">
            <span className="filters-label">জনপ্রিয়:</span>
            <Link href="/destinations/united-kingdom" className="badge">UK</Link>
            <Link href="/destinations/united-states" className="badge">USA</Link>
            <span className="badge">IELTS ছাড়াই</span>
            <Link href="/scholarships" className="badge">স্কলারশিপ</Link>
          </div>
        </div>
      </div>

      {/* Thin Stats Strip directly below Hero/Search */}
      <section className="stats-strip-section">
        <div className="container">
          <div className="stats-strip-grid">
            <div className="stats-strip-item">
              <span className="stats-number bn">৫০০+</span>
              <span className="stats-label bn">সফল শিক্ষার্থী</span>
            </div>
            <div className="stats-strip-item">
              <span className="stats-number bn">২০+</span>
              <span className="stats-label bn">গন্তব্য দেশ</span>
            </div>
            <div className="stats-strip-item">
              <span className="stats-number bn">১৬০+</span>
              <span className="stats-label bn">বিশ্ববিদ্যালয়</span>
            </div>
            <div className="stats-strip-item">
              <span className="stats-number bn">১০০%</span>
              <span className="stats-label bn">ফ্রি সেশন</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive World Map Section (NEW) */}
      <InteractiveMapSection destinations={destinations} lang={lang} />

      {/* 2. "THE SMARTEST WAY TO STUDY ABROAD" SECTION */}
      <section className="smart-way-section">
        <div className="container">
          <h2 className="section-title bn">কেন 10 Minute School Study Abroad?</h2>
          
          <div className="features-minimal-grid">
            <div className="feature-minimal-item">
              <div className="feature-icon-box">
                <FileText size={28} />
              </div>
              <h3 className="feature-title bn">ফ্রি কাউন্সেলিং</h3>
              <p className="feature-desc bn">সম্পূর্ণ বিনামূল্যে ওয়ান-অন-ওয়ান গাইডেন্স সেশন বুক করুন।</p>
            </div>
            
            <div className="feature-minimal-item">
              <div className="feature-icon-box">
                <Globe size={28} />
              </div>
              <h3 className="feature-title bn">Bilingual Support</h3>
              <p className="feature-desc bn">বাংলা ও ইংরেজি উভয় ভাষাতেই মেন্টরিং এবং তথ্য সহায়তার সুবিধা।</p>
            </div>
            
            <div className="feature-minimal-item">
              <div className="feature-icon-box">
                <CheckCircle size={28} />
              </div>
              <h3 className="feature-title bn">Verified Universities</h3>
              <p className="feature-desc bn">বিশ্বসেরা ও ভেরিফাইড সব বিশ্ববিদ্যালয়ের সঠিক এডমিশন আপডেট।</p>
            </div>
            
            <div className="feature-minimal-item">
              <div className="feature-icon-box">
                <MessageSquare size={28} />
              </div>
              <h3 className="feature-title bn">WhatsApp Support</h3>
              <p className="feature-desc bn">ভর্তি সংক্রান্ত যেকোনো প্রয়োজনে সার্বক্ষণিক হোয়াটসঅ্যাপ সহায়তা।</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS GRID (upGrad Style) */}
      <section className="destinations-section">
        <div className="container">
          <div className="destinations-header">
            <h2 className="bn">জনপ্রিয় দেশসমূহ</h2>
            <Link href="/destinations" className="view-all-link bn">
              সব দেখো <ChevronRight size={16}/>
            </Link>
          </div>

          <div className="dest-cards-grid">
            {[
              { id: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧', tuition: '£10,000 - £38,000', subjects: ['Business', 'Engineering', 'Law'], highlight: 'Top study hub' },
              { id: 'united-states', name: 'United States', flag: '🇺🇸', tuition: '$20,000 - $55,000', subjects: ['Computer Science', 'MBA', 'Sciences'], highlight: 'STEM opportunities' },
              { id: 'canada', name: 'Canada', flag: '🇨🇦', tuition: 'CAD 15,000 - 40,000', subjects: ['IT', 'Nursing', 'Management'], highlight: 'PR pathway' },
              { id: 'australia', name: 'Australia', flag: '🇦🇺', tuition: 'AUD 20,000 - 50,000', subjects: ['Accounting', 'Hospitality', 'IT'], highlight: 'Post-study work visa' }
            ].map((country) => (
              <div key={country.id} className="dest-card-upgrad">
                <div className="dest-card-top">
                  <span className="dest-card-flag">{country.flag}</span>
                  <span className="dest-card-tag-accent bn">{country.highlight}</span>
                </div>
                <h3 className="dest-card-name">{country.name}</h3>
                <p className="dest-card-highlight-line bn">Tuition: {country.tuition}</p>
                <div className="dest-card-subjects">
                  {country.subjects.map((sub, i) => (
                    <span key={i} className="subject-tag">{sub}</span>
                  ))}
                </div>
                <Link href={`/destinations/${country.id}`} className="dest-card-explore-btn bn">
                  বিস্তারিত দেখো <ChevronRight size={16}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "WHY CHOOSE US" SECTION (Mentors Style Numbered Cards) */}
      <section className="why-us-section">
        <div className="container">
          <h2 className="section-title bn">কেন আমাদের বিশ্বাস করবে?</h2>
          
          <div className="why-us-grid">
            <div className="why-us-card-numbered">
              <div className="why-us-card-number">01</div>
              <h3 className="why-us-card-title bn">ফ্রি গাইডেন্স</h3>
              <p className="why-us-card-desc bn">
                আমাদের এক্সপার্ট মেন্টররা আপনার বাজেট, ব্যাকগ্রাউন্ড ও লক্ষ্য অনুযায়ী সঠিক গাইডেন্স প্রদান করবেন সম্পূর্ণ বিনামূল্যে।
              </p>
            </div>
            
            <div className="why-us-card-numbered">
              <div className="why-us-card-number">02</div>
              <h3 className="why-us-card-title bn">শীর্ষ বিশ্ববিদ্যালয় ও দেশ</h3>
              <p className="why-us-card-desc bn">
                যুক্তরাজ্য, মার্কিন যুক্তরাষ্ট্র, কানাডা ও অস্ট্রেলিয়াসহ ২০+ দেশের বিশ্বমানের সব বিশ্ববিদ্যালয় এক্সপ্লোর ও তুলনা করার সুবিধা।
              </p>
            </div>
            
            <div className="why-us-card-numbered">
              <div className="why-us-card-number">03</div>
              <h3 className="why-us-card-title bn">শিক্ষার্থীদের আস্থা</h3>
              <p className="why-us-card-desc bn">
                সফলভাবে ৫০০+ শিক্ষার্থীকে তাদের স্বপ্নের বিশ্ববিদ্যালয়ে পৌঁছাতে এবং visa processing-এ সহায়তা করেছি।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUIZ / "WHERE SHOULD I START" SECTION (Restyled & Tinted) */}
      <section className="quiz-section-tinted">
        <div className="container">
          <div className="quiz-banner-restyle">
            <div className="quiz-content-restyle">
              <h2 className="bn">কোথা থেকে শুরু করবে বুঝতে পারছো না?</h2>
              <p className="bn">৫ মিনিটের এই কুইজে অংশ নাও এবং তোমার বাজেট, ব্যাকগ্রাউন্ড ও লক্ষ্যের ওপর ভিত্তি করে পারসোনালাইজড সাজেশন পেয়ে যাও।</p>
              <Link href="/quiz" className="btn btn-primary quiz-cta-restyle-btn bn">
                কুইজ শুরু করো →
              </Link>
            </div>
            <div className="quiz-visual-restyle">
              <Award size={64} color="var(--premium-gold-2)" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUCCESS STORIES SECTION (Mentors Style) */}
      <section className="success-stories-section">
        <div className="container">
          <div className="stories-header">
            <h2 className="bn">শিক্ষার্থীদের অভিজ্ঞতা</h2>
            <p className="stories-subtitle bn">আমাদের সফল শিক্ষার্থীদের স্বপ্ন পূরণের গল্প</p>
          </div>
          
          <div className="testimonials-grid-new">
            {homeTestimonials.map((t, idx) => {
              const initials = t.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              return (
                <div key={idx} className="testimonial-card-restyle">
                  <div className="test-card-top-row">
                    <div className="test-avatar-circle">{initials}</div>
                    <div className="test-student-meta">
                      <h4 className="test-student-name">{t.name}</h4>
                      <p className="test-student-uni">{t.university}</p>
                    </div>
                  </div>
                  <p className="test-card-quote">“{t.quote}”</p>
                  <div className="test-card-footer">
                    <span className="test-card-country-badge">
                      {t.countryFlag} {t.countryName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="more-stories-wrapper">
            <Link href="/resources" className="more-stories-link bn">
              সব সফলতার গল্প দেখো <ChevronRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BAND (Mentors Style) */}
      <section className="final-cta-band-green">
        <div className="container final-cta-band-container">
          <h2 className="bn final-cta-band-title">
            এখনো বুঝতে পারছো না কোথা থেকে শুরু করবে?
          </h2>
          <Link href="/counseling" className="btn final-cta-band-btn bn">
            ফ্রি কাউন্সেলিং বুক করো
          </Link>
        </div>
      </section>
    </div>
  );
}
