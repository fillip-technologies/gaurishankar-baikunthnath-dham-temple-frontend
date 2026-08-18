import React from 'react';
import AboutUsHero from '../components/about/about-us/AboutUsHero';
import AboutUsStory from '../components/about/about-us/AboutUsStory';
import AboutUsPillars from '../components/about/about-us/AboutUsPillars';
import AboutUsTrustInfo from '../components/about/about-us/AboutUsTrustInfo';

export default function AboutUsPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <AboutUsHero />
      <AboutUsStory />
      <AboutUsPillars />
      <AboutUsTrustInfo />
    </main>
  );
}
