import { useReveal } from '../lib/hooks';
import {
  Clock,
  AlertTriangle,
  Compass,
  Briefcase,
  Headphones,
  Radio,
  TrendingUp,
  MapPin,
} from 'lucide-react';

const benefits = [
  { icon: Clock, title: 'Save Time', desc: 'Skip the months of research and paperwork.' },
  { icon: AlertTriangle, title: 'Avoid Costly Filing Mistakes', desc: 'Get it right the first time, every time.' },
  { icon: Compass, title: 'Expert Industry Guidance', desc: 'Navigate regulations with seasoned pros.' },
  { icon: Briefcase, title: 'Professional Business Setup', desc: 'Launch with a rock-solid foundation.' },
  { icon: Headphones, title: 'Ongoing Support', desc: 'We are with you long after launch day.' },
  { icon: Radio, title: 'Access to Dispatch Services', desc: 'Keep your trucks loaded and rolling.' },
  { icon: TrendingUp, title: 'Growth Strategy', desc: 'Scale from one truck to a full fleet.' },
  { icon: MapPin, title: 'Nationwide Assistance', desc: 'No matter where you operate, we help.' },
];

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[number]; index: number }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${(index % 4) + 1} ${isVisible ? 'is-visible' : ''} flex items-start gap-4 p-5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/[0.03] transition-colors duration-300 group`}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-ink-800 dark:to-ink-900 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:from-accent-500 group-hover:to-accent-600 group-hover:border-accent-400/30 transition-all duration-500 group-hover:scale-110">
        <benefit.icon className="w-6 h-6 text-accent-500 dark:text-accent-400 group-hover:text-white transition-colors duration-500" />
      </div>
      <div>
        <h3 className="font-display font-bold text-base text-slate-800 dark:text-white mb-1 flex items-center gap-2">
          <span className="text-accent-500 dark:text-accent-400 text-sm">✔</span>
          {benefit.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-ink-300 leading-relaxed">{benefit.desc}</p>
      </div>
    </div>
  );
}

export default function Benefits() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="benefits" className="relative py-24 lg:py-32 bg-slate-50 dark:bg-ink-950">
      <div className="section-pad max-w-7xl mx-auto">
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-16`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400 mb-5">
            Benefits
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gradient mb-5 leading-tight">
            Why Entrepreneurs Choose The Trucking Setup
          </h2>
          <p className="text-slate-600 dark:text-ink-300 text-lg">
            Every advantage you need to build a trucking business that lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
