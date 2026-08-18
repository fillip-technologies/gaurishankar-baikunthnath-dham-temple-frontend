import React from 'react';
import VolunteersHero from '../components/online-services/volunteers/VolunteersHero';
import VolunteerForm from '../components/online-services/volunteers/VolunteerForm';

export default function VolunteersPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <VolunteersHero />
      <VolunteerForm />
    </main>
  );
}
