
import React, { useState, useEffect } from 'react';
import { MENU_LINKS, FOOTER_LINKS } from './constants';

const getBanglaDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
  const formatter = new Intl.DateTimeFormat('bn-BD', options);
  const parts = formatter.formatToParts(date);
  
  const find = (type: string) => parts.find(p => p.type === type)?.value || '';
  
  const month = date.getMonth();
  let season = '';
  if (month === 3 || month === 4) season = 'গ্রীষ্ম';
  else if (month === 5 || month === 6) season = 'বর্ষা';
  else if (month === 7 || month === 8) season = 'শরৎ';
  else if (month === 9 || month === 10) season = 'হেমন্ত';
  else if (month === 11 || month === 0) season = 'শীত';
  else season = 'বসন্ত';

  return {
    day: find('weekday'),
    date: `${find('day')} ${find('month')}, ${find('year')}`,
    season: season
  };
};

// Mock data for multiple institutions to demonstrate the "See More" feature
const ALL_INSTITUTIONS = [
  { id: 'ayenuddin', name: 'আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়', type: 'মাধ্যমিক স্কুল', location: 'আমিনপুর, পাবনা', image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg', category: 'হাইস্কুল' },
  { id: 'degree_college', name: 'আমিনপুর ডিগ্রি কলেজ', type: 'কলেজ', location: 'আমিনপুর বাজার', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800', category: 'কলেজ' },
  { id: 'fazila_college', name: 'মাশকুরা ফজিলাতুন্নেসা মহিলা কলেজ', type: 'কলেজ', location: 'আমিনপুর', image: 'https://images.unsplash.com/photo-1523050853051-be991f85a6ad?auto=format&fit=crop&q=80&w=800', category: 'কলেজ' },
  { id: 'model_madrasa', name: 'আমিনপুর মডেল আলিম মাদ্রাসা', type: 'মাদ্রাসা', location: 'আমিনপুর', image: 'https://images.unsplash.com/photo-1574621100236-d25b64cfd647?auto=format&fit=crop&q=80&w=800', category: 'মাদ্রাসা' },
  { id: 'syedpur_high', name: 'সৈয়দপুর উচ্চ বিদ্যালয়', type: 'মাধ্যমিক স্কুল', location: 'সৈয়দপুর', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', category: 'হাইস্কুল' },
  { id: 'notabaria_high', name: 'নটাবাড়িয়া উচ্চ বিদ্যালয়', type: 'মাধ্যমিক স্কুল', location: 'নটাবাড়িয়া', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800', category: 'হাইস্কুল' },
  { id: 'kashinathpur_madrasa', name: 'কাশিনাথপুর মহিলা দাখিল মাদ্রাসা', type: 'মাদ্রাসা', location: 'কাশিনাথপুর', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800', category: 'মাদ্রাসা' },
  { id: 'primary_school_1', name: 'আমিনপুর সরকারি প্রাথমিক বিদ্যালয়', type: 'প্রাইমারি স্কুল', location: 'আমিনপুর', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', category: 'প্রাইমারি স্কুল' },
];

// Updated InstitutionCard with responsive font sizes for 2-column mobile layout
const InstitutionCard: React.FC<{ item: any, isDarkMode: boolean, onClick: () => void }> = ({ item, isDarkMode, onClick }) => (
  <div 
    onClick={onClick}
    className={`group cursor-pointer rounded-2xl sm:rounded-[2rem] overflow-hidden border transition-all duration-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1'}`}
  >
    {/* 16:8 Aspect Ratio (padding-bottom: 50%) */}
    <div className="relative w-full pb-[50%] overflow-hidden">
      <img 
        src={item.image} 
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6">
        <span className="bg-indigo-600 text-[6px] sm:text-[9px] text-white font-black uppercase px-1.5 py-0.5 rounded-full mb-1 sm:mb-2 inline-block tracking-tighter">{item.type}</span>
        <h4 className="text-white font-black text-[10px] sm:text-base md:text-xl lg:text-2xl drop-shadow-lg leading-tight group-hover:text-indigo-200 transition-colors line-clamp-2">
          {item.name}
        </h4>
        <div className="flex items-center mt-1 sm:mt-2 text-white/60 text-[7px] sm:text-[10px] font-bold uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
          <span className="truncate">{item.location}</span>
        </div>
      </div>
    </div>
  </div>
);

const HighSchoolDetail = ({ isDarkMode, onBack }: { isDarkMode: boolean, onBack: () => void }) => (
  <div className="animate-fadeIn space-y-10 pb-20">
    <button onClick={onBack} className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all mb-4 ${isDarkMode ? 'bg-slate-800 text-indigo-400 hover:bg-slate-700' : 'bg-white text-indigo-600 shadow-sm hover:shadow-md border border-indigo-50'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      <span className="font-bold">তালিকায় ফিরুন</span>
    </button>

    <div className="relative group overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg" alt="School" className="w-full h-64 md:h-[500px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-6 md:p-12">
        <div className="text-white">
          <span className="bg-indigo-600 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 inline-block tracking-widest">স্থাপিত: স্বনামধন্য প্রতিষ্ঠান</span>
          <h2 className="text-2xl md:text-5xl font-black mb-3 leading-tight">আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়</h2>
          <p className="text-sm md:text-base font-medium opacity-70 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            আমিনপুর, বেরা, পাবনা
          </p>
        </div>
      </div>
    </div>

    {/* Details Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {[{ l: 'EIIN', v: '125313', i: '🆔' }, { l: 'বোর্ড', v: 'রাজশাহী', i: '🎓' }, { l: 'শ্রেণি', v: '৬ষ্ঠ–১০ম', i: '📚' }, { l: 'ধরণ', v: 'MPO', i: '🏛️' }].map((info, i) => (
        <div key={i} className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <span className="text-xl sm:text-2xl mb-1 block">{info.i}</span>
          <p className="text-[10px] font-black uppercase opacity-40 mb-1">{info.l}</p>
          <p className="text-xs sm:text-sm font-bold">{info.v}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-12">
        <section>
          <h3 className="text-xl sm:text-2xl font-black mb-4 flex items-center"><span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white mr-3 sm:mr-4 text-sm sm:text-base">📘</span> প্রতিষ্ঠান পরিচিতি</h3>
          <p className="text-base sm:text-lg leading-relaxed opacity-80">আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয় একটি স্বনামধন্য মাধ্যমিক শিক্ষা প্রতিষ্ঠান। এটি পাবনা জেলার বেরা উপজেলার আমিনপুর এলাকায় অবস্থিত।</p>
        </section>
        <section className={`p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border-2 border-dashed ${isDarkMode ? 'border-indigo-500/20' : 'border-indigo-100'}`}>
          <h3 className="text-lg sm:text-xl font-black mb-4 text-indigo-600 dark:text-indigo-400">🎓 শিক্ষা কার্যক্রম</h3>
          <p className="opacity-80 text-sm sm:text-base">জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুসারে পাঠদান করা হয়।</p>
        </section>
      </div>
    </div>
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [banglaInfo, setBanglaInfo] = useState(getBanglaDate());
  const [activeCategory, setActiveCategory] = useState('সব');
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
  const [isFullListView, setIsFullListView] = useState(false);

  const taglines = ["আমিনপুরের তথ্যকোষ", "ডিজিটাল তথ্যকেন্দ্র"];
  const subCategories = ["সব", "কলেজ", "হাইস্কুল", "প্রাইমারি স্কুল", "মাদ্রাসা", "কিন্ডারগার্টেন"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Filter logic
  const filteredItems = activeCategory === 'সব' 
    ? ALL_INSTITUTIONS 
    : ALL_INSTITUTIONS.filter(item => item.category === activeCategory);

  const displayItems = isFullListView ? filteredItems : filteredItems.slice(0, 6);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} font-['SolaimanLipi']`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-slate-800/90' : 'bg-indigo-600'} text-white shadow-lg backdrop-blur-md`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-black tracking-tight cursor-pointer" onClick={() => {setSelectedInstitution(null); setIsFullListView(false); setActiveCategory('সব');}}>আমিনপুর থানা পাবনা</h1>
            <p className="text-[10px] sm:text-sm font-bold text-indigo-100/80">{taglines[taglineIndex]}</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400 text-slate-900' : 'bg-indigo-700 text-white'} hover:scale-110`}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow container mx-auto px-4 sm:px-6 py-6 sm:py-10`}>
        
        {!selectedInstitution ? (
          <>
            {/* Page Header and Categories */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
              <div className="flex items-center space-x-3">
                <div className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
                <h3 className="text-lg sm:text-2xl font-black tracking-tight">
                  {isFullListView ? 'সকল শিক্ষা প্রতিষ্ঠান' : 'শিক্ষা প্রতিষ্ঠান সমূহ'}
                </h3>
              </div>

              {isFullListView && (
                <button 
                  onClick={() => setIsFullListView(false)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border ${isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  <span>পিছনে</span>
                </button>
              )}
            </div>

            {/* Horizontal Categories */}
            <div className="relative mb-6 sm:mb-10 overflow-x-auto scrollbar-hide pb-2">
              <div className="flex space-x-2 sm:space-x-3 whitespace-nowrap">
                {subCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setIsFullListView(false); }}
                    className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-sm font-bold transition-all ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : (isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 border border-slate-200')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Grid Display (Now 2 columns on mobile too) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 animate-fadeIn">
              {displayItems.length > 0 ? (
                displayItems.map((item) => (
                  <InstitutionCard 
                    key={item.id} 
                    item={item} 
                    isDarkMode={isDarkMode} 
                    onClick={() => setSelectedInstitution(item.id)} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 sm:py-20 border-2 border-dashed rounded-2xl sm:rounded-[2.5rem] opacity-20 border-current">
                  <p className="text-xs sm:text-sm font-bold italic">এই ক্যাটাগরিতে তথ্য শীঘ্রই যোগ করা হবে...</p>
                </div>
              )}
            </div>

            {/* "See More" Button Logic */}
            {!isFullListView && filteredItems.length > 6 && (
              <div className="mt-10 sm:mt-16 flex justify-center">
                <button 
                  onClick={() => {
                    setIsFullListView(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group flex items-center space-x-2 sm:space-x-3 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-black text-sm sm:text-lg transition-all transform active:scale-95 ${
                    isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'
                  }`}
                >
                  <span>আরও দেখুন</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Detail View */
          <div className="animate-fadeIn">
            {selectedInstitution === 'ayenuddin' ? (
              <HighSchoolDetail isDarkMode={isDarkMode} onBack={() => setSelectedInstitution(null)} />
            ) : (
              <div className="text-center py-20">
                <button onClick={() => setSelectedInstitution(null)} className="mb-8 font-bold text-indigo-600">পিছনে</button>
                <h2 className="text-xl sm:text-3xl font-black">{ALL_INSTITUTIONS.find(i => i.id === selectedInstitution)?.name}</h2>
                <p className="mt-4 text-xs sm:text-base opacity-60">এই প্রতিষ্ঠানের বিস্তারিত তথ্য সংগ্রহ করা হচ্ছে...</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`mt-auto transition-colors duration-500 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="container mx-auto px-6 py-8 sm:py-12 text-center">
          <p className="text-[10px] sm:text-xs font-bold opacity-70">© {new Date().getFullYear()} আমিনপুর থানা পাবনা | ডিজিটাল তথ্যকেন্দ্র</p>
        </div>
      </footer>

      {/* Sidebar Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-2xl p-6`}>
           <div className="flex justify-between items-center mb-10 border-b pb-4">
              <span className="font-black text-xl">প্রধান মেনু</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl">✕</button>
           </div>
           <nav className="space-y-2">
              {MENU_LINKS.map(link => (
                <button key={link.id} onClick={() => {setIsMenuOpen(false); setSelectedInstitution(null); setIsFullListView(false);}} className={`w-full text-left p-4 rounded-2xl font-bold ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-50'}`}>
                  {link.label}
                </button>
              ))}
           </nav>
        </div>
      </div>
    </div>
  );
}
