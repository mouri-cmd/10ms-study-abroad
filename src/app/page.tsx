import React from 'react';
import Link from 'next/link';
import { Search, MapPin, Award, Users, FileText, ChevronRight, CheckCircle } from 'lucide-react';
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
      {/* 1. Hero Section (Mentors Style) */}
      <section className="hero-new">
        <div className="hero-overlay"></div>
        <div className="container hero-new-container">
          <div className="hero-new-content text-center">
            <h1 className="hero-new-title bn">
              বিদেশে পড়ার স্বপ্ন পূরণের পথ এখান থেকেই শুরু
            </h1>
            <p className="hero-new-subtitle">
              Explore world-class universities, compare programs, and get free expert guidance — trusted by thousands of students.
            </p>
            <Link href="/counseling" className="btn btn-primary btn-pulse bn hero-new-cta">
              ফ্রি সেশন বুক করো
            </Link>
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

      {/* 2. Trust Bar (IDP Style) */}
      <section className="trust-bar-section">
        <div className="container">
          <div className="trust-bar-grid">
            <div className="trust-bar-item">
              <div className="trust-icon-wrapper">
                <Users size={20} />
              </div>
              <div className="trust-text">
                <span className="trust-number bn">৫০০+</span>
                <span className="trust-label bn">শিক্ষার্থী</span>
              </div>
            </div>
            
            <div className="trust-bar-item">
              <div className="trust-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="trust-text">
                <span className="trust-number bn">২০+</span>
                <span className="trust-label bn">দেশ</span>
              </div>
            </div>
            
            <div className="trust-bar-item">
              <div className="trust-icon-wrapper">
                <FileText size={20} />
              </div>
              <div className="trust-text">
                <span className="trust-number bn">ফ্রি</span>
                <span className="trust-label bn">গাইডেন্স</span>
              </div>
            </div>

            <div className="trust-bar-item">
              <div className="trust-icon-wrapper">
                <CheckCircle size={20} />
              </div>
              <div className="trust-text">
                <span className="trust-number bn">১০০%</span>
                <span className="trust-label bn">বিশ্বস্ত</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section (Mentors Style) */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-center mb-12 bn h1">কেন 10MS Study Abroad?</h2>
          
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-number">01</div>
              <h3 className="why-title bn">ফ্রি গাইডেন্স</h3>
              <p className="why-desc bn">
                আমাদের এক্সপার্ট মেন্টররা আপনার বাজেট, ব্যাকগ্রাউন্ড ও লক্ষ্য অনুযায়ী সঠিক গাইডেন্স প্রদান করবেন সম্পূর্ণ বিনামূল্যে।
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-number">02</div>
              <h3 className="why-title bn">শীর্ষ বিশ্ববিদ্যালয় ও দেশ</h3>
              <p className="why-desc bn">
                যুক্তরাজ্য, মার্কিন যুক্তরাষ্ট্র, কানাডা ও অস্ট্রেলিয়াসহ ২০+ দেশের বিশ্বমানের সব বিশ্ববিদ্যালয় এক্সপ্লোর ও তুলনা করার সুবিধা।
              </p>
            </div>
            
            <div className="why-choose-card">
              <div className="why-number">03</div>
              <h3 className="why-title bn">শিক্ষার্থীদের আস্থা</h3>
              <p className="why-desc bn">
                সফলভাবে ৫০০+ শিক্ষার্থীকে তাদের স্বপ্নের বিশ্ববিদ্যালয়ে পৌঁছাতে এবং ভিসা প্রসেসিংয়ে সহায়তা করেছি।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Destinations (IDP Restyled Cards) */}
      <section className="section bg-light-tint">
        <div className="container">
          <div className="section-header flex items-center justify-between">
            <h2 className="bn h1">জনপ্রিয় দেশসমূহ</h2>
            <Link href="/destinations" className="view-all bn">সব দেখো <ChevronRight size={16}/></Link>
          </div>

          <div className="destinations-grid-new">
            {[
              { id: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧', tuition: '£10,000 - £38,000', programs: 'Business, Engineering, Law', bgGrad: 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)' },
              { id: 'united-states', name: 'United States', flag: '🇺🇸', tuition: '$20,000 - $55,000', programs: 'Computer Science, MBA', bgGrad: 'linear-gradient(135deg, #eef2f3 0%, #cbd7e6 100%)' },
              { id: 'canada', name: 'Canada', flag: '🇨🇦', tuition: 'CAD 15,000 - 40,000', programs: 'IT, Nursing, Management', bgGrad: 'linear-gradient(135deg, #fcebeb 0%, #f7c5c5 100%)' },
              { id: 'australia', name: 'Australia', flag: '🇦🇺', tuition: 'AUD 20,000 - 50,000', programs: 'Accounting, Hospitality', bgGrad: 'linear-gradient(135deg, #ebf3fc 0%, #b8d4f4 100%)' }
            ].map((country) => (
              <Link href={`/destinations/${country.id}`} key={country.name} className="destination-card-new">
                <div className="dest-card-header" style={{ background: country.bgGrad }}>
                  <div className="dest-flag-badge">{country.flag}</div>
                </div>
                <div className="dest-card-body">
                  <h3 className="h3 dest-card-name">{country.name}</h3>
                  <div className="dest-card-info">
                    <span className="info-label">Tuition:</span>
                    <span className="info-value">{country.tuition}</span>
                  </div>
                  <div className="dest-card-tags">
                    <span className="dest-tag">{country.programs.split(', ')[0]}</span>
                    <span className="dest-tag">{country.programs.split(', ')[1]}</span>
                    <span className="dest-tag">{country.programs.split(', ')[2]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Quiz / "Where Should I Start" Section (Restyled) */}
      <section className="section bg-alt-tint">
        <div className="container">
          <div className="quiz-banner-new card flex items-center justify-between">
            <div className="quiz-content-new">
              <h2 className="bn h1">কোথা থেকে শুরু করবে বুঝতে পারছো না?</h2>
              <p className="bn">৫ মিনিটের এই কুইজে অংশ নাও এবং তোমার বাজেট, ব্যাকগ্রাউন্ড ও লক্ষ্যের ওপর ভিত্তি করে পারসোনালাইজড সাজেশন পেয়ে যাও।</p>
              <Link href="/quiz" className="btn btn-primary mt-4 bn quiz-cta-btn">কুইজ শুরু করো →</Link>
            </div>
            <div className="quiz-visual-new">
              <Award size={90} color="var(--premium-gold-2)" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Stories / Testimonials Section (New) */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-center mb-12 bn h1">শিক্ষার্থীদের অভিজ্ঞতা</h2>
          
          <div className="testimonials-grid">
            {homeTestimonials.map((t, idx) => {
              const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              return (
                <div key={idx} className="testimonial-card-new card">
                  <div className="test-top">
                    <div className="student-avatar">{initials}</div>
                    <div className="student-meta">
                      <h4 className="student-name">{t.name}</h4>
                      <p className="student-uni">{t.university}</p>
                    </div>
                  </div>
                  <div className="test-body">
                    <p className="student-quote">“{t.quote}”</p>
                  </div>
                  <div className="test-bottom">
                    <span className="country-badge">{t.countryFlag} {t.countryName}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/resources" className="view-all-stories bn">
              সব সফলতার গল্প দেখো <ChevronRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Final CTA Band (IDP Style) */}
      <section className="final-cta-band">
        <div className="container final-cta-container text-center">
          <h2 className="bn final-cta-title">এখনো বুঝতে পারছো না কোথা থেকে শুরু করবে?</h2>
          <Link href="/counseling" className="btn final-cta-btn bn">
            ফ্রি কাউন্সেলিং বুক করো
          </Link>
        </div>
      </section>
    </div>
  );
}
