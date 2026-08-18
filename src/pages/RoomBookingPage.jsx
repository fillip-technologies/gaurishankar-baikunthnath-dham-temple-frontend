import React from 'react';
import RoomBookingHero from '../components/online-services/room-booking/RoomBookingHero';
import RoomList from '../components/online-services/room-booking/RoomList';

export default function RoomBookingPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <RoomBookingHero />
      <RoomList />
    </main>
  );
}
