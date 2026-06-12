import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import { RadarAnimation } from './RadarAnimation.jsx';
import { useSite } from '../context/SiteContext.jsx';

function scrollToId(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function Hero() {
  const { text } = useSite();

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 pt-24 transition-colors dark:bg-black">
      <div className="absolute inset-0 z-0">
        <img
          src="/products/w-space.png"
          alt="Traffic technology"
          className="h-full w-full object-cover opacity-15 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-100 dark:from-black dark:via-black/65 dark:to-black" />
      </div>

      <RadarAnimation />

      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

    
      {/* <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute bottom-16 right-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" /> */}

      <div className="container relative z-20 mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full border border-cyan-500/20 bg-white/80 px-4 py-2 text-sm font-medium text-cyan-700 backdrop-blur dark:bg-cyan-500/10 dark:text-cyan-300"
          >
            {text.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-5xl font-black leading-tight md:text-7xl"
          >
            <span className="block bg-gradient-to-r from-slate-900 via-cyan-700 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-cyan-100 dark:to-white">
              {text.hero.title1}
            </span>
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {text.hero.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl"
          >
            {text.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollToId('catalog')}
            className="inline-flex px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              // className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:translate-y-[-1px]"
            >
              {text.actions.openCatalog}
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/80 px-8 py-4 text-lg font-semibold text-slate-700 hover:shadow-2xl hover:shadow-cyan-500/35 backdrop-blur transition hover:border-cyan-500/50 hover:text-cyan-600 hover:scale-105 dark:bg-white/5 dark:text-white"
            >
              {text.actions.consultation}
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
          >
            {text.hero.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-cyan-500/15 bg-white/70 p-5 backdrop-blur transition dark:bg-slate-950/50">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
        <div className="text-sm text-cyan-600 dark:text-cyan-400">{text.hero.scroll}</div>
      </div>
    </section>
  );
}
