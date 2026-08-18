import React from 'react';
import TrustMembersHero from '../components/members/trust-members/TrustMembersHero';
import TrustMembersList from '../components/members/trust-members/TrustMembersList';

export default function TrustMembersPage() {
  return (
    <main className="w-full bg-stone-950 text-white min-h-[80vh] relative">
      <TrustMembersHero />
      <TrustMembersList />
    </main>
  );
}
