
import React, { useState, useEffect } from 'react';
import { HOMEPAGE_CATEGORIES, Category, SubItem, STATIC_PAGES, AMINPUR_GENERAL_INFO, ThanaSection } from './constants';

type Route = 
  | { type: 'home' }
  | { type: 'static'; pageId: string }
  | { type: 'thana_detail' }
  | { type: 'category'; category: Category }
  | { type: 'subitem'; category: Category; item: SubItem };

const Tagline: React.FC<{ isLight: boolean }> = ({ isLight }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = ["A SPACE FOR AMINPUR", "KNOW ABOUT AMINPUR"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className={`text-[10px] md:text-xs font-bold tracking-wider transition-all duration-700 animate-pulse ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
      {taglines[taglineIndex]}
    </p>
  );
};

const Header: React.FC<{ onNavigate: (route: Route) => void, activeRoute: Route }> = ({ onNavigate, activeRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = isScrolled || activeRoute.type !== 'home';

  const menuItems = [
    { label: 'প্রথম পাতা', route: { type: 'home' as const } },
    { label: 'আমাদের সম্পর্কে', route: { type: 'static' as const, pageId: 'about' } },
    { label: 'ডেভেলপার সম্পর্কে', route: { type: 'static' as const, pageId: 'developer' } },
    { label: 'যোগাযোগ', route: { type: 'static' as const, pageId: 'contact' } },
    { label: 'ব্যবহারের শর্তাবলী', route: { type: 'static' as const, pageId: 'terms' } },
    { label: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', route: { type: 'static' as const, pageId: 'faq' } },
    { label: 'এপস সম্পর্কে', route: { type: 'static' as const, pageId: 'app_info' } },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSolid ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-sky-100' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={() => onNavigate({ type: 'home' })} className="flex flex-col items-start group">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md ${isSolid ? 'bg-sky-600' : 'bg-emerald-500'}`}>
                <span className={`${isSolid ? 'text-white' : 'text-slate-900'} text-xs font-bold`}>অ</span>
              </div>
              <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${isSolid ? 'text-sky-900' : 'text-white'}`}>আমিনপুর থানা</span>
            </div>
            <div className="ml-11">
              <Tagline isLight={isSolid} />
            </div>
          </button>

          <nav className="hidden lg:flex space-x-2">
            {menuItems.map((item, idx) => {
              const isActive = (activeRoute.type === 'home' && item.label === 'প্রথম পাতা') ||
                              (activeRoute.type === 'static' && (activeRoute as any).pageId === (item.route as any).pageId);
              return (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.route)}
                  className={`text-sm px-4 py-1.5 rounded-full transition-all font-medium ${
                    isActive
                      ? isSolid ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-md'
                      : isSolid ? 'text-sky-800 hover:bg-sky-50' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden p-2 rounded-lg transition-colors ${isSolid ? 'text-sky-900 hover:bg-sky-50' : 'text-white hover:bg-white/10'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar for Mobile - Light Mode */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-sky-900/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-8">
            <button onClick={() => setIsSidebarOpen(false)} className="self-end p-2 text-sky-900 hover:bg-sky-50 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="mt-8 flex flex-col space-y-3">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => { onNavigate(item.route); setIsSidebarOpen(false); }}
                  className="text-left text-lg text-sky-900 font-bold py-3 px-5 border border-sky-100 rounded-2xl hover:bg-sky-50 transition-all active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-8 text-center text-xs text-sky-300 font-bold">
              AMINPUR DIGITAL PORTAL
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Hero: React.FC<{ onReadMore: () => void }> = ({ onReadMore }) => (
  <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white overflow-hidden">
    <div className="container mx-auto px-6 text-center z-10">
      <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-sky-400/10 border border-sky-400/30 text-sky-400 text-xs md:text-sm font-bold tracking-wide animate-fadeIn">
        পাবনা জেলার ১১তম থানা
      </div>
      <h1 className="text-5xl md:text-8xl font-black mb-8 drop-shadow-2xl leading-tight animate-fadeIn">আমিনপুর থানা</h1>
      <div className="max-w-2xl mx-auto mb-12 animate-fadeIn">
        <p className="text-lg md:text-2xl font-light leading-relaxed text-slate-100 italic">
          "যমুনা ও পদ্মা নদীর মোহনায় অবস্থিত একটি উদীয়মান প্রশাসনিক অঞ্চল, যা স্থানীয় জনপদ ও আইন-শৃঙ্খলার এক সুসংহত প্রতিচ্ছবি।"
        </p>
      </div>
      <button 
        onClick={onReadMore}
        className="inline-flex items-center px-8 py-4 bg-sky-500 text-white font-black rounded-full hover:bg-sky-400 transition-all shadow-[0_10px_40px_-10px_rgba(14,165,233,0.5)] transform hover:-translate-y-1 active:scale-95 text-lg"
      >
        বিস্তারিত পড়ুন
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    {/* Animated background elements */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/40 to-slate-950/80 pointer-events-none"></div>
  </section>
);

const CategoryGrid: React.FC<{ onSelect: (cat: Category) => void }> = ({ onSelect }) => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 gap-4 md:gap-10 lg:gap-16 max-w-6xl mx-auto">
        {HOMEPAGE_CATEGORIES.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => onSelect(cat)}
            className="group relative bg-slate-50 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-sky-200"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            </div>
            <div className="p-5 md:p-10">
              <h3 className="text-xl md:text-4xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors text-center md:text-left">{cat.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  </section>
);

const SubItemGrid: React.FC<{ category: Category; onSelect: (item: SubItem) => void; onBack: () => void }> = ({ category, onSelect, onBack }) => (
  <div className="container mx-auto px-4 md:px-6 py-28 md:py-36 min-h-screen">
    <button onClick={onBack} className="flex items-center text-sky-700 font-bold mb-10 hover:text-sky-900 transition-colors px-6 py-3 bg-sky-50 rounded-full inline-flex shadow-sm border border-sky-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      হোমে ফিরে যান
    </button>
    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-16 border-l-8 border-sky-500 pl-6 leading-tight">{category.title}</h2>
    <div className="grid grid-cols-2 gap-4 md:gap-12 lg:gap-16">
      {category.items.map((item) => (
        <button key={item.id} onClick={() => onSelect(item)} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 text-left">
          <div className="aspect-video w-full overflow-hidden">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-sky-700 leading-tight">{item.title}</h3>
            <p className="text-slate-600 text-sm md:text-lg line-clamp-3 font-light leading-relaxed">{item.description}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const DetailView: React.FC<{ title: string; content: string; image?: string; onBack: () => void }> = ({ title, content, image, onBack }) => (
  <div className="container mx-auto px-4 md:px-6 py-28 md:py-36 min-h-screen max-w-4xl">
    <button onClick={onBack} className="flex items-center text-sky-700 font-bold mb-12 hover:text-sky-900 transition-colors px-6 py-3 bg-sky-50 rounded-full inline-flex shadow-sm border border-sky-100">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      ফিরে যান
    </button>
    {image && (
      <div className="aspect-video w-full rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-8 border-white">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-tight">{title}</h2>
    <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-sky-50">
      <p className="text-slate-800 text-lg md:text-2xl leading-[1.8] text-justify whitespace-pre-line font-light">
        {content}
      </p>
    </div>
  </div>
);

const Footer: React.FC<{ onNavigate: (route: Route) => void }> = ({ onNavigate }) => {
  const menuLinks = [
    { label: 'প্রথম পাতা', route: { type: 'home' as const } },
    { label: 'আমাদের সম্পর্কে', route: { type: 'static' as const, pageId: 'about' } },
    { label: 'যোগাযোগ', route: { type: 'static' as const, pageId: 'contact' } },
    { label: 'ব্যবহারের শর্তাবলী', route: { type: 'static' as const, pageId: 'terms' } },
    { label: 'এফএকিউ', route: { type: 'static' as const, pageId: 'faq' } },
  ];

  const externalLinks = [
    { label: 'পাবনা জেলা পোর্টাল', url: 'http://www.pabna.gov.bd' },
    { label: 'বাংলাদেশ পুলিশ', url: 'https://www.police.gov.bd' },
    { label: 'জাতীয় তথ্য বাতায়ন', url: 'https://bangladesh.gov.bd' },
    { label: 'উইকিপিডিয়া রেফারেন্স', url: 'https://bn.wikipedia.org/wiki/আমিনপুর_থানা' },
  ];

  return (
    <footer className="bg-sky-50 text-sky-900 py-20 mt-auto border-t border-sky-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12 md:gap-20 mb-16 max-w-4xl mx-auto">
          {/* Important Menu Section */}
          <div>
            <h4 className="text-sky-950 text-lg md:text-2xl font-black mb-8 flex items-center">
              <span className="w-2 h-6 bg-sky-500 mr-4 rounded-full shadow-sm"></span>
              গুরুত্বপূর্ণ মেনু
            </h4>
            <ul className="space-y-4">
              {menuLinks.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate(link.route)}
                    className="text-sky-800 hover:text-sky-500 transition-all text-sm md:text-lg font-bold flex items-center group text-left"
                  >
                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all mr-0 group-hover:mr-2 text-sky-400">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links Section */}
          <div>
            <h4 className="text-sky-950 text-lg md:text-2xl font-black mb-8 flex items-center">
              <span className="w-2 h-6 bg-sky-500 mr-4 rounded-full shadow-sm"></span>
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-4">
              {externalLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-800 hover:text-sky-500 transition-all text-sm md:text-lg font-bold flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all mr-0 group-hover:mr-2 text-sky-400">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-sky-100 text-center">
          <p className="text-xs md:text-sm font-bold tracking-widest opacity-40 uppercase text-sky-900">
            © {new Date().getFullYear()} Aminpur Thana. Built for Pabna with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [route, setRoute] = useState<Route>({ type: 'home' });

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [route]);

  const renderContent = () => {
    switch (route.type) {
      case 'home':
        return (
          <>
            <Hero onReadMore={() => setRoute({ type: 'thana_detail' })} />
            <CategoryGrid onSelect={(cat) => setRoute({ type: 'category', category: cat })} />
          </>
        );
      case 'static':
        const page = STATIC_PAGES[route.pageId];
        return <DetailView title={page.title} content={page.content} onBack={() => setRoute({ type: 'home' })} />;
      case 'thana_detail':
        return (
          <DetailView 
            title={AMINPUR_GENERAL_INFO.title} 
            content={AMINPUR_GENERAL_INFO.content} 
            onBack={() => setRoute({ type: 'home' })} 
          />
        );
      case 'category':
        return (
          <SubItemGrid 
            category={route.category} 
            onSelect={(item) => setRoute({ type: 'subitem', category: route.category, item: item })} 
            onBack={() => setRoute({ type: 'home' })} 
          />
        );
      case 'subitem':
        return (
          <DetailView 
            title={route.item.title} 
            content={route.item.longContent} 
            image={route.item.imageUrl} 
            onBack={() => setRoute({ type: 'category', category: route.category })} 
          />
        );
      default:
        return <Hero onReadMore={() => setRoute({ type: 'thana_detail' })} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-['SolaimanLipi'] selection:bg-sky-500 selection:text-white">
      <Header onNavigate={setRoute} activeRoute={route} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setRoute} />
    </div>
  );
}
