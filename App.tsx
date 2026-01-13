
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

const HighSchoolDetail = ({ isDarkMode, onBack }: { isDarkMode: boolean, onBack: () => void }) => (
  <div className="animate-fadeIn space-y-10 pb-20">
    {/* Back Button */}
    <button 
      onClick={onBack}
      className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all mb-4 ${isDarkMode ? 'bg-slate-800 text-indigo-400 hover:bg-slate-700' : 'bg-white text-indigo-600 shadow-sm hover:shadow-md border border-indigo-50'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="font-bold">তালিকায় ফিরুন</span>
    </button>

    {/* Header Section */}
    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg" 
        alt="আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়" 
        className="w-full h-72 md:h-[500px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-8 md:p-12">
        <div className="text-white">
          <span className="bg-indigo-600 text-[10px] font-black uppercase px-3 py-1 rounded-full mb-4 inline-block tracking-widest">স্থাপিত: স্বনামধন্য প্রতিষ্ঠান</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 leading-tight">আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়</h2>
          <p className="text-sm md:text-base font-medium opacity-70 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            আমিনপুর, বেরা, পাবনা
          </p>
        </div>
      </div>
    </div>

    {/* Quick Info Bar */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[
        { label: 'EIIN নম্বর', value: '125313', icon: '🆔' },
        { label: 'শিক্ষা বোর্ড', value: 'রাজশাহী বোর্ড', icon: '🎓' },
        { label: 'শিক্ষা স্তর', value: '৬ষ্ঠ–১০ম শ্রেণি', icon: '📚' },
        { label: 'ধরণ', value: 'বেসরকারি (MPO)', icon: '🏛️' },
        { label: 'পরিবেশ', value: 'সুশৃঙ্খল', icon: '🌱' }
      ].map((info, i) => (
        <div key={i} className={`p-5 rounded-3xl border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}>
          <span className="text-2xl mb-2 block">{info.icon}</span>
          <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">{info.label}</p>
          <p className="text-sm font-bold">{info.value}</p>
        </div>
      ))}
    </div>

    {/* Main Content Sections */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-12">
        
        {/* Intro */}
        <section className="animate-fadeIn">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-black">প্রতিষ্ঠান পরিচিতি</h3>
          </div>
          <p className="text-lg leading-relaxed opacity-80 font-medium">
            আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয় একটি স্বনামধন্য মাধ্যমিক শিক্ষা প্রতিষ্ঠান। এটি পাবনা জেলার বেরা উপজেলার আমিনপুর এলাকায় অবস্থিত। দীর্ঘদিন ধরে এই বিদ্যালয়টি এলাকার শিক্ষাবিস্তারে গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।
          </p>
        </section>

        {/* Education Activity */}
        <section className="p-8 rounded-[2rem] border-2 border-dashed border-indigo-500/20">
          <h3 className={`text-xl font-black mb-6 flex items-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="mr-3">🎓</span> শিক্ষা কার্যক্রম ও পাঠদান
          </h3>
          <p className="mb-6 opacity-80 font-medium">জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুসারে পাঠদান করা হয়। শিক্ষার্থীদের SSC পরীক্ষার জন্য দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা প্রস্তুত করা হয়।</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ বিজ্ঞান', 'সামাজিক বিজ্ঞান', 'ICT'].map(sub => (
              <div key={sub} className={`p-3 rounded-2xl text-center text-xs font-bold ${isDarkMode ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                {sub}
              </div>
            ))}
          </div>
        </section>

        {/* Student Life */}
        <section>
          <h3 className={`text-xl font-black mb-6 flex items-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <span className="mr-3">🧑‍🎓</span> শিক্ষার্থী জীবন ও সুবিধা
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { t: 'নিরাপদ পরিবেশ', d: 'সুশৃঙ্খল ও নিরাপদ একাডেমিক ভবন' },
              { t: 'ক্রীড়া কার্যক্রম', d: 'বার্ষিক ক্রীড়া ও নিয়মিত প্রশিক্ষণ' },
              { t: 'জাতীয় দিবস', d: 'সাংস্কৃতিক অনুষ্ঠানের মাধ্যমে দিবস পালন' },
              { t: 'নৈতিক শিক্ষা', d: 'আদর্শ নাগরিক গড়ে তুলতে বিশেষ সেশন' }
            ].map((item, idx) => (
              <div key={idx} className={`p-5 rounded-3xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <h4 className="font-black text-sm mb-1">{item.t}</h4>
                <p className="text-xs opacity-60">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role in Society */}
        <section className={`p-8 rounded-[2.5rem] ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-600 text-white'}`}>
          <h3 className="text-xl font-black mb-4">🌱 সমাজে বিদ্যালয়ের ভূমিকা</h3>
          <p className="leading-relaxed font-medium opacity-90">
            আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয় শুধু একটি শিক্ষা প্রতিষ্ঠান নয়, এটি এলাকার সামাজিক উন্নয়নের একটি গুরুত্বপূর্ণ কেন্দ্র। এখান থেকে শিক্ষিত হয়ে বহু শিক্ষার্থী আজ বিভিন্ন সরকারি-বেসরকারি প্রতিষ্ঠানে কর্মরত। গ্রামীণ পরিবেশে মানসম্মত শিক্ষা বিস্তারে এটি একটি অনন্য উদাহরণ।
          </p>
        </section>
      </div>

      {/* Sidebar Content */}
      <div className="space-y-6">
        {/* Administration Card */}
        <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
          <h4 className="font-black text-indigo-600 dark:text-indigo-400 mb-6 uppercase tracking-widest text-xs">শিক্ষক ও প্রশাসন</h4>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">নিমিত ক্লাস মনিটরিং</p>
                <p className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">সিস্টেম্যাটিক প্রসেস</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">শিক্ষার্থী-অভিভাবক সমন্বয়</p>
                <p className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">নিয়মিত মতবিনিময়</p>
              </div>
            </li>
            <li className="flex items-start space-x-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold">বার্ষিক মূল্যায়ন</p>
                <p className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">ফলাফল ভিত্তিক পর্যবেক্ষণ</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Activities Card */}
        <div className={`p-8 rounded-[2rem] ${isDarkMode ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
          <h4 className="font-black mb-4 text-xs uppercase tracking-widest">সহ-শিক্ষাক্রমিক কার্যক্রম</h4>
          <ul className="space-y-3 text-xs font-bold">
            <li>• বার্ষিক ক্রীড়া প্রতিযোগিতা</li>
            <li>• সাংস্কৃতিক অনুষ্ঠান</li>
            <li>• পুরস্কার বিতরণী</li>
            <li>• জাতীয় দিবস পালন</li>
          </ul>
        </div>

        {/* Source Footer */}
        <div className="p-6 text-center opacity-40">
          <p className="text-[10px] font-bold italic leading-relaxed">
            © তথ্যসূত্র: Wikipedia, শিক্ষা বোর্ড ও স্থানীয় তথ্যভাণ্ডার
          </p>
        </div>
      </div>
    </div>
  </div>
);

const InstitutionCard = ({ isDarkMode, onClick }: { isDarkMode: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`group cursor-pointer rounded-[2rem] overflow-hidden border transition-all duration-500 ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2'}`}
  >
    {/* 16:8 Aspect Ratio (padding-bottom: 50%) */}
    <div className="relative w-full pb-[50%] overflow-hidden">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/2/25/%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8%E0%A6%AA%E0%A7%81%E0%A6%B0_%E0%A6%86%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A8_%E0%A6%89%E0%A6%9A%E0%A7%8D%E0%A6%9A_%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A6%AF%E0%A6%BC_-_%E0%A6%AE%E0%A7%80%E0%A6%B0_%E0%A6%B0%E0%A6%BE%E0%A6%AC%E0%A7%8D%E0%A6%AC%E0%A6%BF_%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A7%87%E0%A6%A8.jpg" 
        alt="আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6">
        <span className="bg-indigo-600 text-[9px] text-white font-black uppercase px-2 py-0.5 rounded-full mb-2 inline-block tracking-tighter">মাধ্যমিক স্কুল</span>
        <h4 className="text-white font-black text-xl md:text-2xl drop-shadow-lg leading-tight">আমিনপুর আয়েন উদ্দিন উচ্চ বিদ্যালয়</h4>
        <div className="flex items-center mt-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
          আমিনপুর, পাবনা
        </div>
      </div>
      
      {/* Visual Overlay on Hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
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

  const taglines = ["আমিনপুরের তথ্যকোষ", "ডিজিটাল তথ্যকেন্দ্র"];
  const subCategories = ["সব", "কলেজ", "হাইস্কুল", "প্রাইমারি স্কুল", "মাদ্রাসা", "কিন্ডারগার্টেন"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Filter logic: In "সব" category or "হাইস্কুল" category
  const shouldShowAyenUddin = activeCategory === 'সব' || activeCategory === 'হাইস্কুল';

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
            <button onClick={toggleDarkMode} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-yellow-400 text-slate-900' : 'bg-indigo-700 text-white'} hover:scale-110`}>
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 18v1m9-9h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Info Card */}
      {!selectedInstitution && (
        <section className="container mx-auto px-6 mt-6">
          <div className={`p-4 rounded-3xl shadow-sm border transition-all duration-500 flex items-center justify-between ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-indigo-50'} animate-fadeIn`}>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pulse ${isDarkMode ? 'bg-indigo-900/50' : 'bg-indigo-50 text-indigo-600'}`}>🗓️</div>
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
      )}

      {/* Main Content Area */}
      <main className={`flex-grow container mx-auto px-6 ${selectedInstitution ? 'py-6' : 'py-10'}`}>
        
        {!selectedInstitution ? (
          <>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-2 h-8 rounded-full ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}></div>
              <h3 className="text-2xl font-black tracking-tight">শিক্ষা প্রতিষ্ঠান সমূহ</h3>
            </div>

            {/* Horizontal Sub-Category Navigation */}
            <div className="relative mb-10">
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
              <div className={`absolute top-0 right-0 h-[calc(100%-1rem)] w-12 pointer-events-none bg-gradient-to-l ${isDarkMode ? 'from-slate-900' : 'from-slate-50'} opacity-50`}></div>
            </div>

            {/* Content Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 animate-fadeIn">
              {shouldShowAyenUddin ? (
                <InstitutionCard isDarkMode={isDarkMode} onClick={() => setSelectedInstitution('ayenuddin')} />
              ) : (
                <div className="col-span-full text-center py-20 border-2 border-dashed rounded-3xl opacity-20 border-current">
                  <p className="text-sm font-bold italic">এই ক্যাটাগরিতে তথ্য শীঘ্রই যোগ করা হবে...</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="animate-fadeIn">
            {selectedInstitution === 'ayenuddin' && (
              <HighSchoolDetail isDarkMode={isDarkMode} onBack={() => setSelectedInstitution(null)} />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`mt-auto transition-colors duration-500 ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'} border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:gap-20 mb-10">
            <div>
              <h4 className={`text-xs font-black mb-4 uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>প্রয়োজনীয় লিংক</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.column1.map((link, i) => (
                  <li key={i}><a href={link.url} className="text-xs md:text-sm hover:text-indigo-500 transition-colors font-bold block">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xs font-black mb-4 uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>অন্যান্য তথ্য</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.column2.map((link, i) => (
                  <li key={i}><a href={link.url} className="text-xs md:text-sm hover:text-indigo-500 transition-colors font-bold block">{link.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200/20 text-center">
            <p className="text-xs font-bold opacity-70">© {new Date().getFullYear()} আমিনপুর থানা পাবনা | সর্বস্বত্ব সংরক্ষিত</p>
          </div>
        </div>
      </footer>

      {/* Sidebar Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}>
          <div className="flex flex-col h-full">
            <div className={`p-6 flex justify-between items-center border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <span className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>প্রধান মেনু</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full dark:hover:bg-slate-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="p-6 space-y-1 flex-grow overflow-y-auto">
              {MENU_LINKS.map((link) => (
                <button key={link.id} onClick={() => { setIsMenuOpen(false); setSelectedInstitution(null); }} className={`w-full text-left py-4 px-6 rounded-2xl font-bold text-lg transition-all ${isDarkMode ? 'hover:bg-slate-700 text-slate-100' : 'hover:bg-indigo-50 text-slate-900'}`}>
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
