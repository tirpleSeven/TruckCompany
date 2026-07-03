import { useState, FormEvent } from 'react';
import { useReveal } from '../lib/hooks';
import { supabase } from '../lib/supabase';
import { sendConsultationEmail, isEmailjsConfigured } from '../lib/emailjs';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

const businessStages = [
  'Just exploring my options',
  'Ready to start soon',
  'Already have a truck',
  'Already operating — need help',
];

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '(480) 400-4518', href: 'tel:+14804004518' },
  { icon: Mail, label: 'Email Us', value: 'info@TheTruckingSetup.com', href: 'mailto:info@TheTruckingSetup.com' },
  { icon: Clock, label: 'Business Hours', value: 'Mon–Fri 8AM–7PM EST' },
  { icon: MapPin, label: 'Service Area', value: 'Nationwide, USA' },
];

const socials = [
  { icon: Facebook, href: '#contact', label: 'Facebook' },
  { icon: Instagram, href: '#contact', label: 'Instagram' },
  { icon: Linkedin, href: '#contact', label: 'LinkedIn' },
  { icon: Youtube, href: '#contact', label: 'YouTube' },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { ref, isVisible } = useReveal();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      business_stage: formData.get('business_stage') as string,
      message: (formData.get('message') as string) || '',
    };

    try {
      const { error } = await supabase.from('consultation_requests').insert(data);
      if (error) throw error;

      if (isEmailjsConfigured()) {
        try {
          await sendConsultationEmail(data);
        } catch (emailErr) {
          console.error('EmailJS send failed:', emailErr);
        }
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-ink-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100/50 via-slate-50 to-slate-50 dark:from-navy-950/20 dark:via-ink-950 dark:to-ink-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-500/5 dark:bg-accent-500/5 rounded-full blur-[120px]" />

      <div className="relative section-pad max-w-7xl mx-auto">
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} text-center max-w-3xl mx-auto mb-16`}>
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold uppercase tracking-wider text-accent-500 dark:text-accent-400 mb-5">
            Contact Us
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gradient mb-5 leading-tight">
            Let's Get Your Trucks Moving
          </h2>
          <p className="text-slate-600 dark:text-ink-300 text-lg">
            Fill out the form below and our team will reach out within 24 hours to schedule your free consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left: contact info */}
          <div className="md:col-span-1 lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info) => {
              const content = (
                <div className="glass-card p-5 flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-600/20 dark:to-navy-800/20 border border-slate-200 dark:border-navy-500/20 flex items-center justify-center group-hover:from-accent-500 group-hover:to-accent-600 group-hover:border-accent-400/30 transition-all duration-500 group-hover:scale-110">
                    <info.icon className="w-6 h-6 text-accent-500 dark:text-navy-300 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-ink-400 uppercase tracking-wider font-semibold mb-0.5">{info.label}</div>
                    <div className="text-slate-800 dark:text-white font-medium">{info.value}</div>
                  </div>
                </div>
              );
              return info.href ? (
                <a key={info.label} href={info.href} className="block">{content}</a>
              ) : (
                <div key={info.label}>{content}</div>
              );
            })}

            {/* Socials */}
            <div className="glass-card p-5">
              <div className="text-xs text-slate-500 dark:text-ink-400 uppercase tracking-wider font-semibold mb-3">Follow Us</div>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-ink-300 hover:bg-accent-500 hover:text-white hover:border-accent-400 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-1 lg:col-span-3">
            <div className="glass-card !rounded-3xl p-6 sm:p-8 lg:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6 animate-scale-in">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-800 dark:text-white mb-3">Request Received!</h3>
                  <p className="text-slate-600 dark:text-ink-300 max-w-md mb-6">
                    Thank you for reaching out. Our team will contact you within 24 hours to schedule your free consultation.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-ink-200 mb-2">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-ink-400 focus:outline-none focus:border-accent-500/50 focus:bg-white dark:focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-ink-200 mb-2">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-ink-400 focus:outline-none focus:border-accent-500/50 focus:bg-white dark:focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-ink-200 mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-ink-400 focus:outline-none focus:border-accent-500/50 focus:bg-white dark:focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="business_stage" className="block text-sm font-medium text-slate-700 dark:text-ink-200 mb-2">Business Stage</label>
                    <select
                      id="business_stage"
                      name="business_stage"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-accent-500/50 focus:bg-white dark:focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-white dark:bg-ink-900 text-slate-800 dark:text-white">Select your stage</option>
                      {businessStages.map((stage) => (
                        <option key={stage} value={stage} className="bg-white dark:bg-ink-900 text-slate-800 dark:text-white">{stage}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-ink-200 mb-2">Message <span className="text-slate-400 dark:text-ink-400 font-normal">(optional)</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your trucking goals..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-ink-400 focus:outline-none focus:border-accent-500/50 focus:bg-white dark:focus:bg-white/[0.07] transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary group text-base w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Start My Trucking Business
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
