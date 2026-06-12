import { useState } from 'react';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext.jsx';

export function Header({ route, onNavigate, onSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { text, theme, toggleTheme } = useSite();

  // "О компании" открывает отдельную страницу, остальные пункты — секции на главной.
  const navItems = [
    { name: text.nav.about, target: 'about', isPage: true },
    { name: text.nav.solutions, href: 'solutions' },
    { name: text.nav.catalog, href: 'catalog' },
    { name: text.nav.benefits, href: 'benefits' },
    { name: text.nav.process, href: 'process' },
    { name: text.nav.projects, href: 'projects' },
    { name: text.nav.faq, href: 'faq' },
    { name: text.nav.contact, href: 'contact' },
  ];

  const handleNav = (item) => {
    if (item.isPage) {
      onNavigate('about');
    } else {
      onSection(item.href);
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-500/15 bg-white/80 backdrop-blur-xl transition-colors dark:bg-black/75">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.button
            type="button"
            onClick={() => onNavigate('home')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <img src="/olan_logo.svg" alt={text.brand} className="h-11 w-11 rounded-xl object-cover shadow-lg shadow-cyan-500/20" />
            <div className="hidden text-left sm:block">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-lg font-bold text-transparent">
                {text.brand}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Фиксация нарушений ПДД</div>
            </div>
          </motion.button>

          <motion.div
            className="hidden items-center gap-4 lg:flex xl:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {navItems.map((item) => (
              <button
                key={item.target || item.href}
                type="button"
                onClick={() => handleNav(item)}
                className={`relative whitespace-nowrap text-sm transition-colors hover:text-cyan-400 ${item.isPage && route === 'about' ? 'text-cyan-500 dark:text-cyan-400' : 'text-gray-300'}`}
              >
                {item.name}
              </button>
            ))}
          </motion.div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/20 bg-white text-slate-700 transition hover:border-cyan-500/50 hover:text-cyan-600 dark:bg-slate-900 dark:text-slate-200"
              aria-label={theme === 'dark' ? text.actions.themeLight : text.actions.themeDark}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => onSection('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:translate-y-[-1px]"
            >
              <Phone className="h-4 w-4" />
              {text.actions.contact}
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/20 bg-white text-slate-700 lg:hidden dark:bg-slate-900 dark:text-slate-200"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-4 space-y-3 rounded-3xl border border-cyan-500/20 bg-white/90 p-4 dark:bg-slate-950/90">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full rounded-2xl border border-cyan-500/20 px-3 py-2 text-sm text-slate-700 dark:text-slate-200"
                >
                  {theme === 'dark' ? text.actions.themeLight : text.actions.themeDark}
                </button>
                {navItems.map((item) => (
                  <button
                    key={item.target || item.href}
                    type="button"
                    onClick={() => {
                      handleNav(item);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-cyan-500/10 hover:text-cyan-600 dark:text-slate-200"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    onSection('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white"
                >
                  {text.actions.contact}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
