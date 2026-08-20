import React from 'react';
import TopNavbar from './TopNavbar';
import ChantTickerBar from './ChantTickerBar';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      <TopNavbar />
      <ChantTickerBar />
      <Navbar />
    </header>
  );
}
