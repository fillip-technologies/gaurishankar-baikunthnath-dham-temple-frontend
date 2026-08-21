import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import enConstruction from './locales/en/construction.json';
import enPhotos from './locales/en/photos.json';
import enVideos from './locales/en/videos.json';
import enWallpapers from './locales/en/wallpapers.json';
import enMedia from './locales/en/media.json';
import enPoojaBooking from './locales/en/poojaBooking.json';
import enRoomBooking from './locales/en/roomBooking.json';
import enVolunteers from './locales/en/volunteers.json';
import enPriest from './locales/en/priest.json';
import enTrustMembers from './locales/en/trustMembers.json';
import enPoojaAarti from './locales/en/poojaAarti.json';
import enPanchang from './locales/en/panchang.json';
import hiTranslation from './locales/hi/translation.json';
import hiConstruction from './locales/hi/construction.json';
import hiPhotos from './locales/hi/photos.json';
import hiVideos from './locales/hi/videos.json';
import hiWallpapers from './locales/hi/wallpapers.json';
import hiMedia from './locales/hi/media.json';
import hiPoojaBooking from './locales/hi/poojaBooking.json';
import hiRoomBooking from './locales/hi/roomBooking.json';
import hiVolunteers from './locales/hi/volunteers.json';
import hiPriest from './locales/hi/priest.json';
import hiTrustMembers from './locales/hi/trustMembers.json';
import hiPoojaAarti from './locales/hi/poojaAarti.json';
import hiPanchang from './locales/hi/panchang.json';

const resources = {
  en: {
    translation: {
      ...enTranslation,
      constructionPage: enConstruction,
      photosPage: enPhotos,
      videosPage: enVideos,
      wallpapersPage: enWallpapers,
      mediaPage: enMedia,
      poojaBookingPage: enPoojaBooking,
      roomBookingPage: enRoomBooking,
      volunteersPage: enVolunteers,
      priestPage: enPriest,
      trustMembersPage: enTrustMembers,
      poojaAartiPage: enPoojaAarti,
      panchangPage: enPanchang
    }
  },
  hi: {
    translation: {
      ...hiTranslation,
      constructionPage: hiConstruction,
      photosPage: hiPhotos,
      videosPage: hiVideos,
      wallpapersPage: hiWallpapers,
      mediaPage: hiMedia,
      poojaBookingPage: hiPoojaBooking,
      roomBookingPage: hiRoomBooking,
      volunteersPage: hiVolunteers,
      priestPage: hiPriest,
      trustMembersPage: hiTrustMembers,
      poojaAartiPage: hiPoojaAarti,
      panchangPage: hiPanchang
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React handles escaping
    }
  });

export default i18n;
