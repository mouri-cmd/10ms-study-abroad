'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  GraduationCap, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import './scholarships.css';

interface Scholarship {
  name: string;
  country: string;
  countryId: string;
  flag: string;
  funding: string;
  description: string;
  eligibility: string[];
  deadline: string;
  degrees: string[];
  // Filter helper fields
  countryCategory: 'United Kingdom' | 'United States' | 'Canada' | 'Australia' | 'Germany' | 'Others';
  fundingType: 'Fully Funded' | 'Partial Funding' | 'Stipend Only' | 'Living Allowance Only';
  deadlineMonth: string; // 'January', 'February', etc.
  eligibilityKeys: string[]; // 'openToBangladeshi', 'workExperience', 'ageLimit', 'firstClass', 'noIelts'
  scholarshipType: 'Government' | 'University' | 'Private/NGO';
}

const scholarshipsData: Scholarship[] = [
  { 
    name: 'Chevening Scholarship', 
    country: 'United Kingdom', 
    countryId: 'united-kingdom',
    flag: '🇬🇧',
    funding: 'Full funding including tuition & living allowance', 
    description: 'The UK government\'s flagship scholarship program, offering full financial support for one-year master\'s degrees at any UK university.',
    eligibility: ['Bangladeshi citizen', 'Bachelor\'s degree', '2+ years work experience'],
    deadline: 'November each year', 
    degrees: ['Master'],
    countryCategory: 'United Kingdom',
    fundingType: 'Fully Funded',
    deadlineMonth: 'November',
    eligibilityKeys: ['openToBangladeshi', 'workExperience'],
    scholarshipType: 'Government'
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
    degrees: ['Master', 'PhD'],
    countryCategory: 'United Kingdom',
    fundingType: 'Fully Funded',
    deadlineMonth: 'December',
    eligibilityKeys: ['openToBangladeshi', 'firstClass', 'ageLimit'],
    scholarshipType: 'Government'
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
    degrees: ['Master', 'PhD'],
    countryCategory: 'United States',
    fundingType: 'Fully Funded',
    deadlineMonth: 'May',
    eligibilityKeys: ['openToBangladeshi', 'firstClass'],
    scholarshipType: 'Government'
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
    degrees: ['PhD'],
    countryCategory: 'Canada',
    fundingType: 'Fully Funded',
    deadlineMonth: 'November',
    eligibilityKeys: ['firstClass'],
    scholarshipType: 'Government'
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
    degrees: ['Undergraduate', 'Master'],
    countryCategory: 'Australia',
    fundingType: 'Fully Funded',
    deadlineMonth: 'April',
    eligibilityKeys: ['openToBangladeshi', 'workExperience'],
    scholarshipType: 'Government'
  },
  { 
    name: 'DAAD Scholarship', 
    country: 'Germany', 
    countryId: 'germany',
    flag: '🇩🇪',
    funding: 'Monthly stipend + travel allowance', 
    description: 'Germany\'s largest scholarship organization funding international students to study and research in Germany.',
    eligibility: ['Bachelor\'s degree or final year student', 'Above-average grades', 'Language skills'],
    deadline: 'October each year', 
    degrees: ['Master', 'PhD'],
    countryCategory: 'Germany',
    fundingType: 'Fully Funded',
    deadlineMonth: 'October',
    eligibilityKeys: ['openToBangladeshi', 'workExperience'],
    scholarshipType: 'Government'
  },
  { 
    name: 'University of Bristol Think Big Scholarships', 
    country: 'United Kingdom', 
    countryId: 'united-kingdom',
    flag: '🇬🇧',
    funding: 'Partial tuition waiver up to £26,000 per year', 
    description: 'A university funding scheme supporting international students with high academic capabilities to study in Bristol.',
    eligibility: ['Bangladeshi citizen', 'Admitted to Bristol', 'Excellent statement'],
    deadline: 'June each year', 
    degrees: ['Undergraduate', 'Master'],
    countryCategory: 'United Kingdom',
    fundingType: 'Partial Funding',
    deadlineMonth: 'June',
    eligibilityKeys: ['openToBangladeshi'],
    scholarshipType: 'University'
  },
  { 
    name: 'Lester B. Pearson International Scholarship', 
    country: 'Canada', 
    countryId: 'canada',
    flag: '🇨🇦',
    funding: 'Full tuition, books, incidental fees, and residence support', 
    description: 'Elite undergraduate scholarship at University of Toronto for outstanding international students demonstrating leadership and creativity.',
    eligibility: ['First-class high school record', 'Nominated by school', 'Outstanding community work'],
    deadline: 'January each year', 
    degrees: ['Undergraduate'],
    countryCategory: 'Canada',
    fundingType: 'Fully Funded',
    deadlineMonth: 'January',
    eligibilityKeys: ['firstClass'],
    scholarshipType: 'University'
  },
  { 
    name: 'Melbourne Research Scholarship', 
    country: 'Australia', 
    countryId: 'australia',
    flag: '🇦🇺',
    funding: 'Full tuition offset, living allowance ($37,000/yr), and health cover', 
    description: 'Fully funded research scholarships awarded to high-achieving domestic and international students at University of Melbourne.',
    eligibility: ['First-class degree', 'No IELTS requirement (if prior English instruction)', 'Research proposal required'],
    deadline: 'October each year', 
    degrees: ['Master', 'PhD'],
    countryCategory: 'Australia',
    fundingType: 'Fully Funded',
    deadlineMonth: 'October',
    eligibilityKeys: ['firstClass', 'noIelts'],
    scholarshipType: 'University'
  },
  { 
    name: 'Aga Khan Foundation International Scholarship', 
    country: 'Switzerland (Global)', 
    countryId: 'others',
    flag: '🇨🇭',
    funding: '50% grant and 50% loan package covering tuition and living', 
    description: 'Highly competitive scholarships for postgraduate studies to outstanding students from developing countries who have no other means of financing.',
    eligibility: ['Bangladeshi citizen', 'Under 35 years old', 'Consistent academic excellence'],
    deadline: 'March each year', 
    degrees: ['Master'],
    countryCategory: 'Others',
    fundingType: 'Partial Funding',
    deadlineMonth: 'March',
    eligibilityKeys: ['openToBangladeshi', 'ageLimit'],
    scholarshipType: 'Private/NGO'
  },
  { 
    name: 'Gates Cambridge Scholarship', 
    country: 'United Kingdom', 
    countryId: 'united-kingdom',
    flag: '🇬🇧',
    funding: 'Full cost of studying at Cambridge including stipend and travel', 
    description: 'Established by Bill and Melinda Gates, this program awards full scholarships to outstanding applicants to pursue postgraduate degrees.',
    eligibility: ['Bangladeshi citizen', 'First-class academic record', 'Leadership potential'],
    deadline: 'December each year', 
    degrees: ['Master', 'PhD'],
    countryCategory: 'United Kingdom',
    fundingType: 'Fully Funded',
    deadlineMonth: 'December',
    eligibilityKeys: ['openToBangladeshi', 'firstClass'],
    scholarshipType: 'Private/NGO'
  },
  { 
    name: 'Monash International Merit Scholarship', 
    country: 'Australia', 
    countryId: 'australia',
    flag: '🇦🇺',
    funding: 'AUD 10,000 per year towards tuition', 
    description: 'Awarded to high-achieving international students to study any undergraduate or postgraduate course at Monash University.',
    eligibility: ['Bangladeshi citizen', 'No IELTS required (with Monash pathway)', 'Excellent academic grades'],
    deadline: 'March each year', 
    degrees: ['Undergraduate', 'Master'],
    countryCategory: 'Australia',
    fundingType: 'Partial Funding',
    deadlineMonth: 'March',
    eligibilityKeys: ['openToBangladeshi', 'noIelts'],
    scholarshipType: 'University'
  }
];

export default function ScholarshipsPage() {
  // Fallback View Toggle (defaults to false - new sidebar filter panel is active)
  const [fallbackView, setFallbackView] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedEligibilities, setSelectedEligibilities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Original Layout Dropdown States
  const [origCountry, setOrigCountry] = useState('সব দেশ (All Countries)');
  const [origDegree, setOrigDegree] = useState('সব ডিগ্রি (All Degrees)');

  // Collapsible sections toggle states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    country: true,
    degree: true,
    funding: true,
    deadline: true,
    eligibility: true,
    type: true
  });

  // Mobile Drawer Toggle state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Toggle Collapse
  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper backward compat toggleSection alias to match state name
  const setCollapsedSections = (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => {
    setExpandedSections(prev => {
      const inverse = fn(Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, !v])));
      return Object.fromEntries(Object.entries(inverse).map(([k, v]) => [k, !v]));
    });
  };

  const isCollapsed = (section: string) => {
    return !expandedSections[section];
  };

  const toggleSectionExpanded = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle single check/uncheck
  const handleToggle = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(item => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // Clear all filters
  const handleClearAll = () => {
    setSelectedCountries([]);
    setSelectedDegrees([]);
    setSelectedFundingTypes([]);
    setSelectedMonths([]);
    setSelectedEligibilities([]);
    setSelectedTypes([]);
    setSearchQuery('');
  };

  // Active filter count
  const activeFiltersCount = 
    selectedCountries.length +
    selectedDegrees.length +
    selectedFundingTypes.length +
    selectedMonths.length +
    selectedEligibilities.length +
    selectedTypes.length;

  // Filter application logic
  const filteredScholarships = scholarshipsData.filter(schol => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = schol.name.toLowerCase().includes(q);
      const matchCountry = schol.country.toLowerCase().includes(q);
      const matchDesc = schol.description.toLowerCase().includes(q);
      if (!matchName && !matchCountry && !matchDesc) return false;
    }

    // Fallback logic check if fallbackView is true
    if (fallbackView) {
      if (origCountry !== 'সব দেশ (All Countries)' && schol.countryCategory !== origCountry) {
        return false;
      }
      if (origDegree !== 'সব ডিগ্রি (All Degrees)') {
        const hasDeg = schol.degrees.some(d => d === origDegree);
        if (!hasDeg) return false;
      }
      return true;
    }

    // Left Sidebar Filters Logic
    // 2. Country Category
    if (selectedCountries.length > 0) {
      if (!selectedCountries.includes(schol.countryCategory)) {
        return false;
      }
    }

    // 3. Degree Level
    if (selectedDegrees.length > 0) {
      const hasDegreeMatch = schol.degrees.some(d => {
        // Map degrees values correctly: 'Bachelor' matches 'Undergraduate'
        const normalized = d === 'Bachelor' ? 'Undergraduate' : d;
        return selectedDegrees.includes(normalized);
      });
      if (!hasDegreeMatch) return false;
    }

    // 4. Funding Type
    if (selectedFundingTypes.length > 0) {
      if (!selectedFundingTypes.includes(schol.fundingType)) {
        return false;
      }
    }

    // 5. Deadline Month
    if (selectedMonths.length > 0) {
      if (!selectedMonths.includes(schol.deadlineMonth)) {
        return false;
      }
    }

    // 6. Eligibility (AND logic - must satisfy all selected criteria)
    if (selectedEligibilities.length > 0) {
      const matchesAllEligibilities = selectedEligibilities.every(key => {
        return schol.eligibilityKeys.includes(key);
      });
      if (!matchesAllEligibilities) return false;
    }

    // 7. Scholarship Type
    if (selectedTypes.length > 0) {
      if (!selectedTypes.includes(schol.scholarshipType)) {
        return false;
      }
    }

    return true;
  });

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const eligibilityOptions = [
    { label: 'Open to Bangladeshi Citizens', key: 'openToBangladeshi' },
    { label: 'Work Experience Required', key: 'workExperience' },
    { label: 'Age Limit (Under 35)', key: 'ageLimit' },
    { label: 'First-class degree required', key: 'firstClass' },
    { label: 'No IELTS Required', key: 'noIelts' }
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
          <h1 className="h-display text-white mb-4 bn animate-fade-in">
            স্বপ্নের স্কলারশিপ খুঁজে নাও
          </h1>
          <p className="body text-white max-w-600 mx-auto bn" style={{ opacity: 0.85 }}>
            বাংলাদেশি শিক্ষার্থীদের জন্য বিশ্বজুড়ে ছড়িয়ে থাকা সেরা ফান্ডিং ও স্কলারশিপের সুযোগগুলো এক্সপ্লোর করো।
          </p>
        </div>
      </section>

      <section className="container relative z-20" style={{ marginTop: '-60px' }}>
        
        {/* ============================================================== */}
        {/* FALLBACK ORIGINAL HORIZONTAL FILTER VIEW                       */}
        {/* ============================================================== */}
        {fallbackView ? (
          <>
            <div className="search-hub-card card flex flex-col md:flex-row gap-4 mb-12 p-6 bg-white shadow-[var(--sh-raised)]">
              <div className="search-input-wrapper flex-1">
                <Search size={20} className="search-icon" color="var(--fg-3)" />
                <input 
                  type="text" 
                  placeholder="স্কলারশিপ, দেশ বা প্রোগ্রামের নাম দিয়ে খোঁজো..." 
                  className="input pl-12 h-full bn text-lg" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <select 
                  className="input filter-select bn h-full"
                  value={origCountry}
                  onChange={(e) => setOrigCountry(e.target.value)}
                >
                  <option>সব দেশ (All Countries)</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Others">Others</option>
                </select>
                <select 
                  className="input filter-select bn h-full"
                  value={origDegree}
                  onChange={(e) => setOrigDegree(e.target.value)}
                >
                  <option>সব ডিগ্রি (All Degrees)</option>
                  <option value="Undergraduate">Bachelor/Undergraduate</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <h2 className="h2 bn">মোট {filteredScholarships.length} টি স্কলারশিপ পাওয়া গেছে</h2>
              <button 
                onClick={() => setFallbackView(false)} 
                className="btn btn-secondary text-sm flex items-center gap-1.5 px-4 py-2"
                style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569' }}
              >
                <SlidersHorizontal size={14} /> Switch to Sidebar Filters
              </button>
            </div>

            <div className="scholarships-grid mb-16">
              {filteredScholarships.map((schol, idx) => (
                <ScholarshipCard key={idx} schol={schol} />
              ))}
            </div>
          </>
        ) : (
          /* ============================================================== */
          /* NEW LEFT SIDEBAR FILTER PANEL VIEW                             */
          /* ============================================================== */
          <div className="scholarships-layout-wrapper">
            
            {/* Desktop and Mobile Search Bar Hub */}
            <div className="search-hub-card card mb-8 p-4 bg-white shadow-sm flex items-center justify-between gap-4">
              <div className="search-input-wrapper flex-1">
                <Search size={18} className="search-icon" color="var(--fg-3)" />
                <input 
                  type="text" 
                  placeholder="স্কলারশিপ, দেশ বা প্রোগ্রামের নাম দিয়ে খোঁজো..." 
                  className="input pl-12 h-full bn text-base" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Mobile Filter Toggle Button */}
              <button 
                className="mobile-filter-toggle-btn btn btn-primary flex md:hidden items-center gap-2"
                onClick={() => setMobileDrawerOpen(true)}
              >
                <SlidersHorizontal size={16} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              <button 
                onClick={() => setFallbackView(true)} 
                className="desktop-fallback-btn btn btn-secondary text-sm flex items-center gap-1.5 px-4 py-2"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}
              >
                Original Style (Horizontal)
              </button>
            </div>

            <div className="layout-grid-sidebar">
              {/* Left Sidebar filter panel */}
              <aside className={`filter-sidebar-wrapper ${mobileDrawerOpen ? 'drawer-open' : ''}`}>
                <div className="filter-sidebar-inner">
                  
                  {/* Sidebar Header */}
                  <div className="filter-sidebar-header">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={18} className="text-emerald-500" />
                      <span className="font-bold text-slate-800 text-base">
                        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {activeFiltersCount > 0 && (
                        <button 
                          onClick={handleClearAll}
                          className="clear-all-btn text-xs font-semibold text-red-500 flex items-center gap-1 hover:text-red-600 transition-colors"
                        >
                          <RotateCcw size={12} /> Clear All
                        </button>
                      )}
                      <button 
                        className="mobile-drawer-close-x md:hidden" 
                        onClick={() => setMobileDrawerOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Sidebar Filter Lists */}
                  <div className="filter-scroll-area">
                    
                    {/* Section 1: Country */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('country')}
                      >
                        <span>🌍 Country / Destination</span>
                        {isCollapsed('country') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('country') && (
                        <div className="filter-section-body">
                          {['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Others'].map((c, i) => (
                            <label key={i} className="filter-checkbox-label">
                              <input 
                                type="checkbox"
                                checked={selectedCountries.includes(c)}
                                onChange={() => handleToggle(selectedCountries, setSelectedCountries, c)}
                                className="filter-checkbox-input"
                              />
                              <span className="checkbox-text-custom">{c}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 2: Degree Level */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('degree')}
                      >
                        <span>🎓 Degree Level</span>
                        {isCollapsed('degree') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('degree') && (
                        <div className="filter-section-body">
                          {['Undergraduate', 'Master', 'PhD', 'Diploma'].map((deg, i) => (
                            <label key={i} className="filter-checkbox-label">
                              <input 
                                type="checkbox"
                                checked={selectedDegrees.includes(deg)}
                                onChange={() => handleToggle(selectedDegrees, setSelectedDegrees, deg)}
                                className="filter-checkbox-input"
                              />
                              <span className="checkbox-text-custom">{deg}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 3: Funding Type */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('funding')}
                      >
                        <span>💰 Funding Type</span>
                        {isCollapsed('funding') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('funding') && (
                        <div className="filter-section-body">
                          {[
                            { label: 'Fully Funded (tuition + stipend + airfare)', val: 'Fully Funded' },
                            { label: 'Partial Funding (tuition only)', val: 'Partial Funding' },
                            { label: 'Stipend Only', val: 'Stipend Only' },
                            { label: 'Living Allowance Only', val: 'Living Allowance Only' }
                          ].map((fund, i) => (
                            <label key={i} className="filter-checkbox-label">
                              <input 
                                type="checkbox"
                                checked={selectedFundingTypes.includes(fund.val)}
                                onChange={() => handleToggle(selectedFundingTypes, setSelectedFundingTypes, fund.val)}
                                className="filter-checkbox-input"
                              />
                              <span className="checkbox-text-custom">{fund.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 4: Deadline Month */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('deadline')}
                      >
                        <span>📅 Deadline Month</span>
                        {isCollapsed('deadline') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('deadline') && (
                        <div className="filter-section-body">
                          <div className="months-grid-chips">
                            {monthsList.map((m, i) => {
                              const active = selectedMonths.includes(m);
                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleToggle(selectedMonths, setSelectedMonths, m)}
                                  className={`month-chip-button ${active ? 'active' : ''}`}
                                >
                                  {m.substring(0, 3)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Section 5: Eligibility */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('eligibility')}
                      >
                        <span>✅ Eligibility</span>
                        {isCollapsed('eligibility') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('eligibility') && (
                        <div className="filter-section-body">
                          {eligibilityOptions.map((opt, i) => (
                            <label key={i} className="filter-checkbox-label">
                              <input 
                                type="checkbox"
                                checked={selectedEligibilities.includes(opt.key)}
                                onChange={() => handleToggle(selectedEligibilities, setSelectedEligibilities, opt.key)}
                                className="filter-checkbox-input"
                              />
                              <span className="checkbox-text-custom">{opt.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Section 6: Scholarship Type */}
                    <div className="filter-section-block">
                      <button 
                        className="filter-section-header"
                        onClick={() => toggleSectionExpanded('type')}
                      >
                        <span>🔍 Scholarship Type</span>
                        {isCollapsed('type') ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </button>
                      
                      {!isCollapsed('type') && (
                        <div className="filter-section-body">
                          {[
                            { label: 'Government Scholarship', val: 'Government' },
                            { label: 'University Scholarship', val: 'University' },
                            { label: 'Private/NGO Scholarship', val: 'Private/NGO' }
                          ].map((t, i) => (
                            <label key={i} className="filter-checkbox-label">
                              <input 
                                type="checkbox"
                                checked={selectedTypes.includes(t.val)}
                                onChange={() => handleToggle(selectedTypes, setSelectedTypes, t.val)}
                                className="filter-checkbox-input"
                              />
                              <span className="checkbox-text-custom">{t.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </aside>

              {/* Mobile Drawer Overlay Backdrop */}
              {mobileDrawerOpen && (
                <div 
                  className="mobile-drawer-backdrop md:hidden"
                  onClick={() => setMobileDrawerOpen(false)}
                ></div>
              )}

              {/* Right Side: Content Area */}
              <div className="filtered-content-area">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="filtered-results-count h3 bn text-slate-800">
                    মোট {filteredScholarships.length} টি স্কলারশিপ পাওয়া গেছে
                  </h2>
                </div>

                {filteredScholarships.length === 0 ? (
                  <div className="card text-center p-12 bg-white border border-slate-200 rounded-2xl">
                    <SlidersHorizontal size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="h3 mb-2">কোন স্কলারশিপ পাওয়া যায়নি</h3>
                    <p className="text-slate-500 mb-6">আপনার সিলেক্ট করা ফিল্টারের সাথে মিলে যায় এমন কোন স্কলারশিপ পাওয়া যায়নি।</p>
                    <button 
                      onClick={handleClearAll}
                      className="btn btn-primary px-6 py-2.5 mx-auto"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="scholarships-two-col-grid">
                    {filteredScholarships.map((schol, idx) => (
                      <ScholarshipCard key={idx} schol={schol} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

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

// Subcomponent: Scholarship Card for animation and isolation
function ScholarshipCard({ schol }: { schol: Scholarship }) {
  return (
    <div className="card scholarship-card hover-lift animate-fade-in-up">
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
  );
}
