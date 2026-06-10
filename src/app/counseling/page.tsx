import React from 'react';
import { Calendar, Video, MessageCircle, Phone, Star } from 'lucide-react';
import './counseling.css';

export default function CounselingPage() {
  return (
    <div className="counseling-page py-12">
      <div className="container max-w-800 mx-auto">
        <div className="text-center mb-12">
          <h1 className="bn h1">ফ্রি কাউন্সেলিং সেশন বুক করো</h1>
          <p className="text-light mt-4 text-lg bn">
            আমাদের এক্সপার্টদের থেকে পারসোনালাইজড গাইডেন্স নাও, যারা ইতোমধ্যে ৫০০+ শিক্ষার্থীকে সাহায্য করেছেন।
          </p>
        </div>

        <div className="steps-row mb-12">
          <div className="step-col text-center">
            <div className="step-circle">1</div>
            <h4 className="bn h3">সময় নির্বাচন করো</h4>
            <p className="text-sm text-light bn">তোমার সুবিধামতো সময় বেছে নাও</p>
          </div>
          <div className="step-col text-center">
            <div className="step-circle">2</div>
            <h4 className="bn h3">এক্সপার্টের সাথে কথা বলো</h4>
            <p className="text-sm text-light bn">তোমার লক্ষ্য নিয়ে আলোচনা করো</p>
          </div>
          <div className="step-col text-center">
            <div className="step-circle">3</div>
            <h4 className="bn h3">রোডম্যাপ পাও</h4>
            <p className="text-sm text-light bn">কাস্টমাইজড প্ল্যান বুঝে নাও</p>
          </div>
        </div>

        <div className="booking-card card mb-12">
          <h2 className="mb-6 bn h2">সেশন বুক করো</h2>
          <form className="booking-form">
            <div className="grid-2-col gap-4 mb-4">
              <div>
                <label className="block mb-2 font-semibold bn">পুরো নাম</label>
                <input type="text" className="input" placeholder="e.g. Rahim Uddin" required />
              </div>
              <div>
                <label className="block mb-2 font-semibold bn">ফোন নম্বর</label>
                <input type="tel" className="input" placeholder="+880..." required />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email Address</label>
              <input type="email" className="input" placeholder="Enter your email" required />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Preferred Format</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="format" defaultChecked /> Video Call</label>
                <label className="flex items-center gap-2"><input type="radio" name="format" /> Phone Call</label>
                <label className="flex items-center gap-2"><input type="radio" name="format" /> WhatsApp</label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Destination of Interest</label>
              <select className="input" defaultValue="">
                <option value="" disabled>Select Country</option>
                <option value="uk">United Kingdom</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="undecided">Not Sure Yet</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg py-3">Book Free Session</button>
            <p className="text-center text-sm text-light mt-4">We usually respond within 24 hours.</p>
          </form>
        </div>

        <div className="counselors-section text-center">
          <h3 className="mb-8">Meet Our Top Counselors</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="counselor-card card">
              <div className="counselor-avatar mb-4"></div>
              <h4>Sarah Ahmed</h4>
              <p className="text-sm text-light mb-2">UK & Canada Specialist</p>
              <div className="flex items-center justify-center gap-1 text-gold">
                <Star size={16} fill="var(--premium-gold-2)"/> 5.0 (120+ Reviews)
              </div>
            </div>
            <div className="counselor-card card">
              <div className="counselor-avatar mb-4"></div>
              <h4>Tanvir Hasan</h4>
              <p className="text-sm text-light mb-2">USA & Australia Specialist</p>
              <div className="flex items-center justify-center gap-1 text-gold">
                <Star size={16} fill="var(--premium-gold-2)"/> 4.9 (90+ Reviews)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
