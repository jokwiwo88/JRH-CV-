import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: "Andi Saputra", role: "Software Engineer", content: "Bikin CV di JRH CV gampang banget. Desainnya kelihatan profesional.", rating: 5 },
  { name: "Sarah Jenkins", role: "Marketing Director", content: "Templates look modern and recruiter-friendly. Highly recommend!", rating: 5 },
  { name: "Budi Santoso", role: "Product Manager", content: "Platform ini membantu saya mendapatkan interview di Top Tech Company.", rating: 5 },
  { name: "Elena Rodriguez", role: "UX Designer", content: "The portfolio gallery feature is a game changer for creatives.", rating: 5 },
  { name: "Rina Wijaya", role: "Fresh Graduate", content: "Sangat membantu buat yang belum pernah bikin CV sebelumnya.", rating: 5 },
  { name: "Michael Chen", role: "Data Scientist", content: "Clean, elegant, and very easy to use. Best CV builder I've found.", rating: 5 },
];

const TestimonialRow = () => {
  return (
    <div className="relative overflow-hidden py-10 bg-slate-50 dark:bg-slate-900/50">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="inline-block mx-4 w-80 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex gap-1 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm italic mb-4 whitespace-normal">
              "{t.content}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                {t.name[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialRow;
