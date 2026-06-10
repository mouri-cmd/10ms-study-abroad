import React from 'react';
import Link from 'next/link';
import { Search, Calendar, CheckCircle, ChevronRight, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import './scholarships.css';

export default function ScholarshipsPage() {
  const scholarships = [
    { 
      name: 'Chevening Scholarship', 
      country: 'United Kingdom', 
      countryId: 'united-kingdom',
      flag: '🇬🇧',
      funding: 'Full funding including tuition & living allowance', 
      description: 'The UK government\'s flagship scholarship program, offering full financial support for one-year master\'s degrees at any UK university.',
      eligibility: ['Bangladeshi citizen', 'Bachelor\'s degree', '2+ years work experience'],
      deadline: 'November each year', 
      degrees: ['Master'] 
    },
    { 
      name: 'Commonwealth Scholarship', 
      country: 'United Kingdom', 
      countryId: 'united-kingdom',
      flag: '🇬🇧',
      funding: 'Full tuition + stipend + airfare', 
      description: 'Prestigious scholarships for candidates from Commonwealth countries to study at UK universities, covering all expenses.',
      eligibility: ['Commonwealth citizen', 'First-class bachelor\'s degree', 'Under 35 years old'],
      deadline: 'December each year', 
      degrees: ['Master', 'PhD'] 
    },
    { 
      name: 'Fulbright Foreign Student Program', 
      country: 'United States', 
      countryId: 'united-states',
      flag: '🇺🇸',
      funding: 'Full funding for tuition, living, and travel', 
      description: 'US government\'s premier international exchange program offering full scholarships for graduate study at US universities.',
      eligibility: ['Bangladeshi citizen', 'Bachelor\'s degree', 'Strong academic record'],
      deadline: 'May each year', 
      degrees: ['Master', 'PhD'] 
    },
    { 
      name: 'Vanier Canada Graduate Scholarships', 
      country: 'Canada', 
      countryId: 'canada',
      flag: '🇨🇦',
      funding: 'CAD 50,000/year for 3 years', 
      description: 'Elite scholarships for world-class doctoral students demonstrating leadership skills and high academic achievement.',
      eligibility: ['PhD applicant', 'Nominated by Canadian university', 'Excellent academic record'],
      deadline: 'November each year', 
      degrees: ['PhD'] 
    },
    { 
      name: 'Australia Awards Scholarship', 
      country: 'Australia', 
      countryId: 'australia',
      flag: '🇦🇺',
      funding: 'Full tuition + living allowance + return airfare', 
      description: 'Australian government scholarship for students from developing countries to study undergraduate or postgraduate programs.',
      eligibility: ['Bangladeshi citizen', 'Bachelor\'s degree', 'Work experience preferred'],
      deadline: 'April each year', 
      degrees: ['Bachelor', 'Master'] 
    },
    { 
      name: 'DAAD Scholarship', 
      country: 'Germany', 
      countryId: 'germany',
      flag: '🇩🇪',
      funding: 'Monthly stipend + travel allowance', 
      description: 'Germany\'s largest scholarship organization funding international students to study and research in Germany.',
      eligibility: ['Bachelor\'s degree or final year student', 'Above-average grades', 'Language skills'],
      deadline: 'Varies by program', 
      degrees: ['Master', 'PhD'] 
    }
  ];

  return (
    <div className="scholarships-page bg-light min-h-screen">
      {/* Dark Hero Section with Geo Watermarks */}
      <section className="dark-hero-style text-center relative pt-20 pb-32">
        <svg className="geo-watermark geo-drift w-64 h-64" style={{ top: '10%', left: '5%' }} viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" />
        </svg>
        <svg className="geo-watermark geo-drift w-48 h-48" style={{ top: '30%', right: '10%', animationDelay: '2s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <svg className="geo-watermark geo-drift w-32 h-32" style={{ bottom: '10%', left: '25%', animationDelay: '4s' }} viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" />
        </svg>

        <div className="container relative z-10">
          <div className="badge-eyebrow mb-6 mx-auto inline-flex items-center gap-2 bn">
            <Sparkles size={14} /> ১০০% ফ্রি ফান্ডিং সুযোগ
          </div>
          <h1 className="h-display text-white mb-4 bn">
            স্বপ্নের স্কলারশিপ খুঁজে নাও
          </h1>
          <p className="body text-white max-w-600 mx-auto bn" style={{ opacity: 0.85 }}>
            বাংলাদেশি শিক্ষার্থীদের জন্য বিশ্বজুড়ে ছড়িয়ে থাকা সেরা ফান্ডিং ও স্কলারশিপের সুযোগগুলো এক্সপ্লোর করো।
          </p>
        </div>
      </section>

      <section className="container relative z-20" style={{ marginTop: '-60px' }}>
        {/* Floating Search & Filters Card */}
        <div className="search-hub-card card flex flex-col md:flex-row gap-4 mb-12 p-6 bg-white shadow-[var(--sh-raised)]">
          <div className="search-input-wrapper flex-1">
            <Search size={20} className="search-icon" color="var(--fg-3)" />
            <input type="text" placeholder="স্কলারশিপ, দেশ বা প্রোগ্রামের নাম দিয়ে খোঁজো..." className="input pl-12 h-full bn text-lg" />
          </div>
          
          <div className="flex gap-4">
            <select className="input filter-select bn h-full">
              <option>সব দেশ (All Countries)</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
            </select>
            <select className="input filter-select bn h-full">
              <option>সব ডিগ্রি (All Degrees)</option>
              <option>Bachelor</option>
              <option>Master</option>
              <option>PhD</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="h2 bn">মোট {scholarships.length} টি স্কলারশিপ পাওয়া গেছে</h2>
        </div>

        {/* Scholarships Grid */}
        <div className="scholarships-grid mb-16">
          {scholarships.map((schol, idx) => (
            <div key={idx} className="card scholarship-card hover-lift">
              <div className="flex justify-between items-start">
                <h3 className="h3 pr-4 text-gray-900 leading-tight">{schol.name}</h3>
                <div className="flex flex-col gap-2 shrink-0">
                  {schol.degrees.map((degree, i) => (
                    <span key={i} className="degree-pill flex items-center gap-1 justify-center">
                      <GraduationCap size={12}/> {degree}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-subtle)] rounded-full text-[var(--ten-ink)] font-semibold text-sm">
                  <span className="text-base leading-none">{schol.flag}</span>
                  <span>{schol.country}</span>
                </div>
              </div>

              <div className="funding-box flex items-start gap-2">
                <div className="mt-0.5"><Sparkles size={16} className="text-[var(--success)]" /></div>
                <div>{schol.funding}</div>
              </div>

              <p className="body-sm text-[var(--fg-2)] line-clamp-2">
                {schol.description}
              </p>

              <div className="divider"></div>

              <div className="eligibility-section flex-1">
                <h4 className="meta text-[var(--fg-3)] uppercase tracking-wider mb-3">Eligibility</h4>
                <ul className="flex flex-col gap-2.5">
                  {schol.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 body-sm text-[var(--fg-1)]">
                      <CheckCircle size={16} color="var(--success)" className="mt-0.5 shrink-0"/>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className="card-footer mt-auto pt-4 flex items-center justify-between border-t border-[var(--border)]">
                <div className="flex items-center gap-2 text-[var(--warn-deep)] font-semibold text-sm bg-[var(--premium-gold-1)] px-3 py-1.5 rounded-full">
                  <Calendar size={14}/>
                  <span>{schol.deadline}</span>
                </div>
                <Link href={`/destinations/${schol.countryId}`} className="view-country-link flex items-center gap-1 font-bold text-[var(--success)] text-sm transition-all hover:text-[var(--success-deep)] group">
                  {schol.country} দেখুন <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Generation Bottom Banner */}
        <div className="card bg-inverse text-white p-12 dark-hero-style flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white mb-4 h2 bn">যোগ্যতা অনুযায়ী স্কলারশিপ খুঁজছেন?</h2>
            <p className="max-w-600 text-white body bn" style={{ opacity: 0.85 }}>
              আমাদের এক্সপার্টরা আপনার প্রোফাইল অ্যানালাইজ করে জানিয়ে দিবেন কোন দেশে আপনার জন্য সেরা ফান্ডিং এর সুযোগ রয়েছে।
            </p>
          </div>
          <div>
            <button className="btn btn-primary btn-pulse bn text-lg px-8 py-4">
              ফ্রি সেশন বুক করো
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
