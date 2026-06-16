import React from 'react';
import { destinations, universities } from '../../../data/destinations';
import Link from 'next/link';
import { MapPin, DollarSign, BookOpen, Clock, ChevronRight, GraduationCap } from 'lucide-react';
import './country.css';

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country: countrySlug } = await params;
  const country = destinations.find(d => d.slug === countrySlug);
  if (country) {
    return { title: `Study in ${country.name} | 10 Minute School Study Abroad` };
  }
  return { title: 'Destination Coming Soon | 10 Minute School Study Abroad' };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countrySlug } = await params;
  const country = destinations.find(d => d.slug === countrySlug);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-md p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Destination Coming Soon</h2>
          <p className="text-[var(--fg-2)] mb-6">We are still preparing the best universities and resources for this country.</p>
          <Link href="/destinations" className="btn btn-primary w-full">সব দেশে ফিরে যান</Link>
        </div>
      </div>
    );
  }

  const countryUniversities = universities.filter(u => u.country_slug === country.slug);

  return (
    <div className="country-details pb-24">
      {/* Dark Hero Section with Geo-drift */}
      <section 
        className="country-hero relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(2, 14, 39, 1) 0%, rgba(2, 14, 39, 0.4) 100%), url(${country.hero_image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="geo-pattern geo-drift opacity-10"></div>
        <div className="container relative z-10 hero-content text-white">
          <div className="breadcrumb flex items-center gap-2 text-white/70 text-sm font-semibold mb-6 bn">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight size={14} />
            <span className="text-white">{country.name}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl drop-shadow-lg">{country.flag_emoji}</span>
          </div>
          <h1 className="h-display mb-4 bn text-white">{country.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl bn">
            {country.whyStudyHere && country.whyStudyHere[0] ? country.whyStudyHere[0] : "Discover world-class education and incredible opportunities."}
          </p>
        </div>
      </section>

      {/* Overlapping Statistics Grid */}
      <section className="container relative z-20 stats-overlap mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card hover-lift bg-white shadow-xl flex items-center gap-4 p-6 border-b-4 border-[var(--ten-red)]">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-info)] flex items-center justify-center text-[var(--info-dark)] shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-3)] uppercase tracking-wider mb-1 bn">Tuition (Yearly)</div>
              <div className="font-bold text-[var(--fg-1)] bn">{country.tuitionRange || 'N/A'}</div>
            </div>
          </div>
          
          <div className="card hover-lift bg-white shadow-xl flex items-center gap-4 p-6 border-b-4 border-[var(--premium-gold-2)]">
            <div className="w-12 h-12 rounded-full bg-[#FFF5D6] flex items-center justify-center text-[var(--premium-gold-2)] shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-3)] uppercase tracking-wider mb-1 bn">Living Cost</div>
              <div className="font-bold text-[var(--fg-1)] bn">{country.costOfLiving || 'N/A'}</div>
            </div>
          </div>

          <div className="card hover-lift bg-white shadow-xl flex items-center gap-4 p-6 border-b-4 border-[#2D5BFF]">
            <div className="w-12 h-12 rounded-full bg-[#F0F4FF] flex items-center justify-center text-[#2D5BFF] shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-3)] uppercase tracking-wider mb-1 bn">Universities</div>
              <div className="font-bold text-[var(--fg-1)] bn">{country.numUniversitiesStr || 'N/A'}</div>
            </div>
          </div>

          <div className="card hover-lift bg-white shadow-xl flex items-center gap-4 p-6 border-b-4 border-[var(--success-deep)]">
            <div className="w-12 h-12 rounded-full bg-[#F0FBF4] flex items-center justify-center text-[var(--success-deep)] shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-3)] uppercase tracking-wider mb-1 bn">Work Permit</div>
              <div className="font-bold text-[var(--fg-1)] bn text-sm">{country.workPermitStr || 'N/A'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study Here */}
      {country.whyStudyHere && country.whyStudyHere.length > 0 && (
        <section className="container mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-[var(--ten-red)] rounded-full"></div>
            <h2 className="h2 bn m-0">কেন {country.name}-এ পড়বে?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {country.whyStudyHere.map((reason, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-[var(--surface-subtle)] rounded-[var(--r-xl)]">
                <div className="w-8 h-8 rounded-full bg-[var(--ten-red)] text-white flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <p className="body m-0 bn pt-1">{reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top Universities */}
      <section className="container mb-20 bg-[var(--surface-subtle)] p-8 md:p-12 rounded-[var(--r-2xl)]">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="h2 bn mb-2 text-[var(--ten-ink)]">Top Universities in {country.name}</h2>
            <p className="body-sm text-[var(--fg-2)] bn m-0">Explore world-class institutions and find your perfect fit.</p>
          </div>
          <button className="btn btn-outline bn">View All Universities</button>
        </div>

        {countryUniversities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-[var(--r-xl)] shadow-sm">
            <BookOpen size={48} className="mx-auto text-[var(--fg-4)] mb-4" />
            <h3 className="h3 bn mb-2 text-[var(--fg-2)]">Universities updating soon</h3>
            <p className="body-sm bn text-[var(--fg-3)]">We are curating the best options for you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryUniversities.map(uni => (
              <Link href={`/destinations/${country.slug}/${uni.slug}`} key={uni.slug} className="card hover-lift flex flex-col p-6 h-full bg-white shadow-sm">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-[var(--ten-ink)] bn leading-tight">{uni.name}</h3>
                  <div className="flex items-center gap-1 text-[var(--fg-2)] text-sm mb-4 bn">
                    <MapPin size={14} /> {uni.city}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border)] flex justify-between items-center">
                  <span className="text-xs font-semibold text-[var(--fg-2)] bg-[var(--surface-subtle)] px-2 py-1 rounded">Rank: #{uni.world_ranking || 'N/A'}</span>
                  <span className="text-[var(--success)] font-semibold text-sm bn flex items-center gap-1">Details <ChevronRight size={14}/></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Scholarships & Visa */}
      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        <div className="lg:col-span-2">
          <h2 className="h2 bn mb-6">Popular Scholarships</h2>
          <div className="flex flex-col gap-4">
            {country.scholarships_list && country.scholarships_list.length > 0 ? (
              country.scholarships_list.map((schol, idx) => (
                <div key={idx} className="card p-6 border border-[var(--border)] hover:border-[var(--ten-red)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[var(--fg-1)] bn mb-1">{schol.name}</h3>
                    <p className="text-sm text-[var(--fg-2)] bn m-0">{schol.desc}</p>
                  </div>
                  <div className="bg-[#FDF2F2] text-[var(--ten-red)] px-4 py-2 rounded-full text-sm font-bold bn whitespace-nowrap text-center">
                    {schol.amount}
                  </div>
                </div>
              ))
            ) : (
              <div className="card p-6 border border-[var(--border)] text-center text-[var(--fg-3)] bn">
                Scholarships information is coming soon.
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="h2 bn mb-6">Visa Information</h2>
          <div className="card bg-[var(--bg-inverse)] text-white p-8 h-[calc(100%-3rem)] rounded-[var(--r-2xl)] relative overflow-hidden">
            <div className="geo-pattern geo-drift opacity-10"></div>
            <Clock size={32} className="text-[var(--premium-gold-2)] mb-6 relative z-10" />
            <p className="body bn text-white/90 leading-relaxed relative z-10 m-0">
              {country.visa_description || "Visa requirements and processing times will be updated shortly."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
