import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Target, Users, Globe, Sparkles, Moon, Sun } from 'lucide-react';
import { useCV } from '../CVContext';

const AboutPage = ({ onBack }: { onBack: () => void }) => {
  const { isDarkMode, toggleTheme } = useCV();
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={onBack}
            className="text-indigo-600 font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
          >
            ← Back to Home
          </button>
          <button 
            onClick={toggleTheme}
            className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl text-slate-600 dark:text-slate-400 hover:scale-110 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
            The Future of <br />
            <span className="text-indigo-600">Professional Identity</span>
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
              Traditional CV documents are outdated. In a world that moves at the speed of light, a static PDF is no longer enough to represent the depth of your talent.
            </p>
            
            <p>
              JRH CV was born from a simple vision: to empower job seekers with a digital identity that is as dynamic and impressive as their careers. We believe that your first impression should be a powerful experience, not just a list of bullet points.
            </p>

            <div className="grid md:grid-cols-2 gap-8 py-12">
              <div className="premium-card">
                <Target className="text-indigo-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-sm">To bridge the gap between talent and opportunity through world-class design and intelligent technology.</p>
              </div>
              <div className="premium-card">
                <Sparkles className="text-indigo-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                <p className="text-sm">A world where every professional has a beautiful, intelligent, and effective digital presence.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Why JRH CV?</h2>
            <p>
              We don't just generate CVs. We build career platforms. Every template is crafted with recruiter psychology in mind. Every AI suggestion is tuned for maximum impact. Every line of code is written to make you look like the top 1% in your field.
            </p>
            
            <div className="bg-indigo-600 rounded-3xl p-10 text-white mt-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-3xl font-bold mb-4">Ready to transform your career?</h3>
              <p className="mb-8 text-indigo-100 max-w-lg">Join thousands of professionals who have already built their powerful identity with JRH CV.</p>
              <button 
                onClick={onBack}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Start Building Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
