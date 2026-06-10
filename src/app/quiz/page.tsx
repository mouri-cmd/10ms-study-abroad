"use client";

import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import './quiz.css';

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 0,
      question: "What is your budget per year?",
      options: ["Less than £10,000", "£10,000 - £15,000", "£15,000 - £25,000", "£25,000+"]
    },
    {
      id: 1,
      question: "What do you want to study?",
      options: ["Business & Management", "Engineering & Tech", "Medicine & Health", "Arts & Humanities", "Other"]
    },
    {
      id: 2,
      question: "What matters most to you?",
      options: ["Scholarship Availability", "Post-Study Work Permit", "Affordable Living Cost", "Top University Ranking"]
    },
    {
      id: 3,
      question: "When do you plan to start?",
      options: ["Within 6 months", "In 6-12 months", "Next year", "Just exploring"]
    },
    {
      id: 4,
      question: "Do you have an IELTS score?",
      options: ["Yes, 6.5 or above", "Yes, below 6.5", "Planning to take it soon", "No, looking for IELTS waivers"]
    }
  ];

  const handleSelect = (opt: string) => {
    setAnswers({ ...answers, [step]: opt });
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    }, 400);
  };

  if (step === questions.length && !isSubmitted) {
    return (
      <div className="quiz-page py-12 container max-w-600 mx-auto text-center">
        <div className="card">
          <h2 className="mb-4">Your matches are ready! 🎉</h2>
          <p className="text-light mb-6">
            Based on your answers, we've found 3 destinations and several universities that match your profile perfectly. Enter your details to view your personalized results.
          </p>
          
          <form className="lead-form text-left" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold">Full Name</label>
              <input type="text" required className="input" placeholder="e.g. Rahim Uddin" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold">Email Address</label>
              <input type="email" required className="input" placeholder="e.g. rahim@example.com" />
            </div>
            <button type="submit" className="btn btn-primary w-full">View My Results</button>
          </form>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="quiz-page py-12 container text-center max-w-600 mx-auto">
        <h1 className="mb-4">Your Top Match: United Kingdom 🇬🇧</h1>
        <p className="text-light mb-8">
          Based on your preference for a post-study work permit and your budget, the UK offers excellent 1-year Master's programs with a 2-year Graduate Route visa.
        </p>
        
        <div className="card text-left mb-8">
          <h3 className="mb-4">Recommended Next Steps</h3>
          <ul className="results-list">
            <li><Check className="text-teal" size={20}/> Explore University of Manchester</li>
            <li><Check className="text-teal" size={20}/> Check available scholarships for Bangladeshi students</li>
            <li><Check className="text-teal" size={20}/> Prepare your academic transcripts</li>
          </ul>
        </div>
        
        <div className="bg-navy text-white p-8 rounded-lg">
          <h3 className="text-white mb-2">Want to discuss these results?</h3>
          <p className="mb-6 opacity-90">Our UK specialists can review your profile and fast-track your application for free.</p>
          <button className="btn btn-primary bg-gold text-navy hover-bg-gold-light border-none w-full">
            Book a Free Counseling Session
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div className="quiz-page py-12 container">
      <div className="quiz-container max-w-600 mx-auto card">
        <div className="quiz-header flex items-center justify-between mb-8">
          <span className="text-light text-sm font-semibold">Question {step + 1} of {questions.length}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <h2 className="mb-8">{currentQ.question}</h2>
        
        <div className="options-list flex flex-col gap-4">
          {currentQ.options.map(opt => (
            <button 
              key={opt} 
              className={`quiz-option ${answers[step] === opt ? 'selected' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
