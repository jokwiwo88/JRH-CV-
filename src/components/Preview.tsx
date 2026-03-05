import React from 'react';
import { useCV } from '../CVContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Download, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import SkillsRadar from './SkillsRadar';

const Preview = () => {
  const { cvData } = useCV();
  const { profile, experiences, skills, education, projects, activityPhotos, template, primaryColor, fontFamily } = cvData;

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return (
          <div 
            className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full p-12 transition-colors duration-500"
            style={{ fontFamily: fontFamily }}
          >
            {/* Header */}
            <header className="mb-12 border-b-2 border-slate-900 dark:border-slate-100 pb-8">
              <h1 className="text-5xl font-black tracking-tighter mb-2 uppercase">{profile.fullName || 'Your Name'}</h1>
              <p className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>{profile.title || 'Professional Title'}</p>
              <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                {profile.email && <span className="flex items-center gap-2"><Mail size={16} /> {profile.email}</span>}
                {profile.phone && <span className="flex items-center gap-2"><Phone size={16} /> {profile.phone}</span>}
                {profile.location && <span className="flex items-center gap-2"><MapPin size={16} /> {profile.location}</span>}
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12">
              <div className="col-span-8 space-y-12">
                {/* Summary */}
                {profile.summary && (
                  <section>
                    <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 border-b pb-2">Profile</h2>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{profile.summary}</p>
                  </section>
                )}

                {/* Experience */}
                <section>
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-8 border-b pb-2">Experience</h2>
                  <div className="space-y-10">
                    {experiences.length > 0 ? experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-slate-950" style={{ backgroundColor: primaryColor }}></div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-xl">{exp.position}</h3>
                          <span className="text-sm font-bold text-slate-400">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        </div>
                        <p className="font-bold mb-3" style={{ color: primaryColor }}>{exp.company}</p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{exp.description}</p>
                      </div>
                    )) : (
                      <p className="text-slate-400 italic">Add your work experience to see it here.</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="col-span-4 space-y-12">
                {/* Skills */}
                <section>
                  <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-6 border-b pb-2">Expertise</h2>
                  <div className="mb-8">
                    <SkillsRadar skills={skills} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div key={skill.name} className="group relative">
                        <span 
                          className="px-3 py-1.5 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {skill.name}
                          <span className="text-[10px] opacity-50">{skill.level}%</span>
                        </span>
                        <div 
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 text-white text-[10px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Proficiency: {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* QR Code */}
                <section className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Scan to view online</p>
                  <div className="inline-block p-2 bg-white rounded-xl shadow-sm mb-4">
                    <QRCodeSVG value="https://jrh-cv.com/jefri" size={100} />
                  </div>
                  <p className="text-xs font-bold" style={{ color: primaryColor }}>jrh-cv.com/jefri</p>
                </section>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t flex justify-between items-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Built with JRH CV — Premium Career Identity</p>
              <div className="flex gap-4">
                <Globe size={16} className="text-slate-300" />
                <Linkedin size={16} className="text-slate-300" />
                <Github size={16} className="text-slate-300" />
              </div>
            </footer>
          </div>
        );
      case 'minimal':
        return (
          <div 
            className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full p-16 transition-colors duration-500"
            style={{ fontFamily: fontFamily }}
          >
            <header className="mb-16 text-center">
              <h1 className="text-4xl mb-4 tracking-tight">{profile.fullName || 'Your Name'}</h1>
              <p className="italic mb-8 opacity-60">{profile.title || 'Professional Title'}</p>
              <div className="flex justify-center gap-8 text-xs uppercase tracking-widest opacity-40">
                <span>{profile.email}</span>
                <span>{profile.phone}</span>
                <span>{profile.location}</span>
              </div>
            </header>
            
            <section className="max-w-2xl mx-auto space-y-16">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] opacity-30 mb-8 text-center">About</h2>
                <p className="text-center leading-relaxed opacity-70 italic">"{profile.summary}"</p>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] opacity-30 mb-8 text-center">Skills</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {skills.map(skill => (
                    <div key={skill.name} className="text-center">
                      <p className="text-sm font-bold opacity-80">{skill.name}</p>
                      <div className="w-20 h-1 bg-slate-100 dark:bg-slate-800 mx-auto mt-1 rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${skill.level}%`, backgroundColor: primaryColor }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] opacity-30 mb-8 text-center">Experience</h2>
                <div className="space-y-12">
                  {experiences.map(exp => (
                    <div key={exp.id} className="text-center">
                      <h3 className="text-lg mb-1">{exp.position}</h3>
                      <p className="text-sm opacity-50 mb-4">{exp.company} / {exp.startDate} — {exp.endDate}</p>
                      <p className="text-sm opacity-60 max-w-lg mx-auto leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return <div>Template not found</div>;
    }
  };

  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900 p-8 overflow-y-auto print:p-0 print:bg-white">
      <div className="max-w-[850px] mx-auto mb-8 flex justify-end gap-4 print:hidden">
        <button 
          onClick={handlePrint}
          className="premium-button-secondary py-2 px-4 text-sm"
        >
          <Printer size={16} /> Print ATS CV
        </button>
        <button className="premium-button-primary py-2 px-4 text-sm">
          <Download size={16} /> Export PDF
        </button>
      </div>
      <div className="max-w-[850px] mx-auto shadow-2xl min-h-[1100px] print:shadow-none print:max-w-none">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Preview;
