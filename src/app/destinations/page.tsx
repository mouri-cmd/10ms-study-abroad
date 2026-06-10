import React from 'react';
import Link from 'next/link';
import { destinations } from '../../data/destinations';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import './destinations.css';

export default function DestinationsPage() {
  return (
    <div className="destinations-page">
      
      {/* 1. Breadcrumbs */}
      <div className="breadcrumbs-wrapper">
        <div className="container">
          <div className="breadcrumb-nav bn">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Destinations</span>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* 2. Page Header */}
        <div className="destinations-header">
          <h1 className="destinations-title bn">
            Study Abroad Destinations
          </h1>
          <p className="destinations-subtitle bn">
            Compare countries by tuition, living costs, scholarships, and career opportunities.
          </p>
        </div>

        {/* 3. Search and Filters Row */}
        <div className="filters-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by country or subject..." 
              className="search-input" 
            />
          </div>
          
          <div className="filters-buttons">
            <button className="filter-btn bn">
              <SlidersHorizontal size={16} />
              All Budgets
            </button>
            
            <button className="filter-btn bn">
              Most Popular
            </button>
          </div>
        </div>

        {/* 4. Grid */}
        <div className="destinations-grid-full">
          {destinations.map(country => (
            <div key={country.slug} className="destination-card-full group">
              
              <Link href={`/destinations/${country.slug}`} className="card-link">
                {/* Country Image with Zoom on Hover */}
                <div className="card-image-wrapper">
                  <div 
                    className="card-image" 
                    style={{ backgroundImage: `url(${country.hero_image})` }}
                  />
                </div>
                
                {/* Content */}
                <div className="card-content">
                  <div className="card-title-row">
                    <span className="card-flag">{country.flag_emoji}</span>
                    <h2 className="card-country-name bn">
                      {country.name}
                    </h2>
                  </div>
                  
                  {/* Tuition */}
                  <div className="card-tuition bn">
                    Tuition: <span className="card-tuition-val">{country.tuitionRange}</span>
                  </div>
                  
                  {/* Subject Pills */}
                  <div className="card-pills-row">
                    {country.popular_subjects.map(subject => (
                      <span key={subject} className="card-pill bn">
                        {subject}
                      </span>
                    ))}
                  </div>
                  
                  {/* Dashed Separator */}
                  <div className="card-divider" />
                  
                  {/* Footer of the card */}
                  <div className="card-footer">
                    <span className="card-intakes">Intakes: <span className="card-intakes-val">{country.top_intakes.join(', ')}</span></span>
                    <div className="card-arrow-circle">
                      <ChevronRight size={14} className="card-arrow-icon" />
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
