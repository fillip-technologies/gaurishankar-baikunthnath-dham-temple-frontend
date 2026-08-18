import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Users, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Wifi, 
  Wind, 
  Bath, 
  Tv, 
  Check
} from 'lucide-react';

import roomAcDeluxe from '../../../assets/home/herosection-3.png';
import roomNonAc from '../../../assets/home/herosection-2.png';
import roomSuite from '../../../assets/home/herosection.png';
import roomDormitory from '../../../assets/home/upcoming-festival.png';

export default function RoomList() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const rooms = [
    {
      id: 1,
      image: roomAcDeluxe,
      name: t('roomBookingPage.rooms.0.name', 'AC Deluxe Double Room'),
      tag: t('roomBookingPage.rooms.0.tag', 'Deluxe Comfort'),
      capacity: t('roomBookingPage.rooms.0.capacity', '2 Devotees'),
      price: t('roomBookingPage.rooms.0.price', '₹ 1,200 / night'),
      description: t('roomBookingPage.rooms.0.description', 'Air-conditioned premium double room with attached hygienic bathroom, hot water heater, Ganga ghat view, and double bed.'),
      amenities: [
        t('roomBookingPage.rooms.0.amenities.0', 'Air Conditioning'),
        t('roomBookingPage.rooms.0.amenities.1', 'Hot Water'),
        t('roomBookingPage.rooms.0.amenities.2', 'Attached Bath'),
        t('roomBookingPage.rooms.0.amenities.3', 'Free Wi-Fi'),
        t('roomBookingPage.rooms.0.amenities.4', 'Ganga View')
      ]
    },
    {
      id: 2,
      image: roomNonAc,
      name: t('roomBookingPage.rooms.1.name', 'Non-AC Standard Double Room'),
      tag: t('roomBookingPage.rooms.1.tag', 'Budget Friendly'),
      capacity: t('roomBookingPage.rooms.1.capacity', '2 Devotees'),
      price: t('roomBookingPage.rooms.1.price', '₹ 700 / night'),
      description: t('roomBookingPage.rooms.1.description', 'Clean, spacious non-AC room with ceiling fan, attached bathroom, double bed, and peaceful temple atmosphere.'),
      amenities: [
        t('roomBookingPage.rooms.1.amenities.0', 'Ceiling Fan'),
        t('roomBookingPage.rooms.1.amenities.1', 'Attached Bath'),
        t('roomBookingPage.rooms.1.amenities.2', 'Clean Linen'),
        t('roomBookingPage.rooms.1.amenities.3', 'Peaceful Location')
      ]
    },
    {
      id: 3,
      image: roomSuite,
      name: t('roomBookingPage.rooms.2.name', 'AC Family Suite (4 Bed)'),
      tag: t('roomBookingPage.rooms.2.tag', 'Family Stay'),
      capacity: t('roomBookingPage.rooms.2.capacity', '4 Devotees'),
      price: t('roomBookingPage.rooms.2.price', '₹ 2,200 / night'),
      description: t('roomBookingPage.rooms.2.description', 'Spacious air-conditioned family suite featuring 2 double beds, sitting sofa lounge, LED TV, and private balcony overlooking temple courtyard.'),
      amenities: [
        t('roomBookingPage.rooms.2.amenities.0', '2 Double Beds'),
        t('roomBookingPage.rooms.2.amenities.1', 'Air Conditioning'),
        t('roomBookingPage.rooms.2.amenities.2', 'Sofa Lounge'),
        t('roomBookingPage.rooms.2.amenities.3', 'LED TV'),
        t('roomBookingPage.rooms.2.amenities.4', 'Private Balcony')
      ]
    },
    {
      id: 4,
      image: roomDormitory,
      name: t('roomBookingPage.rooms.3.name', 'Group Dormitory Hall (10 Beds)'),
      tag: t('roomBookingPage.rooms.3.tag', 'Pilgrim Group'),
      capacity: t('roomBookingPage.rooms.3.capacity', '10 Devotees'),
      price: t('roomBookingPage.rooms.3.price', '₹ 150 / bed per night'),
      description: t('roomBookingPage.rooms.3.description', 'Spacious community dormitory hall with individual lockers, clean single beds, shared modern washrooms, and drinking water purifier.'),
      amenities: [
        t('roomBookingPage.rooms.3.amenities.0', 'Individual Bed'),
        t('roomBookingPage.rooms.3.amenities.1', 'Personal Locker'),
        t('roomBookingPage.rooms.3.amenities.2', 'Shared Washrooms'),
        t('roomBookingPage.rooms.3.amenities.3', 'RO Water Purifier')
      ]
    }
  ];

  const rules = [
    t('roomBookingPage.rules.0', 'Valid original Government Photo ID (Aadhaar, Voter ID, Driving License, Passport) is mandatory during check-in for all guests.'),
    t('roomBookingPage.rules.1', 'Smoking, consumption of alcohol, non-vegetarian food, and narcotics are strictly prohibited inside temple premises.'),
    t('roomBookingPage.rules.2', 'Hot water facility is available during morning hours (5:00 AM to 10:00 AM).'),
    t('roomBookingPage.rules.3', 'Pre-booking is recommended during peak festivals like Shravan Somvar, Shivratri, and Chhath Puja.')
  ];

  return (
    <section className="w-full bg-[#f5eee6] py-12 sm:py-16 text-stone-900 font-sans relative overflow-hidden">
      
      {/* Background Watermark Accent */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] opacity-10 pointer-events-none z-0 translate-x-16 -translate-y-16">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#c28227] fill-current">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* Check-in / Check-out Timing Info Bar */}
        <div className="bg-gradient-to-r from-[#2a080d] via-[#38060d] to-[#2a080d] text-white p-6 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-[#c28227] text-white shrink-0 hidden sm:block">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-amber-300 font-hindi">
                <span>{t('roomBookingPage.checkinCheckout.checkin', 'Check-in Time')}: <strong className="text-white font-sans">{t('roomBookingPage.checkinCheckout.checkinVal', '12:00 PM')}</strong></span>
                <span className="text-amber-500">|</span>
                <span>{t('roomBookingPage.checkinCheckout.checkout', 'Check-out Time')}: <strong className="text-white font-sans">{t('roomBookingPage.checkinCheckout.checkoutVal', '11:00 AM')}</strong></span>
              </div>
              <p className="text-xs text-amber-100/80 font-hindi mt-1">
                {t('roomBookingPage.checkinCheckout.idProof', 'Govt Photo ID Required (Aadhaar / Voter ID / Passport)')}
              </p>
            </div>
          </div>

          <div className="bg-[#c28227]/30 border border-[#c28227] px-4 py-2 rounded-full text-[#ffd700] text-xs font-bold font-hindi flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Spiritual Temple Stay</span>
          </div>
        </div>

        {/* Room Stay Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#c28227]"
            >
              <div>
                {/* Room Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-950">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Top Tag & Capacity Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="bg-[#c28227] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md font-hindi">
                      {room.tag}
                    </span>

                    <span className="bg-black/70 backdrop-blur-md text-amber-200 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 font-hindi">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{room.capacity}</span>
                    </span>
                  </div>

                  {/* Bottom Room Name overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className={`text-xl font-bold text-[#ffd700] drop-shadow-md ${
                      currentLang === 'hi' ? 'font-sans' : 'font-cinzel'
                    }`}>
                      {room.name}
                    </h3>
                  </div>
                </div>

                {/* Description & Amenities */}
                <div className="p-6 space-y-4">
                  <p className="text-stone-600 text-xs sm:text-sm font-hindi leading-relaxed">
                    {room.description}
                  </p>

                  {/* Amenities Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {room.amenities.map((amenity, idx) => (
                      <span 
                        key={idx}
                        className="bg-amber-50 text-[#c28227] text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-200/80 flex items-center gap-1 font-hindi"
                      >
                        <Check className="w-3 h-3 text-[#c28227]" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Tariff Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex justify-between items-center bg-stone-50/60">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Tariff Rate:
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#c28227] font-sans bg-amber-100/80 px-4 py-1.5 rounded-xl border border-amber-300">
                  {room.price}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Guidelines & Rules Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
            <div className="p-2 rounded-xl bg-[#c28227] text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-hindi">
              {t('roomBookingPage.rulesTitle', 'Important Yatri Niwas Guidelines & Rules')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-700 font-hindi leading-relaxed">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-200/50">
                <CheckCircle2 className="w-4 h-4 text-[#c28227] shrink-0 mt-0.5" />
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
