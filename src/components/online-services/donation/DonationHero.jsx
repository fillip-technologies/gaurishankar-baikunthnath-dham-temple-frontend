import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartHandshake } from 'lucide-react';
import heroBg from '../../../assets/home/herosection.png';

export default function DonationHero() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  return (
    <div className="w-full text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#c28227]/40 relative overflow-hidden">
      <img
        src={heroBg}
        alt="Shri Baikunthnath Dham Online Donation"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-[#2a080d]/50 to-black/65 z-10" />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c28227_1px,transparent_1px)] [background-size:20px_20px] z-15" />

      <div className="max-w-7xl mx-auto relative z-20 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-[#ffd700] text-xs sm:text-sm font-hindi tracking-widest pt-2">
          <HeartHandshake className="w-4 h-4 text-amber-400" />
          <span>{isHi ? '॥ आपके दान से मंदिर का निर्माण एवं सेवा कार्य संभव है ॥' : '॥ Your Donation Empowers Temple Construction & Sacred Service ॥'}</span>
          <HeartHandshake className="w-4 h-4 text-amber-400" />
        </div>

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ffd700] tracking-wider drop-shadow-lg ${isHi ? 'font-sans' : 'font-cinzel'}`}>
          {isHi ? 'ऑनलाइन दान करें' : 'Online Donation'}
        </h1>

        <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#c28227] to-transparent mx-auto my-3" />

        <p className="text-amber-100 text-sm sm:text-base max-w-2xl mx-auto font-hindi font-medium leading-relaxed drop-shadow">
          {isHi
            ? 'मंदिर निर्माण, नित्य अन्नदान, गौसेवा एवं वेद पाठशाला के लिए आपका हर समर्पण पुण्य का भागीदार बनाता है। प्रत्येक दान 80G आयकर छूट हेतु पात्र है।'
            : 'Support Temple Construction, Anna Daan, Gau Seva & Veda Pathshala. Every contribution is eligible for an 80G income tax deduction.'}
        </p>
      </div>
    </div>
  );
}
