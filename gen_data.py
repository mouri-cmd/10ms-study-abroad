import json

destinations = [
  {
    "id": "uk",
    "name": "United Kingdom",
    "slug": "united-kingdom",
    "flag_emoji": "🇬🇧",
    "hero_image": "/images/uk-hero.jpg",
    "tagline": "বিশ্বমানের বিশ্ববিদ্যালয় এবং দারুণ ক্যারিয়ারের সুযোগ",
    "why_study_here": [
      "বিশ্বের শীর্ষস্থানীয় ও স্বনামধন্য বিশ্ববিদ্যালয়গুলো এখানে অবস্থিত",
      "২ বছরের পোস্ট-স্টাডি ওয়ার্ক পারমিট (Graduate Route)",
      "১ বছরের মাস্টার্স এবং ৩ বছরের ব্যাচেলর ডিগ্রি",
      "সমৃদ্ধ সংস্কৃতি এবং বিশাল আন্তর্জাতিক শিক্ষার্থী কমিউনিটি"
    ],
    "avg_tuition_min": 12000,
    "avg_tuition_max": 25000,
    "currency": "£",
    "avg_living_cost": 1200,
    "num_universities": 160,
    "post_study_work_permit": "২ বছর",
    "top_intakes": ["September", "January"],
    "popular_subjects": ["Business", "Engineering", "Law", "Medicine"],
    "visa_processing_days": 21,
    "scholarship_count": 350,
    "testimonials": [
      {
        "name": "Rahim U.",
        "photo": "/images/rahim.jpg",
        "university": "University of Manchester",
        "program": "MSc Data Science",
        "quote": "The 1-year master's program is intense but completely worth it. The career support here is excellent for international students."
      }
    ]
  },
  {
    "id": "usa",
    "name": "United States",
    "slug": "united-states",
    "flag_emoji": "🇺🇸",
    "hero_image": "/images/us-hero.jpg",
    "tagline": "গবেষণা এবং টেকনোলজিতে পৃথিবীর সেরা সুযোগ",
    "why_study_here": [
      "সিলিকন ভ্যালি থেকে ওয়াল স্ট্রিট পর্যন্ত বিস্তৃত ক্যারিয়ার অপশন",
      "OPT (Optional Practical Training) সুবিধার মাধ্যমে ৩ বছর পর্যন্ত কাজের সুযোগ",
      "গবেষণা ও ইনোভেশনের জন্য বিশাল ফান্ডিং",
      "বিশ্বের সবচেয়ে বেশি স্কলারশিপ ও অ্যাসিস্ট্যান্টশিপের সুযোগ"
    ],
    "avg_tuition_min": 20000,
    "avg_tuition_max": 55000,
    "currency": "$",
    "avg_living_cost": 1500,
    "num_universities": 4000,
    "post_study_work_permit": "১-৩ বছর (OPT)",
    "top_intakes": ["Fall (Aug)", "Spring (Jan)"],
    "popular_subjects": ["Computer Science", "Business", "Engineering", "Data Science"],
    "visa_processing_days": 45,
    "scholarship_count": 1200,
    "testimonials": [
      {
        "name": "Arif H.",
        "photo": "/images/arif.jpg",
        "university": "NYU",
        "program": "MS CS",
        "quote": "Getting an RA/TA here changes everything. The tech community and networking opportunities are unmatched."
      }
    ]
  },
  {
    "id": "canada",
    "name": "Canada",
    "slug": "canada",
    "flag_emoji": "🇨🇦",
    "hero_image": "/images/ca-hero.jpg",
    "tagline": "নিরাপদ পরিবেশ ও পড়াশোনার পর PR পাওয়ার সুবর্ণ সুযোগ",
    "why_study_here": [
      "পড়াশোনা শেষে সহজে পিআর (PR) পাওয়ার সুযোগ",
      "PGWP এর মাধ্যমে ৩ বছর পর্যন্ত ওয়ার্ক পারমিট",
      "অত্যন্ত নিরাপদ এবং বন্ধুসুলভ পরিবেশ",
      "বিশ্বমানের শিক্ষা ব্যবস্থা কিন্তু আমেরিকার চেয়ে সাশ্রয়ী"
    ],
    "avg_tuition_min": 15000,
    "avg_tuition_max": 40000,
    "currency": "CAD ",
    "avg_living_cost": 1200,
    "num_universities": 100,
    "post_study_work_permit": "৩ বছর পর্যন্ত",
    "top_intakes": ["September", "January", "May"],
    "popular_subjects": ["IT", "Nursing", "Engineering", "Business"],
    "visa_processing_days": 60,
    "scholarship_count": 250,
    "testimonials": [
      {
        "name": "Nusrat J.",
        "photo": "/images/nusrat.jpg",
        "university": "University of Toronto",
        "program": "MBA",
        "quote": "Canada feels like a second home now. The transition from student to working professional is so smooth here."
      }
    ]
  },
  {
    "id": "australia",
    "name": "Australia",
    "slug": "australia",
    "flag_emoji": "🇦🇺",
    "hero_image": "/images/au-hero.jpg",
    "tagline": "অসাধারণ আবহাওয়া এবং হাই-পেয়িং পার্ট-টাইম জবের সুযোগ",
    "why_study_here": [
      "উচ্চমানের জীবনযাত্রা এবং অসাধারণ প্রাকৃতিক সৌন্দর্য",
      "২-৪ বছরের পোস্ট স্টাডি ওয়ার্ক পারমিট",
      "পড়াশোনার পাশাপাশি পার্ট-টাইম কাজের মাধ্যমে ভালো আয়",
      "অস্ট্রেলিয়া অ্যাওয়ার্ডস এর মতো বিশাল স্কলারশিপ"
    ],
    "avg_tuition_min": 20000,
    "avg_tuition_max": 45000,
    "currency": "AUD ",
    "avg_living_cost": 1800,
    "num_universities": 43,
    "post_study_work_permit": "২-৪ বছর",
    "top_intakes": ["February", "July"],
    "popular_subjects": ["Accounting", "IT", "Healthcare", "Engineering"],
    "visa_processing_days": 30,
    "scholarship_count": 180,
    "testimonials": []
  },
  {
    "id": "germany",
    "name": "Germany",
    "slug": "germany",
    "flag_emoji": "🇩🇪",
    "hero_image": "/images/de-hero.jpg",
    "tagline": "পাবলিক ইউনিভার্সিটিতে ফ্রি টিউশন ও বিশ্বসেরা ইঞ্জিনিয়ারিং",
    "why_study_here": [
      "অধিকাংশ পাবলিক বিশ্ববিদ্যালয়ে টিউশন ফি সম্পূর্ণ ফ্রি",
      "ইঞ্জিনিয়ারিং ও টেকনোলজির জন্য ইউরোপের হাব",
      "পড়াশোনা শেষে ১৮ মাসের জব সিকার ভিসা",
      "শেঞ্জেন ভিসায় পুরো ইউরোপ ঘোরার সুযোগ"
    ],
    "avg_tuition_min": 0,
    "avg_tuition_max": 3000,
    "currency": "€",
    "avg_living_cost": 900,
    "num_universities": 400,
    "post_study_work_permit": "১৮ মাস",
    "top_intakes": ["October", "April"],
    "popular_subjects": ["Mechanical Engineering", "Automotive", "CS", "Business"],
    "visa_processing_days": 40,
    "scholarship_count": 500,
    "testimonials": []
  },
  {
    "id": "malaysia",
    "name": "Malaysia",
    "slug": "malaysia",
    "flag_emoji": "🇲🇾",
    "hero_image": "/images/my-hero.jpg",
    "tagline": "সাশ্রয়ী খরচে বিশ্বমানের ডিগ্রি ও হালাল পরিবেশ",
    "why_study_here": [
      "বাংলাদেশের খুব কাছে এবং কালচারাল মিল",
      "ইউকে ও অস্ট্রেলিয়ার টপ ভার্সিটির ব্রাঞ্চ ক্যাম্পাস",
      "অনেক সাশ্রয়ী টিউশন ফি এবং লিভিং কস্ট",
      "সহজ ভিসা প্রসেসিং ও হালাল খাবারের সুবিধা"
    ],
    "avg_tuition_min": 15000,
    "avg_tuition_max": 35000,
    "currency": "RM ",
    "avg_living_cost": 1500,
    "num_universities": 100,
    "post_study_work_permit": "অফার সাপেক্ষে",
    "top_intakes": ["March", "July", "October"],
    "popular_subjects": ["Islamic Finance", "Business", "Engineering", "IT"],
    "visa_processing_days": 14,
    "scholarship_count": 120,
    "testimonials": []
  },
  {
    "id": "newzealand",
    "name": "New Zealand",
    "slug": "new-zealand",
    "flag_emoji": "🇳🇿",
    "hero_image": "/images/nz-hero.jpg",
    "tagline": "শান্তিপূর্ণ জীবন এবং চমৎকার পড়াশোনার পরিবেশ",
    "why_study_here": [
      "বিশ্বের অন্যতম নিরাপদ এবং দুর্নীতিমুক্ত দেশ",
      "প্রতিটি বিশ্ববিদ্যালয়ই গ্লোবাল র‍্যাংকিং-এ এগিয়ে",
      "৩ বছর পর্যন্ত পোস্ট-স্টাডি ওয়ার্ক ভিসা",
      "পরিবার নিয়ে যাওয়ার সহজ সুযোগ"
    ],
    "avg_tuition_min": 25000,
    "avg_tuition_max": 40000,
    "currency": "NZD ",
    "avg_living_cost": 1500,
    "num_universities": 8,
    "post_study_work_permit": "৩ বছর পর্যন্ত",
    "top_intakes": ["February", "July"],
    "popular_subjects": ["Agriculture", "Engineering", "Business", "Environmental Science"],
    "visa_processing_days": 35,
    "scholarship_count": 90,
    "testimonials": []
  },
  {
    "id": "ireland",
    "name": "Ireland",
    "slug": "ireland",
    "flag_emoji": "🇮🇪",
    "hero_image": "/images/ie-hero.jpg",
    "tagline": "ইউরোপের টেক হাব এবং দ্রুত বর্ধনশীল অর্থনীতি",
    "why_study_here": [
      "গুগল, মেটা সহ বড় বড় টেক কোম্পানির ইউরোপিয়ান হেডকোয়ার্টার",
      "২ বছর পর্যন্ত পোস্ট-স্টাডি ওয়ার্ক পারমিট",
      "ইংরেজি ভাষাভাষী দেশ হওয়ায় কমিউনিকেশন সহজ",
      "পড়াশোনা শেষে আইটি সেক্টরে দারুণ জব মার্কেট"
    ],
    "avg_tuition_min": 10000,
    "avg_tuition_max": 25000,
    "currency": "€",
    "avg_living_cost": 1200,
    "num_universities": 12,
    "post_study_work_permit": "২ বছর",
    "top_intakes": ["September", "January"],
    "popular_subjects": ["Data Analytics", "Pharma", "Business", "CS"],
    "visa_processing_days": 28,
    "scholarship_count": 150,
    "testimonials": []
  },
  {
    "id": "sweden",
    "name": "Sweden",
    "slug": "sweden",
    "flag_emoji": "🇸🇪",
    "hero_image": "/images/se-hero.jpg",
    "tagline": "উদ্ভাবনী শিক্ষা ব্যবস্থা ও টেকসই উন্নয়ন",
    "why_study_here": [
      "গ্রুপ ওয়ার্ক এবং প্র্যাকটিক্যাল লার্নিং এর উপর জোর",
      "অসাধারণ লাইফস্টাইল এবং ওয়ার্ক-লাইফ ব্যালেন্স",
      "পড়াশোনা শেষে ১ বছরের জব সিকার ভিসা",
      "ইংরেজিতে অনেক মাস্টার্স প্রোগ্রাম অ্যাভেইলেবল"
    ],
    "avg_tuition_min": 80000,
    "avg_tuition_max": 140000,
    "currency": "SEK ",
    "avg_living_cost": 8500,
    "num_universities": 39,
    "post_study_work_permit": "১ বছর",
    "top_intakes": ["Autumn (Aug)", "Spring (Jan)"],
    "popular_subjects": ["Sustainability", "Design", "Engineering", "IT"],
    "visa_processing_days": 40,
    "scholarship_count": 80,
    "testimonials": []
  },
  {
    "id": "japan",
    "name": "Japan",
    "slug": "japan",
    "flag_emoji": "🇯🇵",
    "hero_image": "/images/jp-hero.jpg",
    "tagline": "প্রযুক্তির স্বর্গরাজ্য এবং বিশাল এমপ্লয়মেন্ট মার্কেট",
    "why_study_here": [
      "অত্যাধুনিক প্রযুক্তি এবং গবেষণার সুযোগ",
      "MEXT এর মতো আকর্ষণীয় সম্পূর্ণ ফ্রি স্কলারশিপ",
      "গ্র্যাজুয়েটদের জন্য বিশাল চাকরির বাজার ও সহজ ভিসা",
      "অত্যন্ত নিরাপদ এবং পরিচ্ছন্ন পরিবেশ"
    ],
    "avg_tuition_min": 500000,
    "avg_tuition_max": 1000000,
    "currency": "¥",
    "avg_living_cost": 100000,
    "num_universities": 700,
    "post_study_work_permit": "জব অফার সাপেক্ষে",
    "top_intakes": ["April", "October"],
    "popular_subjects": ["Robotics", "Engineering", "Business", "Arts"],
    "visa_processing_days": 20,
    "scholarship_count": 300,
    "testimonials": []
  }
]

import re

with open('src/data/destinations.ts', 'r') as f:
    content = f.read()

# Replace destinations block
# Find export const destinations = [...]
dest_json = json.dumps(destinations, indent=2)
new_content = re.sub(r'export const destinations = \[.*?\];', f'export const destinations = {dest_json};', content, flags=re.DOTALL)

with open('src/data/destinations.ts', 'w') as f:
    f.write(new_content)

print("Updated src/data/destinations.ts successfully!")
