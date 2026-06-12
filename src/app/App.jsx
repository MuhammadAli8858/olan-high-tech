import { useEffect, useMemo, useState } from 'react';
import { BaseModal } from './components/BaseModal.jsx';
import { Benefits } from './components/Benefits.jsx';
import { Catalog } from './components/Catalog.jsx';
import { Contact } from './components/Contact.jsx';
import { FAQ } from './components/FAQ.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Process } from './components/Process.jsx';
import { Solutions } from './components/Solutions.jsx';
import { Projects } from './components/Projects.jsx';
import { AboutPage } from './components/AboutPage.jsx';
import { ChatWidget } from './components/ChatWidget.jsx';
import { SiteProvider, useSite } from './context/SiteContext.jsx';
import { localize } from './data/siteData.js';

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function ProductModal({ product, onClose }) {
  const { language, text } = useSite();
  const [activeImage, setActiveImage] = useState(0);

  const gallery = useMemo(() => (product ? product.images : []), [product]);

  useEffect(() => {
    setActiveImage(0);
  }, [product]);

  return (
    <BaseModal isOpen={Boolean(product)} onClose={onClose} title={product ? localize(product.name, language) : ''} wide>
      {product ? (
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div>
            <div className="overflow-hidden rounded-3xl border border-cyan-500/15 bg-slate-100 dark:bg-slate-900">
              <img src={gallery[activeImage]} alt={localize(product.name, language)} className="h-[320px] w-full object-cover md:h-full" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {gallery.map((image, index) => (
                <button
                  key={`${product.id}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-2xl border ${activeImage === index ? 'border-cyan-500' : 'border-cyan-500/15'}`}
                >
                  <img src={image} alt={`${localize(product.name, language)} ${index + 1}`} className="h-24 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-cyan-500/15 bg-slate-50 p-5 dark:bg-slate-900">
              <div className="text-sm text-slate-500 dark:text-slate-400">{text.catalog.priceLabel}</div>
              <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{localize(product.price, language)}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{localize(product.description, language)}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{text.catalog.specsTitle}</h4>
              <div className="mt-3 space-y-3">
                {localize(product.specs, language).map((spec) => (
                  <div key={spec} className="rounded-2xl border border-cyan-500/15 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                    {spec}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{text.catalog.appsTitle}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {localize(product.applications, language).map((app) => (
                  <span key={app} className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-700 dark:text-cyan-300">
                    {app}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                setTimeout(() => scrollToId('contact'), 60);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              {text.actions.buy}
            </button>
          </div>
        </div>
      ) : null}
    </BaseModal>
  );
}

function routeFromHash() {
  if (typeof window === 'undefined') return 'home';
  const h = window.location.hash;
  if (h === '#about') return 'about';
  return 'home';
}

function AppContent() {
  const [route, setRoute] = useState(routeFromHash);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [catalogCategory, setCatalogCategory] = useState('all');

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [route]);

  const navigate = (target) => {
    if (target === 'about') {
      const hash = `#${target}`;
      if (window.location.hash !== hash) {
        window.location.hash = target;
      } else {
        setRoute(target);
      }
    } else {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      setRoute('home');
    }
  };

  const goSection = (id) => {
    if (route !== 'home') {
      navigate('home');
      setTimeout(() => scrollToId(id), 80);
    } else {
      scrollToId(id);
    }
  };

  const selectViolation = (catId) => {
    setCatalogCategory(catId || 'all');
    goSection('catalog');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <Header route={route} onNavigate={navigate} onSection={goSection} />
      {route === 'about' ? (
        <AboutPage onBack={() => navigate('home')} onSection={goSection} />
      ) : (
        <>
          <Hero />
          <Solutions onSelectCategory={selectViolation} onContact={() => goSection('contact')} />
          <Catalog onOpenProduct={setSelectedProduct} category={catalogCategory} onCategoryChange={setCatalogCategory} />
          <Benefits />
          <Process />
          <Projects />
          <FAQ />
          <Contact />
        </>
      )}
      <Footer onNavigate={navigate} onSection={goSection} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
