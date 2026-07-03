import { useEffect, useState } from 'react';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/useTheme';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-pad max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="The Trucking Setup logo" className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-slate-800 dark:text-white text-lg tracking-tight">The Trucking Setup</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent-500 dark:text-accent-400 font-semibold">Consulting</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-ink-200 dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-600 dark:text-ink-200 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Desktop CTA */}
          <a href="#contact" className="hidden lg:inline-flex btn-primary !py-2.5 !px-5 text-sm">
            <Phone className="w-4 h-4" />
            Free Consultation
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-slate-700 dark:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-pad pt-4 pb-6">
          <div className="glass-dark rounded-2xl p-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-slate-600 dark:text-ink-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              <Phone className="w-4 h-4" />
              Free Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
