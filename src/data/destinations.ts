export const destinations = [
  {
    id: "uk",
    name: "United Kingdom",
    slug: "uk",
    flag_emoji: "🇬🇧",
    hero_image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000",
    tuitionRange: "£10,000 – £38,000/year",
    costOfLiving: "£10,000 – £15,000/year",
    numUniversitiesStr: "160+",
    workPermitStr: "Graduate Route Visa — 2 years post-study",
    whyStudyHere: [
      "World-renowned universities with centuries of tradition",
      "Shorter degree durations (3-year undergrad, 1-year masters)",
      "Multicultural student community",
      "Strong graduate employment outcomes"
    ],
    popular_subjects: ["Business", "Engineering", "Medicine"],
    top_intakes: ["September", "January"],
    scholarships_list: [
      { name: "Chevening Scholarship", amount: "Full funding", desc: "UK govt merit-based" },
      { name: "GREAT Scholarship", amount: "Partial funding", desc: "Selected universities" },
      { name: "Commonwealth Scholarship", amount: "Full funding", desc: "Developing country students" }
    ],
    visa_description: "Student Visa (Tier 4) — Processing time: 3–8 weeks. Requires CAS number, proof of funds, English proficiency, and biometrics.",
    testimonials: [
      {
        name: "Rahim U.",
        university: "UCL",
        quote: "The 1-year master's program is intense but completely worth it. The career support here is excellent for international students."
      },
      {
        name: "Sadia M.",
        university: "University of Manchester",
        quote: "Studying in the UK gives you access to top global minds. The application process was smooth thanks to the guidance."
      }
    ]
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    flag_emoji: "🇨🇦",
    hero_image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=2000",
    tuitionRange: "CAD 15,000 – CAD 40,000/year",
    costOfLiving: "CAD 12,000 – CAD 18,000/year",
    numUniversitiesStr: "100+",
    workPermitStr: "PGWP — up to 3 years post-study",
    whyStudyHere: [
      "One of the safest countries for international students",
      "Post-graduation work permit up to 3 years",
      "Pathway to permanent residency",
      "Affordable compared to USA and UK"
    ],
    popular_subjects: ["Computer Science", "Business", "Engineering"],
    top_intakes: ["September", "January", "May"],
    scholarships_list: [
      { name: "Vanier Canada Graduate Scholarship", amount: "Full funding", desc: "PhD students" },
      { name: "Ontario Graduate Scholarship", amount: "Partial", desc: "Merit-based" },
      { name: "University-specific merit awards", amount: "$5,000–$20,000", desc: "Merit-based" }
    ],
    visa_description: "Canadian Student Visa — Processing time: 4–12 weeks. Requires acceptance letter, proof of funds, biometrics, and medical exam (if applicable).",
    testimonials: [
      {
        name: "Nusrat J.",
        university: "University of Toronto",
        quote: "Canada feels like a second home now. The transition from student to working professional is so smooth here."
      }
    ]
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    flag_emoji: "🇦🇺",
    hero_image: "https://images.unsplash.com/photo-1591130219388-ae3a189a674e?q=80&w=2000",
    tuitionRange: "AUD 20,000 – AUD 50,000/year",
    costOfLiving: "AUD 18,000 – AUD 25,000/year",
    numUniversitiesStr: "40+ world-class universities",
    workPermitStr: "Post-Study Work Visa — 2 to 4 years depending on degree level",
    whyStudyHere: [
      "Home to 7 of the world's top 100 universities",
      "Work up to 48 hours per fortnight during studies",
      "Pathway to Australian PR",
      "Excellent quality of life and student safety"
    ],
    popular_subjects: ["Business", "Engineering", "IT"],
    top_intakes: ["February", "July"],
    scholarships_list: [
      { name: "Australia Awards", amount: "Full funding", desc: "Developing countries" },
      { name: "Destination Australia", amount: "$15,000/year", desc: "Regional study" },
      { name: "University Excellence Scholarships", amount: "Varies", desc: "Merit-based" }
    ],
    visa_description: "Student Visa (Subclass 500) — Processing time: 4–6 weeks. Requires CoE, OSHC health cover, proof of funds, and GTE statement.",
    testimonials: []
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    flag_emoji: "🇩🇪",
    hero_image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000",
    tuitionRange: "€0 – €3,000/year (most public universities are tuition-free)",
    costOfLiving: "€8,000 – €12,000/year",
    numUniversitiesStr: "400+ including 300+ tuition-free public universities",
    workPermitStr: "18 months job-seeking visa after graduation",
    whyStudyHere: [
      "Most public universities charge zero tuition fees",
      "Strong engineering and research programs",
      "18-month post-study job-seeking visa",
      "Thriving international student community"
    ],
    popular_subjects: ["Engineering", "Computer Science", "Natural Sciences"],
    top_intakes: ["October", "April"],
    scholarships_list: [
      { name: "DAAD Scholarship", amount: "Full/partial funding", desc: "All levels" },
      { name: "Deutschlandstipendium", amount: "€300/month", desc: "Merit-based" },
      { name: "Heinrich Böll Foundation grants", amount: "Varies", desc: "Merit and need-based" }
    ],
    visa_description: "German Student Visa — Processing time: 4–12 weeks. Requires university admission, blocked account (€11,904), health insurance, and language proficiency.",
    testimonials: []
  },
  {
    id: "malaysia",
    name: "Malaysia",
    slug: "malaysia",
    flag_emoji: "🇲🇾",
    hero_image: "https://images.unsplash.com/photo-1616190419596-e2839e7380d7?q=80&w=2000",
    tuitionRange: "MYR 15,000 – MYR 60,000/year",
    costOfLiving: "MYR 12,000 – MYR 18,000/year",
    numUniversitiesStr: "20+ internationally recognized universities",
    workPermitStr: "Student pass allows part-time work (20 hrs/week during breaks)",
    whyStudyHere: [
      "Affordable tuition with internationally recognized degrees",
      "English-medium instruction available",
      "Close to Bangladesh, easy travel home",
      "Multicultural environment familiar to Bangladeshi students"
    ],
    popular_subjects: ["Business", "IT", "Engineering"],
    top_intakes: ["February", "July", "October"],
    scholarships_list: [
      { name: "Malaysian International Scholarship", amount: "Full funding", desc: "Postgraduate" },
      { name: "MyCSD Scholarship", amount: "Partial", desc: "Merit-based" },
      { name: "University merit scholarships", amount: "Varies", desc: "Merit-based" }
    ],
    visa_description: "Student Pass — Processing time: 4–8 weeks. Requires EMGS approval, university offer letter, medical checkup, and financial proof.",
    testimonials: []
  },
  {
    id: "usa",
    name: "United States",
    slug: "united-states",
    flag_emoji: "🇺🇸",
    hero_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000",
    tuitionRange: "$20,000 - $55,000/year",
    costOfLiving: "$15,000 - $20,000/year",
    numUniversitiesStr: "4000+",
    workPermitStr: "OPT: 1-3 years post-study work authorization",
    whyStudyHere: [
      "Home to the world's top-ranked universities",
      "Cutting-edge research facilities and innovation hubs",
      "Flexible curriculum with major/minor options",
      "Strong alumni networks and career opportunities"
    ],
    popular_subjects: ["Computer Science", "Business", "Engineering"],
    top_intakes: ["Fall (August)", "Spring (January)"],
    scholarships_list: [
      { name: "Fulbright Scholarship", amount: "Full funding", desc: "Academic excellence and leadership" },
      { name: "Hubert Humphrey Fellowship", amount: "Full funding", desc: "Mid-career professionals" },
      { name: "University Merit Scholarships", amount: "$5,000 – $30,000", desc: "High GPA and test scores" }
    ],
    visa_description: "F-1 Student Visa – Processing time: 3-5 weeks. Requires I-20 form, SEVIS fee, financial documentation, and visa interview.",
    testimonials: [
      {
        name: "Karim Hassan",
        university: "MIT",
        quote: "The research opportunities here are unmatched. I got to work on projects that are shaping the future."
      },
      {
        name: "Nadia Islam",
        university: "Stanford University",
        quote: "The entrepreneurial culture pushed me to think bigger. I launched my startup during my second year."
      }
    ]
  },
  {
    id: "newzealand",
    name: "New Zealand",
    slug: "new-zealand",
    flag_emoji: "🇳🇿",
    hero_image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2000",
    tuitionRange: "NZD 25,000 – NZD 40,000/year",
    costOfLiving: "NZD 18,000 – NZD 25,000/year",
    numUniversitiesStr: "8 world-class universities",
    workPermitStr: "Up to 3 years post-study work visa",
    whyStudyHere: [
      "One of the safest and least corrupt countries globally",
      "All universities are ranked in the global top 3%",
      "Up to 3 years of post-study work visa",
      "Easy pathways to bring your family along"
    ],
    popular_subjects: ["Business", "Agricultural Studies", "IT"],
    top_intakes: ["February", "July"],
    scholarships_list: [
      { name: "Manaaki New Zealand Scholarships", amount: "Full funding", desc: "Government scholarships" },
      { name: "University Excellence Awards", amount: "$10,000", desc: "Merit-based awards" }
    ],
    visa_description: "Fee Paying Student Visa – Processing time: 4 weeks. Allows you to work up to 20 hours a week.",
    testimonials: []
  },
  {
    id: "ireland",
    name: "Ireland",
    slug: "ireland",
    flag_emoji: "🇮🇪",
    hero_image: "https://images.unsplash.com/photo-1590080875628-9866857422de?q=80&w=2000",
    tuitionRange: "€10,000 – €25,000/year",
    costOfLiving: "€10,000 – €14,000/year",
    numUniversitiesStr: "12 universities and ITs",
    workPermitStr: "Up to 2 years post-study",
    whyStudyHere: [
      "European headquarters for Google, Meta, Apple, and more",
      "Up to 2 years post-study work permit",
      "English-speaking country making communication seamless",
      "Incredible job market in the IT and Pharma sectors"
    ],
    popular_subjects: ["IT", "Business", "Pharmaceuticals"],
    top_intakes: ["September", "January"],
    scholarships_list: [
      { name: "Government of Ireland Scholarships", amount: "€10,000 + Tuition waiver", desc: "For high-achieving students" },
      { name: "Trinity College Global Excellence", amount: "€5,000", desc: "Academic achievement" }
    ],
    visa_description: "Stamp 2 Student Visa – Processing time: 4-6 weeks. Requires proof of €7,000 in a bank account for living costs.",
    testimonials: []
  },
  {
    id: "sweden",
    name: "Sweden",
    slug: "sweden",
    flag_emoji: "🇸🇪",
    hero_image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2000",
    tuitionRange: "SEK 80,000 – SEK 140,000/year",
    costOfLiving: "SEK 100,000/year",
    numUniversitiesStr: "39 top institutions",
    workPermitStr: "Job Seeker Visa: 1 year",
    whyStudyHere: [
      "Strong emphasis on group work and practical learning",
      "Incredible work-life balance and lifestyle",
      "1-year job seeker visa after graduation",
      "Hundreds of master's programs taught entirely in English"
    ],
    popular_subjects: ["Engineering", "IT", "Design"],
    top_intakes: ["September"],
    scholarships_list: [
      { name: "Swedish Institute Scholarships", amount: "Full funding", desc: "For global professionals" },
      { name: "KTH Royal Institute Scholarships", amount: "Tuition waiver", desc: "Merit-based" }
    ],
    visa_description: "Residence Permit for Studies – Processing time: 2-3 months. Must prove SEK 9,450 per month for living expenses.",
    testimonials: []
  },
  {
    id: "japan",
    name: "Japan",
    slug: "japan",
    flag_emoji: "🇯🇵",
    hero_image: "https://images.unsplash.com/photo-1544535830-9df3f5687760?q=80&w=2000",
    tuitionRange: "¥500,000 – ¥1,000,000/year",
    costOfLiving: "¥1,200,000/year",
    numUniversitiesStr: "700+ institutions",
    workPermitStr: "Subject to Job Offer",
    whyStudyHere: [
      "State-of-the-art technology and research facilities",
      "Highly attractive fully-funded scholarships like MEXT",
      "Huge job market for graduates and easy work visa conversion",
      "Extremely safe, clean, and culturally rich environment"
    ],
    popular_subjects: ["Engineering", "Robotics", "Japanese Studies"],
    top_intakes: ["April", "October"],
    scholarships_list: [
      { name: "MEXT Scholarship", amount: "Full funding", desc: "Government scholarship covering everything" },
      { name: "JASSO Scholarships", amount: "¥48,000/month", desc: "Privately-financed students" }
    ],
    visa_description: "Student Visa – Processing time: 2-4 weeks. Requires a COE (Certificate of Eligibility) issued by Japanese immigration.",
    testimonials: []
  }
];

export const universities = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    slug: 'mit',
    country_slug: 'united-states',
    city: 'Cambridge, MA',
    world_ranking: 1
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    slug: 'stanford',
    country_slug: 'united-states',
    city: 'Stanford, CA',
    world_ranking: 3
  },
  {
    id: 'manchester',
    name: 'University of Manchester',
    slug: 'university-of-manchester',
    country_slug: 'uk',
    city: 'Manchester',
    world_ranking: 32
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    slug: 'university-of-toronto',
    country_slug: 'canada',
    city: 'Toronto',
    world_ranking: 21
  }
];

export const programs = [];
