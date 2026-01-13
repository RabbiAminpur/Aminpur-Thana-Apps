
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

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [banglaInfo, setBanglaInfo] = useState(getBanglaDate());
  const [activeCategory, setActiveCategory] = useState('কলেজ');

  const taglines = ["আমিনপুরের তথ্যকোষ", "ডিজিটাল তথ্যকেন্দ্র"];
  const subCategories = ["কলেজ", "হাইস্কুল", "প্রাইমারি স্কুল", "মাদ্রাসা", "কিন্ডারগার্টেন"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} font-['SolaimanLipi']`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-slate-800/90' : 'bg-indigo-600'} text-white shadow-lg backdrop-blur-md`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tight">আমিনপুর থানা পাবনা</h1>
            <div className="h-5 overflow-hidden">
              <p className="text-xs md:text-sm font-bold text-indigo-100/80">
                {taglines[taglineIndex]}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400 text-slate-900' : 'bg-indigo-700 text-white'} hover:scale-110`}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Info Card */}
      <section className="container mx-auto px-6 mt-6">
        <div className={`p-4 rounded-2xl shadow-sm border transition-all duration-500 flex items-center justify-between ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-indigo-50'} animate-fadeIn`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pulse ${isDarkMode ? 'bg-indigo-900/50' : 'bg-indigo-50 text-indigo-600'}`}>
              🗓️
            </div>
            <div>
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{banglaInfo.day}</h2>
              <p className="text-xs font-medium opacity-70">{banglaInfo.date}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-600 text-white'}`}>
              ঋতু: {banglaInfo.season}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-6 py-10">
        
        {/* Education Section */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-2 h-8 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
            <h3 className="text-2xl font-black tracking-tight">শিক্ষা প্রতিষ্ঠান সমূহ</h3>
          </div>

          {/* Horizontal Sub-Category Navigation */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2">
              <div className="flex space-x-3 whitespace-nowrap">
                {subCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                      activeCategory === cat
                        ? (isDarkMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-indigo-600 text-white shadow-md')
                        : (isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Soft gradient fade for scroll indicator */}
            <div className={`absolute top-0 right-0 h-[calc(100%-1rem)] w-12 pointer-events-none bg-gradient-to-l ${isDarkMode ? 'from-slate-900' : 'from-slate-50'} opacity-50`}></div>
          </div>

          {/* Empty state placeholder for selected category content */}
          <div className="mt-10 text-center py-20 border-2 border-dashed rounded-3xl opacity-20 border-current">
            <p className="text-sm font-bold italic">তালিকাবদ্ধ তথ্য শীঘ্রই যোগ করা হবে...</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={`mt-auto transition-colors duration-500 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:gap-20 mb-10">
            <div>
              <h4 className={`text-xs font-black mb-4 uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>প্রয়োজনীয় লিংক</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.column1.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="text-xs md:text-sm hover:text-indigo-500 transition-colors font-bold block">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xs font-black mb-4 uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>অন্যান্য তথ্য</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.column2.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="text-xs md:text-sm hover:text-indigo-500 transition-colors font-bold block">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200/20 text-center">
            <p className="text-xs font-bold opacity-70">
              © {new Date().getFullYear()} আমিনপুর থানা পাবনা | সর্বস্বত্ব সংরক্ষিত
            </p>
            <p className="text-[10px] mt-1.5 opacity-40 font-bold uppercase tracking-widest">
              ডিজিটাল আর্কাইভ ও তথ্যকেন্দ্র প্রজেক্ট
            </p>
          </div>
        </div>
      </footer>

      {/* Sidebar Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}>
          <div className="flex flex-col h-full font-['SolaimanLipi']">
            <div className={`p-6 flex justify-between items-center border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <span className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>প্রধান মেনু</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors dark:hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-6 space-y-1 flex-grow overflow-y-auto">
              {MENU_LINKS.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full text-left py-4 px-6 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${isDarkMode ? 'hover:bg-slate-700 text-slate-100' : 'hover:bg-indigo-50 text-slate-900'}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="p-6 text-center text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">
              AMINPUR PORTAL v1.1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
