import { getPanchangam, Observer, getFestivals } from '@ishubhamx/panchangam-js';

export const SACRED_CITIES = [
  { id: 'baikunth', name: 'Shri Baikunthnath Dham', hindiName: 'श्री बैकुंठनाथ धाम', lat: 25.5941, lon: 85.1376, elevation: 53, tzOffset: 330 },
  { id: 'ayodhya', name: 'Ayodhya Dham', hindiName: 'अयोध्या धाम', lat: 26.7922, lon: 82.1998, elevation: 93, tzOffset: 330 },
  { id: 'varanasi', name: 'Kashi Vishwanath (Varanasi)', hindiName: 'काशी विश्वनाथ (वाराणसी)', lat: 25.3176, lon: 82.9739, elevation: 81, tzOffset: 330 },
  { id: 'haridwar', name: 'Haridwar', hindiName: 'हरिद्वार', lat: 29.9457, lon: 78.1642, elevation: 314, tzOffset: 330 },
  { id: 'ujjain', name: 'Ujjain Mahakaleshwar', hindiName: 'उज्जैन महाकालेश्वर', lat: 23.1765, lon: 75.7885, elevation: 494, tzOffset: 330 },
  { id: 'mathura', name: 'Mathura - Vrindavan', hindiName: 'मथुरा - वृन्दावन', lat: 27.4924, lon: 77.6737, elevation: 174, tzOffset: 330 },
  { id: 'delhi', name: 'New Delhi', hindiName: 'नई दिल्ली', lat: 28.6139, lon: 77.2090, elevation: 216, tzOffset: 330 },
  { id: 'patna', name: 'Patna', hindiName: 'पटना', lat: 25.5941, lon: 85.1376, elevation: 53, tzOffset: 330 },
  { id: 'mumbai', name: 'Mumbai', hindiName: 'मुंबई', lat: 19.0760, lon: 72.8777, elevation: 14, tzOffset: 330 },
  { id: 'kolkata', name: 'Kolkata', hindiName: 'कोलकाता', lat: 22.5726, lon: 88.3639, elevation: 9, tzOffset: 330 },
  { id: 'bengaluru', name: 'Bengaluru', hindiName: 'बेंगलुरु', lat: 12.9716, lon: 77.5946, elevation: 920, tzOffset: 330 }
];

export const TITHI_DEITIES = {
  1: { en: 'Agni (Fire God)', hi: 'अग्नि देव' },
  2: { en: 'Lord Brahma', hi: 'ब्रह्मा जी' },
  3: { en: 'Maa Gauri', hi: 'माँ गौरी' },
  4: { en: 'Lord Ganesha', hi: 'भगवान गणेश' },
  5: { en: 'Naga Devatas & Saraswati', hi: 'नाग देवता व माँ सरस्वती' },
  6: { en: 'Lord Kartikeya (Skanda)', hi: 'भगवान कार्तिकेय (स्कंद)' },
  7: { en: 'Lord Surya', hi: 'सूर्य देव' },
  8: { en: 'Maa Durga & Lord Shiva', hi: 'माँ दुर्गा व भगवान शिव' },
  9: { en: 'Maa Durga & Lord Rama', hi: 'माँ दुर्गा व प्रभु श्री राम' },
  10: { en: 'Yamaraja / Ten Digpalas', hi: 'धर्मराज यम व दिग्पाल' },
  11: { en: 'Lord Maha Vishnu (Ekadashi Vrat)', hi: 'भगवान महाविष्णु (एकादशी व्रत)' },
  12: { en: 'Lord Vishnu & Tulsi Devi', hi: 'भगवान विष्णु व तुलसी माता' },
  13: { en: 'Lord Shiva & Kamadeva (Pradosh)', hi: 'भगवान शिव व कामदेव (प्रदोष)' },
  14: { en: 'Lord Rudra & Maa Kali', hi: 'भगवान रुद्र व माँ काली' },
  15: { en: 'Maa Lakshmi & Lord Satyanarayana (Purnima)', hi: 'माँ लक्ष्मी व सत्यनारायण (पूर्णिमा)' },
  30: { en: 'Pitru Devas & Maa Kali (Amavasya)', hi: 'पितृ देव व माँ काली (अमावस्या)' }
};

export const VARA_DETAILS = [
  { enName: 'Ravivaar (Sunday)', hiName: 'रविवार', deityEn: 'Lord Surya', deityHi: 'सूर्य देव', planetEn: 'Sun (Surya)', planetHi: 'सूर्य' },
  { enName: 'Somvaar (Monday)', hiName: 'सोमवार', deityEn: 'Lord Shiva & Chandra', deityHi: 'भगवान शिव व चंद्र देव', planetEn: 'Moon (Chandra)', planetHi: 'चंद्र' },
  { enName: 'Mangalvaar (Tuesday)', hiName: 'मंगलवार', deityEn: 'Lord Hanuman & Kartikeya', deityHi: 'श्री हनुमान जी व कार्तिकेय', planetEn: 'Mars (Mangal)', planetHi: 'मंगल' },
  { enName: 'Budhvaar (Wednesday)', hiName: 'बुधवार', deityEn: 'Lord Ganesha & Vishnu', deityHi: 'श्री गणेश जी व विष्णु जी', planetEn: 'Mercury (Budh)', planetHi: 'बुध' },
  { enName: 'Guruvaar (Thursday)', hiName: 'गुरुवार / बृहस्पतिवार', deityEn: 'Lord Vishnu & Brihaspati', deityHi: 'भगवान श्री हरि विष्णु व बृहस्पति देव', planetEn: 'Jupiter (Guru)', planetHi: 'बृहस्पति' },
  { enName: 'Shukravaar (Friday)', hiName: 'शुक्रवार', deityEn: 'Maa Lakshmi & Santoshi Maa', deityHi: 'माँ महालक्ष्मी व संतोषी माता', planetEn: 'Venus (Shukra)', planetHi: 'शुक्र' },
  { enName: 'Shanivaar (Saturday)', hiName: 'शनिवार', deityEn: 'Lord Shani Dev & Hanuman', deityHi: 'भगवान शनिदेव व हनुमान जी', planetEn: 'Saturn (Shani)', planetHi: 'शनि' }
];

export function formatTimeSafe(dateVal) {
  if (!dateVal) return '--:--';
  const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
  if (!(d instanceof Date) || isNaN(d.getTime())) return '--:--';
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export function formatFullDate(dateVal, lang = 'en') {
  if (!dateVal) return '';
  const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
  if (!(d instanceof Date) || isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function isTimeInRange(startTime, endTime, targetTime = new Date()) {
  if (!startTime || !endTime) return false;
  const s = new Date(startTime).getTime();
  const e = new Date(endTime).getTime();
  const t = targetTime.getTime();
  return t >= s && t <= e;
}

export function calculateTemplePanchang(dateObj, cityObj) {
  try {
    const observer = new Observer(cityObj.lat, cityObj.lon, cityObj.elevation || 100);
    const panchang = getPanchangam(dateObj, observer, {
      timezoneOffset: cityObj.tzOffset || 330,
      calendarType: 'purnimanta'
    });

    let detectedFestivals = panchang.festivals || [];
    if (detectedFestivals.length === 0) {
      try {
        detectedFestivals = getFestivals({
          date: dateObj,
          observer,
          timezoneOffset: cityObj.tzOffset || 330
        }) || [];
      } catch (err) {
        console.warn('Festival lookup fallback:', err);
      }
    }

    return {
      success: true,
      data: panchang,
      festivals: detectedFestivals,
      city: cityObj,
      date: dateObj
    };
  } catch (error) {
    console.error('Panchang calculation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
