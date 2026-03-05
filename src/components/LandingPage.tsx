import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Rocket, Shield, Zap, Layout, 
  BarChart3, Image as ImageIcon, Sparkles, 
  Smartphone, Globe, CheckCircle2, Moon, Sun
} from 'lucide-react';
import { useCV } from '../CVContext';
import TestimonialRow from './TestimonialRow';

const LandingPage = ({ onStart, onAbout }: { onStart: () => void, onAbout: () => void }) => {
  const { isDarkMode, toggleTheme } = useCV();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-bottom border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">J</div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">JRH CV</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button onClick={onAbout} className="hover:text-indigo-600 transition-colors">Vision</button>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#templates" className="hover:text-indigo-600 transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={onStart} className="premium-button-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 inline-block">
              COBA CONTOH INI

                 https://cv-j-lilac.vercel.app/

              CONTOH YA CONTOH 
              
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
              Your Career Deserves a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Powerful First Impression</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a world-class professional CV webpage that stands out. Guided by AI, optimized for recruiters, and designed for the modern web.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={onStart} className="premium-button-primary text-lg px-10 py-4">
                Create Your CV Now <Rocket size={20} />
              </button>
              <button className="premium-button-secondary text-lg px-10 py-4">
                View Templates
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full -z-10"></div>
            <img 
              src="https://picsum.photos/seed/dashboard/1200/800" 
              alt="Dashboard Preview" 
              className="rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "CV Created", value: "+10,000" },
            { label: "Users Helped", value: "+4,000" },
            { label: "Recruiters Connected", value: "+120" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to succeed</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Powerful features designed to help you build a professional identity that gets you hired.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles className="text-indigo-600" />, title: "AI Suggestions", desc: "Smart career summaries and skill suggestions powered by advanced AI." },
              { icon: <Layout className="text-indigo-600" />, title: "Premium Templates", desc: "10+ modern, elegant templates designed by industry professionals." },
              { icon: <BarChart3 className="text-indigo-600" />, title: "Live Analytics", desc: "Track who views your CV and how they interact with your professional profile." },
              { icon: <Shield className="text-indigo-600" />, title: "ATS Optimized", desc: "Ensure your CV passes through Applicant Tracking Systems with ease." },
              { icon: <ImageIcon className="text-indigo-600" />, title: "Portfolio Gallery", desc: "Showcase your work with a beautiful activity and project photo gallery." },
              { icon: <Zap className="text-indigo-600" />, title: "Instant Preview", desc: "See your changes in real-time as you build your professional identity." },
            ].map((f, i) => (
              <div key={i} className="premium-card">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by Professionals Worldwide</h2>
        </div>
        <TestimonialRow />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 dark:text-slate-400">Choose the plan that fits your career goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Free", price: "Rp 0", desc: "Perfect for starting out", features: ["CV Webpage", "Basic Templates", "QR Code", "Mobile Responsive"] },
              { name: "Pro", price: "Rp 99k", desc: "For serious job seekers", features: ["All Templates", "ATS Download", "Portfolio Gallery", "Custom Colors", "Priority Support"], popular: true },
              { name: "Premium", price: "Rp 199k", desc: "The ultimate career tool", features: ["AI Suggestions", "Advanced Analytics", "Custom Domain", "Impact Writing Helper", "Unlimited Photos"] },
            ].map((p, i) => (
              <div key={i} className={cn("premium-card relative", p.popular && "border-indigo-500 ring-2 ring-indigo-500/20")}>
                {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">MOST POPULAR</span>}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{p.price}</span>
                  <span className="text-slate-500 text-sm">/lifetime</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-8">{p.desc}</p>
                <ul className="space-y-4 mb-10">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-indigo-600" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onStart} className={cn("w-full py-4 rounded-xl font-bold transition-all", p.popular ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700")}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <span className="font-bold text-slate-900 dark:text-white">JRH CV</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Built with JRH CV — Empowering Careers Worldwide
          </p>
          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
