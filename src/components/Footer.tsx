import { Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'MC Authority Registration', href: '#services' },
    { label: 'DOT Number Registration', href: '#services' },
    { label: 'Commercial Insurance', href: '#services' },
    { label: 'Business Formation', href: '#services' },
    { label: 'Dispatch Services', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#contact' },
    { label: 'Terms of Service', href: '#contact' },
  ],
};

const socials = [
  { icon: Facebook, href: '#contact', label: 'Facebook' },
  { icon: Instagram, href: '#contact', label: 'Instagram' },
  { icon: Linkedin, href: '#contact', label: 'LinkedIn' },
  { icon: Youtube, href: '#contact', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-ink-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-navy-400/5 dark:bg-navy-600/5 rounded-full blur-[100px]" />

      <div className="relative section-pad max-w-7xl mx-auto py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <img src="/logo.svg" alt="The Trucking Setup logo" className="w-10 h-10" />
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-slate-800 dark:text-white text-lg tracking-tight">The Trucking Setup</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-500 dark:text-accent-400 font-semibold">Consulting</span>
              </div>
            </a>
            <p className="text-sm text-slate-600 dark:text-ink-300 leading-relaxed max-w-sm mb-6">
              We help aspiring entrepreneurs start and grow profitable trucking businesses.
              From authority to dispatch — we handle the hard part so you can focus on the road ahead.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-slate-200/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-ink-300 hover:bg-accent-500 hover:text-white hover:border-accent-400 hover:scale-110 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-ink-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h4 className="font-display font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider mb-4">Get Started</h4>
            <p className="text-sm text-slate-600 dark:text-ink-300 mb-4">Ready to launch your trucking business?</p>
            <a href="#contact" className="btn-primary !py-2.5 !px-5 text-sm w-full justify-center">
              Free Consultation
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-ink-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} The Trucking Setup. All rights reserved.
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-sm text-slate-600 dark:text-ink-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            Back to top
            <span className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-accent-500 group-hover:text-white transition-all">
              <ArrowUp className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
