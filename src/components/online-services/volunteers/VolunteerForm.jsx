import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Calendar, 
  HeartHandshake, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Users,
  Utensils,
  Sparkle,
  Laptop,
  HeartPulse
} from 'lucide-react';

export default function VolunteerForm() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    cityState: '',
    occupation: '',
    sevaAreas: [],
    availability: 'weekends',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sevaOptions = [
    { id: 'crowd', label: t('volunteersPage.form.sevaAreas.crowd', 'Festival & Crowd Management Seva'), icon: Users },
    { id: 'bhandara', label: t('volunteersPage.form.sevaAreas.bhandara', 'Annakshetra Bhandara & Prasadam Distribution'), icon: Utensils },
    { id: 'sanitation', label: t('volunteersPage.form.sevaAreas.sanitation', 'Temple Cleaning & Environment Seva'), icon: Sparkle },
    { id: 'digital', label: t('volunteersPage.form.sevaAreas.digital', 'Digital, Media & IT Support'), icon: Laptop },
    { id: 'medical', label: t('volunteersPage.form.sevaAreas.medical', 'Medical & First Aid Support'), icon: HeartPulse },
  ];

  const handleCheckboxChange = (sevaId) => {
    setFormData((prev) => {
      const exists = prev.sevaAreas.includes(sevaId);
      if (exists) {
        return { ...prev, sevaAreas: prev.sevaAreas.filter((item) => item !== sevaId) };
      } else {
        return { ...prev, sevaAreas: [...prev.sevaAreas, sevaId] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {isSubmitted ? (
          /* Success Card State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-hindi">
              {t('volunteersPage.form.successTitle', 'Jai Shri Baikunthnath! Application Received Successfully.')}
            </h2>

            <p className="text-stone-600 font-hindi max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              {t('volunteersPage.form.successMsg', 'Thank you for registering as a volunteer. Temple Trust coordinators will contact you soon on your registered phone number.')}
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  age: '',
                  gender: '',
                  cityState: '',
                  occupation: '',
                  sevaAreas: [],
                  availability: 'weekends',
                  message: ''
                });
              }}
              className="px-6 py-2.5 rounded-full bg-[#c28227] hover:bg-[#a86e1e] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          /* Main Volunteer Registration Form */
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl p-6 sm:p-10 space-y-8">
            
            {/* Form Header */}
            <div className="text-center space-y-2 pb-4 border-b border-stone-200">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-[#c28227] px-4 py-1.5 rounded-full text-xs font-bold font-hindi">
                <HeartHandshake className="w-4 h-4" />
                <span>निष्काम सेवा संकल्प</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight ${
                currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
              }`}>
                {t('volunteersPage.title', 'Become a Temple Volunteer (Sevak)')}
              </h2>

              <p className="text-xs sm:text-sm text-stone-500 font-hindi">
                {t('volunteersPage.form.sectionPersonal', 'Personal Information')} & {t('volunteersPage.form.sectionSeva', 'Area of Volunteer Interest')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-stone-900 font-hindi flex items-center gap-2 text-[#c28227]">
                  <User className="w-4 h-4 text-[#c28227]" />
                  <span>1. {t('volunteersPage.form.sectionPersonal', 'Personal Information')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 font-hindi">
                      {t('volunteersPage.form.fullName', 'Full Name')} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 font-hindi">
                      {t('volunteersPage.form.phone', 'Phone / WhatsApp Number')} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 font-hindi">
                      {t('volunteersPage.form.email', 'Email Address')}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Age & Gender */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 font-hindi">
                        {t('volunteersPage.form.age', 'Age')} *
                      </label>
                      <input
                        type="number"
                        required
                        min="16"
                        max="80"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="25"
                        className="w-full px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 font-hindi">
                        {t('volunteersPage.form.gender', 'Gender')} *
                      </label>
                      <select
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      >
                        <option value="">{t('volunteersPage.form.selectGender', 'Select Gender')}</option>
                        <option value="male">{t('volunteersPage.form.male', 'Male')}</option>
                        <option value="female">{t('volunteersPage.form.female', 'Female')}</option>
                        <option value="other">{t('volunteersPage.form.other', 'Other')}</option>
                      </select>
                    </div>
                  </div>

                  {/* City & State */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 font-hindi">
                      {t('volunteersPage.form.cityState', 'City & State')} *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.cityState}
                        onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                        placeholder="Patna, Bihar"
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Occupation */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 font-hindi">
                      {t('volunteersPage.form.occupation', 'Occupation / Profession')}
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        placeholder="Student, Businessman, Teacher, etc."
                        className="w-full pl-9 pr-4 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 2: Seva Areas Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <h3 className="text-base font-bold text-stone-900 font-hindi flex items-center gap-2 text-[#c28227]">
                  <HeartHandshake className="w-4 h-4 text-[#c28227]" />
                  <span>2. {t('volunteersPage.form.sectionSeva', 'Area of Volunteer Interest')} *</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sevaOptions.map((option) => {
                    const IconComp = option.icon;
                    const isChecked = formData.sevaAreas.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        onClick={() => handleCheckboxChange(option.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isChecked
                            ? 'bg-amber-50 border-[#c28227] text-stone-900 shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by div click
                          className="w-4 h-4 text-[#c28227] rounded focus:ring-[#c28227]"
                        />
                        <IconComp className={`w-4 h-4 shrink-0 ${isChecked ? 'text-[#c28227]' : 'text-stone-400'}`} />
                        <span className="text-xs sm:text-sm font-semibold font-hindi leading-snug">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: Availability & Experience */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-base font-bold text-stone-900 font-hindi flex items-center gap-2 text-[#c28227]">
                  <Calendar className="w-4 h-4 text-[#c28227]" />
                  <span>3. {t('volunteersPage.form.sectionAvailability', 'Availability & Time')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'weekends', label: t('volunteersPage.form.availOptions.weekends', 'Saturdays & Sundays') },
                    { id: 'festivals', label: t('volunteersPage.form.availOptions.festivals', 'Special Festivals (Shravan, Shivratri, Chhath)') },
                    { id: 'monthly', label: t('volunteersPage.form.availOptions.monthly', '1-2 Days Every Month') },
                    { id: 'fulltime', label: t('volunteersPage.form.availOptions.fulltime', 'Full Time / Resident Sevak') },
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => setFormData({ ...formData, availability: item.id })}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs sm:text-sm font-semibold font-hindi ${
                        formData.availability === item.id
                          ? 'bg-amber-50 border-[#c28227] text-stone-900'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        checked={formData.availability === item.id}
                        onChange={() => {}}
                        className="w-4 h-4 text-[#c28227]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>

                {/* Message / Experience */}
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-stone-700 font-hindi">
                    {t('volunteersPage.form.experience', 'Previous Volunteer Experience / Message')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('volunteersPage.form.experiencePlaceholder', 'Tell us about your background or motivation to join as a temple volunteer...')}
                    className="w-full px-4 py-3 bg-stone-50 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-[#c28227] focus:bg-white transition-all font-hindi"
                  />
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#c28227] hover:bg-[#a86e1e] text-white text-base font-extrabold font-hindi tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>{t('volunteersPage.form.submitting', 'Submitting Application...')}</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('volunteersPage.form.submitBtn', 'Submit Volunteer Application')}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
