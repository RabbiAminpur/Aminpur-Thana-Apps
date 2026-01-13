
import React, { useState, useEffect } from 'react';
import { MENU_LINKS } from './constants';

const getBanglaDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
  const formatter = new Intl.DateTimeFormat('bn-BD', options);
  const parts = formatter.formatToParts(date);
  
  const find = (type: string) => parts.find(p => p.type === type)?.value || '';
  
  return {
    day: find('weekday'),
    date: `${find('day')} ${find('month')}, ${find('year')}`
  };
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [banglaInfo, setBanglaInfo] = useState(getBanglaDate());

  const taglines = ["আমিনপুরের তথ্যকোষ", "ডিজিটাল তথ্যকেন্দ্র"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} font-['SolaimanLipi']`}>
      
      {/* Header - Kept as per request */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-slate-800/90' : 'bg-indigo-600'} text-white shadow-lg backdrop-blur-md`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-2xl font-black tracking-tight cursor-pointer">আমিনপুর থানা পাবনা</h1>
            <p className="text-[10px] sm:text-sm font-bold text-indigo-100/80">{taglines[taglineIndex]}</p>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Date Display (Minimal) */}
            <div className="hidden md:block text-right mr-4 opacity-80">
              <p className="text-[10px] font-bold leading-tight">{banglaInfo.day}</p>
              <p className="text-[10px] font-medium">{banglaInfo.date}</p>
            </div>

            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400 text-slate-900' : 'bg-indigo-700 text-white'} hover:scale-110`}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Placeholder for new info */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="animate-fadeIn space-y-4">
           <div className={`w-16 h-1 w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-3xl mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-indigo-50 text-indigo-600'}`}>✨</div>
           <h2 className="text-2xl sm:text-3xl font-black opacity-20 italic">নতুন কন্টেন্ট এর জন্য প্রস্তুত...</h2>
           <p className="max-w-md mx-auto text-sm opacity-40 font-bold">এখানে আপনার নতুন ডিজাইন এবং তথ্য যোগ করুন।</p>
        </div>
      </main>

      {/* Simplified Bottom Bar */}
      <footer className={`py-6 border-t ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-100 text-slate-500'}`}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} আমিনপুর থানা পাবনা</p>
        </div>
      </footer>

      {/* Sidebar Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'} shadow-2xl p-6`}>
           <div className="flex justify-between items-center mb-10 border-b pb-4">
              <span className="font-black text-xl">মেনু</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl hover:rotate-90 transition-transform">✕</button>
           </div>
           <nav className="space-y-2">
              {MENU_LINKS.map(link => (
                <button key={link.id} onClick={() => setIsMenuOpen(false)} className={`w-full text-left p-4 rounded-2xl font-bold transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-indigo-50 text-slate-700'}`}>
                  {link.label}
                </button>
              ))}
           </nav>
        </div>
      </div>
    </div>
  );
}
