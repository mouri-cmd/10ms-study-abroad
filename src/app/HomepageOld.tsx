import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Award, Users, FileText, ChevronRight, CheckCircle, Globe, MessageSquare } from 'lucide-react';
import { destinations } from '../data/destinations';
import './page.css';

export default function Home() {
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
                সফলভাবে ৫০০+ শিক্ষার্থীকে তাদের স্বপ্নের বিশ্ববিদ্যালয়ে পৌঁছাতে এবং ভিসা প্রসেসিংয়ে সহায়তা করেছি।
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
