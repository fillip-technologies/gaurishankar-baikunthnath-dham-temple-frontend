import React from 'react';
import WelcomeFlowerShower from '../components/home/WelcomeFlowerShower';
import Hero from '../components/home/Hero';
import UpcomingEvents from '../components/home/UpcomingEvents';
import AboutSection from '../components/home/AboutSection';
import LiveDarshanSection from '../components/home/LiveDarshanSection';
import MandirScheduleSection from '../components/home/MandirScheduleSection';
import QuickLinksSection from '../components/home/QuickLinksSection';
import DonationSection from '../components/home/DonationSection';
import GallerySection from '../components/home/GallerySection';

export default function HomePage() {
  return (
    <main className="w-full bg-[#fcf8f2] text-stone-900 min-h-[80vh] relative">
      <WelcomeFlowerShower />
      <Hero />
      <UpcomingEvents />
      <AboutSection />
      <LiveDarshanSection />
      <MandirScheduleSection />
      <QuickLinksSection />
      <DonationSection />
      <GallerySection />
    </main>
  );
}
