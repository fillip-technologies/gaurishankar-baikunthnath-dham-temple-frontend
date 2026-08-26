import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, BedDouble } from 'lucide-react';
import PoojaCatalogueManagement from './PoojaCatalogueManagement';
import RoomCatalogueManagement from './RoomCatalogueManagement';

// Sub-sections of the Catalogue pane, switched by the top navbar.
const SECTIONS = [
  { id: 'pooja', labelEn: 'Pooja', labelHi: 'पूजा', icon: Sparkles },
  { id: 'rooms', labelEn: 'Rooms', labelHi: 'कक्ष', icon: BedDouble },
];

export default function CatalogueManagement() {
  const { i18n } = useTranslation();
  const isHi = i18n.language === 'hi';
  const [section, setSection] = useState('pooja');

  return (
    <div className="space-y-6">
      {/* Top navbar: Pooja | Rooms */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-stone-200 shadow-xs w-full sm:w-fit">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = section === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#c28227] text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isHi ? s.labelHi : s.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active section */}
      {section === 'pooja' ? <PoojaCatalogueManagement /> : <RoomCatalogueManagement />}
    </div>
  );
}
