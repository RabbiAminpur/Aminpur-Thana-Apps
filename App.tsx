
import React, { useState, useEffect } from 'react';
import { SECTIONS, ThanaSection, HOMEPAGE_CATEGORIES, Category } from './constants';

const NavLinks: React.FC<{ 
  onNavigate: (id: string | 'all' | null) => void, 
  activeId: string | 'all' | null,
  isMobile?: boolean,
  onClose?: () => void
}> = ({ onNavigate, activeId, isMobile, onClose }) => {
  const handleClick = (id: string | 'all' | null) => {
    onNavigate(id);
    if (onClose) onClose();
  };

  return (
    <>
      <button
        onClick={() => handleClick('all')}
        className={`transition-all py-2 border-b-2 text-left ${
          activeId === 'all' 
            ? 'text-white border-emerald-400 font-bold' 
            : `border-transparent text-emerald-100/80 hover:text-white`
        } ${isMobile ? 'text-lg py-4 border-emerald-800/30' : 'text-sm'}`}
      >
        একনজরে সব
      </button>
      {SECTIONS.slice(0, 6).map((s) => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          className={`transition-all py-2 border-b-2 text-left ${
            activeId === s.id 
              ? 'text-white border-emerald-400 font-bold' 
              : `border-transparent text-emerald-100/80 hover:text-white`
          } ${isMobile ? 'text-lg py-4 border-emerald-800/30' : 'text-sm'}`}
        >
          {s.title.split(' ').pop()}
        </button>
      ))}
    </>
  );
};

const Header: React.FC<{ onNavigate: (id: string | 'all' | null) => void, activeId: string | 'all' | null }> = ({ onNavigate, activeId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || activeId ? 'bg-emerald-950/95 backdrop-blur-md shadow-xl py-3 border-b border-emerald-800/30' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => onNavigate(null)}
            className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center group"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
              <span className="text-emerald-950 text-xs">অ</span>
            </div>
            <span className="drop-shadow-sm">আমিনপুর থানা</span>
          </button>

          <nav className="hidden lg:flex space-x-6">
            <NavLinks onNavigate={onNavigate} activeId={activeId} />
          </nav>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-white hover:bg-emerald-800/50 rounded-lg transition-colors"
            aria-label="Open Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-emerald-900 shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold text-white">মেনু</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-1 overflow-y-auto">
              <NavLinks onNavigate={onNavigate} activeId={activeId} isMobile onClose={() => setIsSidebarOpen(false)} />
            </nav>
            <div className="mt-auto pt-8 border-t border-emerald-800/50 text-emerald-300/60 text-xs text-center">
              <p>© {new Date().getFullYear()} আমিনপুর থানা ইনফো</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => (
  <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    </div>
    <div className="container mx-auto px-6 text-center z-10">
      <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-700/50 border border-emerald-500/30 text-emerald-100 text-sm font-medium backdrop-blur-sm animate-fadeIn">
        পাবনা জেলার ঐতিহ্যবাহী জনপদ
      </div>
      <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl leading-tight animate-fadeIn">
        আমিনপুর থানা
      </h2>
      <p className="text-base md:text-2xl font-light mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed animate-fadeIn">
        পদ্মা ও যমুনার কোল ঘেঁষে গড়ে ওঠা এক আধুনিক প্রশাসনিক ইউনিট। এই ভূখণ্ডের ইতিহাস, ঐতিহ্য ও জীবনযাত্রার পূর্ণাঙ্গ তথ্য এখানে জানুন।
      </p>
      <button 
        onClick={onExplore}
        className="px-10 py-4 bg-white text-emerald-900 font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg active:scale-95 animate-fadeIn"
      >
        বিস্তারিত তথ্য দেখুন
      </button>
    </div>
  </section>
);

const CategoryGrid: React.FC<{ onSelect: (sectionId: string) => void }> = ({ onSelect }) => (
  <section className="py-12 md:py-20 bg-slate-50">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 gap-3 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
        {HOMEPAGE_CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => onSelect(cat.sectionId)}
            className="group relative bg-white rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-emerald-50 hover:border-emerald-200 text-left"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={cat.imageUrl} 
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <div className="p-4 md:p-8">
              <h3 className="text-lg md:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-center md:text-left">{cat.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

const SectionDisplay: React.FC<{ section: ThanaSection }> = ({ section }) => (
  <div className="mb-12 bg-white rounded-3xl shadow-sm border border-emerald-50 p-8 md:p-12 transition-all hover:shadow-lg hover:border-emerald-100 group">
    <div className="mb-8 flex items-center justify-center flex-col">
      <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-emerald-800 transition-colors text-center">{section.title}</h3>
      <div className="w-16 h-1 bg-emerald-600 rounded-full group-hover:w-32 transition-all duration-500"></div>
    </div>
    <p className="text-slate-700 text-lg md:text-xl leading-[1.8] text-justify whitespace-pre-line font-light">
      {section.content}
    </p>
  </div>
);

const DetailView: React.FC<{ activeId: string | 'all', onBack: () => void }> = ({ activeId, onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeId]);

  const displayedSections = activeId === 'all' 
    ? SECTIONS 
    : SECTIONS.filter(s => s.id === activeId);

  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-emerald-700 font-bold mb-12 hover:text-emerald-900 transition-colors group px-4 py-2 bg-emerald-50 rounded-full inline-flex active:scale-95 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          হোমপেজে ফিরে যান
        </button>

        {activeId === 'all' && (
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-4 tracking-tight">আমিনপুর একনজরে</h2>
            <p className="text-slate-500 text-lg">থানার সকল গুরুত্বপূর্ণ তথ্যের সমন্বিত রূপ</p>
          </div>
        )}

        <div className="space-y-4">
          {displayedSections.map(section => (
            <SectionDisplay key={section.id} section={section} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-emerald-600 hover:text-emerald-800 text-sm font-bold flex flex-col items-center justify-center mx-auto transition-all transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
              উপরে যান
            </button>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-emerald-950 text-emerald-100/60 py-20 mt-auto border-t border-emerald-900">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
        <div>
          <h4 className="text-white text-xl font-bold mb-8 flex items-center">
            <span className="w-6 h-1 bg-emerald-500 mr-3"></span>
            আমিনপুর থানা
          </h4>
          <p className="text-sm leading-relaxed opacity-80 font-light">
            এই পোর্টালটি পাবনা জেলার আমিনপুর থানার ইতিহাস ও পরিচিতি বিষয়ক একটি ডিজিটাল নথি। এলাকার ঐতিহ্যকে বিশ্বদরবারে তুলে ধরাই আমাদের লক্ষ্য।
          </p>
        </div>
        <div>
          <h4 className="text-white text-xl font-bold mb-8 flex items-center">
            <span className="w-6 h-1 bg-emerald-500 mr-3"></span>
            উৎস ও কৃতজ্ঞতা
          </h4>
          <ul className="text-sm space-y-4 opacity-80 font-light">
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>উইকিপিডিয়া বাংলাদেশ</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>পাবনা জেলা বাতায়ন</li>
            <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3"></span>স্থানীয় জনশ্রুতি ও ইতিহাসবিদ</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xl font-bold mb-8 flex items-center">
            <span className="w-6 h-1 bg-emerald-500 mr-3"></span>
            সতর্কবার্তা
          </h4>
          <p className="text-xs italic leading-loose opacity-70 font-light">
            তথ্যগুলো কেবল সাধারণ জ্ঞান ও পরিচিতির উদ্দেশ্যে পরিবেশিত। প্রশাসনিক কোনো প্রয়োজনে সরাসরি থানা বা সংশ্লিষ্ট সরকারি দপ্তরে যোগাযোগ করার অনুরোধ করা হলো।
          </p>
        </div>
      </div>
      <div className="pt-10 border-t border-emerald-900/50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light">
        <p>© {new Date().getFullYear()} আমিনপুর থানা। পাবনা, বাংলাদেশ।</p>
        <div className="flex space-x-8">
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">গোপনীয়তা নীতি</span>
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">যোগাযোগ</span>
          <span className="hover:text-emerald-400 cursor-pointer transition-colors">সহায়তা</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string | 'all' | null>(null);

  const handleNavigate = (id: string | 'all' | null) => {
    setActiveSectionId(id);
    if (!id) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-['SolaimanLipi'] selection:bg-emerald-100 selection:text-emerald-900">
      <Header onNavigate={handleNavigate} activeId={activeSectionId} />
      
      {!activeSectionId ? (
        <>
          <Hero onExplore={() => handleNavigate('all')} />
          <CategoryGrid onSelect={handleNavigate} />
        </>
      ) : (
        <DetailView 
          activeId={activeSectionId} 
          onBack={() => handleNavigate(null)} 
        />
      )}
      
      <Footer />
    </div>
  );
}
