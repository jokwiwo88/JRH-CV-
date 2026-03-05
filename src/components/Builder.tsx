import React from 'react';
import { motion } from 'motion/react';
import { useCV } from '../CVContext';
import { cn } from '../lib/utils';
import { 
  User, Briefcase, GraduationCap, 
  Wrench, FolderKanban, Camera, 
  Eye, Sparkles, Plus, Trash2,
  ChevronRight, ChevronLeft,
  CheckCircle2, AlertCircle, Palette
} from 'lucide-react';
import { generateCareerSummary, getSkillSuggestions, getImpactSuggestions } from '../services/gemini';
import { calculateCVStrength, calculateATSScore } from '../lib/utils';

const Builder = () => {
  const { 
    cvData, updateProfile, updateCVData,
    addExperience, removeExperience,
    addEducation, removeEducation,
    addSkill, removeSkill, updateSkill,
    addProject, removeProject,
    addPhoto, removePhoto
  } = useCV();

  const [step, setStep] = React.useState(0);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const steps = [
    { id: 'profile', title: 'Profile', icon: <User size={20} />, description: 'Your basic professional information' },
    { id: 'experience', title: 'Experience', icon: <Briefcase size={20} />, description: 'Your professional work history' },
    { id: 'skills', title: 'Skills', icon: <Wrench size={20} />, description: 'Your core competencies' },
    { id: 'education', title: 'Education', icon: <GraduationCap size={20} />, description: 'Your academic background' },
    { id: 'portfolio', title: 'Portfolio', icon: <FolderKanban size={20} />, description: 'Showcase your best projects' },
    { id: 'photos', title: 'Activity', icon: <Camera size={20} />, description: 'Photos of your professional life' },
    { id: 'design', title: 'Design', icon: <Palette size={20} />, description: 'Customize your CV look' },
  ];

  const handleGenerateSummary = async () => {
    if (!cvData.profile.title || !cvData.skills.length) {
      alert("Please enter your title and some skills first for better results.");
      return;
    }
    setIsGenerating(true);
    const summary = await generateCareerSummary(cvData.profile.title, cvData.skills.join(", "), "Career growth and leadership");
    updateProfile({ summary });
    setIsGenerating(false);
  };

  const strength = calculateCVStrength(cvData);
  const atsScore = calculateATSScore(cvData);

  return (
    <div className="flex flex-col h-full">
      {/* Header with Progress */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Build Your Identity</h2>
            <p className="text-slate-500 text-sm">Step {step + 1} of {steps.length}: {steps[step].title}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CV Strength</p>
              <p className={cn("text-lg font-bold", strength > 70 ? "text-emerald-500" : "text-amber-500")}>{strength}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Score</p>
              <p className={cn("text-lg font-bold", atsScore > 80 ? "text-emerald-500" : "text-indigo-500")}>{atsScore}%</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {steps.map((s, i) => (
            <div 
              key={s.id} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"
              )}
            />
          ))}
        </div>
      </div>

      {/* Builder Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    className="premium-input" 
                    placeholder="e.g. Jefri Rahman Hakim"
                    value={cvData.profile.fullName}
                    onChange={(e) => updateProfile({ fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Title</label>
                  <input 
                    type="text" 
                    className="premium-input" 
                    placeholder="e.g. Senior Product Designer"
                    value={cvData.profile.title}
                    onChange={(e) => updateProfile({ title: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input 
                    type="email" 
                    className="premium-input" 
                    placeholder="hello@jefri.com"
                    value={cvData.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input 
                    type="tel" 
                    className="premium-input" 
                    placeholder="+62 812..."
                    value={cvData.profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Summary</label>
                  <button 
                    onClick={handleGenerateSummary}
                    disabled={isGenerating}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50"
                  >
                    <Sparkles size={12} /> {isGenerating ? 'Generating...' : 'AI Generate'}
                  </button>
                </div>
                <textarea 
                  className="premium-input min-h-[150px] resize-none" 
                  placeholder="Tell your professional story..."
                  value={cvData.profile.summary}
                  onChange={(e) => updateProfile({ summary: e.target.value })}
                />
                <p className="text-xs text-slate-500 italic">Tip: Focus on your unique value proposition and key achievements.</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Work Experience</h3>
                <button 
                  onClick={() => addExperience({ company: '', position: '', startDate: '', endDate: '', description: '', isCurrent: false })}
                  className="premium-button-secondary py-2 px-4 text-sm"
                >
                  <Plus size={16} /> Add Experience
                </button>
              </div>
              
              {cvData.experiences.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <Briefcase className="mx-auto text-slate-300 mb-4" size={40} />
                  <p className="text-slate-500">No experience added yet. Start building your history!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cvData.experiences.map((exp) => (
                    <div key={exp.id} className="premium-card p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
                          <input 
                            type="text" 
                            className="premium-input py-2" 
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => {
                              const newExps = cvData.experiences.map(x => x.id === exp.id ? { ...x, company: e.target.value } : x);
                              updateCVData({ experiences: newExps });
                            }}
                          />
                          <input 
                            type="text" 
                            className="premium-input py-2" 
                            placeholder="Position"
                            value={exp.position}
                            onChange={(e) => {
                              const newExps = cvData.experiences.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x);
                              updateCVData({ experiences: newExps });
                            }}
                          />
                        </div>
                        <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Description</label>
                        <button 
                          onClick={async () => {
                            if (!exp.description) return;
                            const improved = await getImpactSuggestions(exp.description);
                            const newExps = cvData.experiences.map(x => x.id === exp.id ? { ...x, description: improved } : x);
                            updateCVData({ experiences: newExps });
                          }}
                          className="text-[10px] font-bold text-indigo-600 flex items-center gap-1"
                        >
                          <Sparkles size={10} /> AI Improve Impact
                        </button>
                      </div>
                      <textarea 
                        className="premium-input py-2 min-h-[80px]" 
                        placeholder="What did you achieve? Use impact verbs..."
                        value={exp.description}
                        onChange={(e) => {
                          const newExps = cvData.experiences.map(x => x.id === exp.id ? { ...x, description: e.target.value } : x);
                          updateCVData({ experiences: newExps });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional Skills</h3>
                <div className="flex gap-2">
                  <input 
                    id="skill-input"
                    type="text" 
                    className="premium-input flex-1" 
                    placeholder="e.g. React, UI Design, Project Management"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addSkill({ name: e.currentTarget.value, level: 80 });
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('skill-input') as HTMLInputElement;
                      if (input.value) {
                        addSkill({ name: input.value, level: 80 });
                        input.value = '';
                      }
                    }}
                    className="premium-button-primary px-4"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid gap-4">
                {cvData.skills.map((skill) => (
                  <div key={skill.name} className="premium-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                      <button onClick={() => removeSkill(skill.name)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.name, parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <span className="text-sm font-bold text-indigo-600 w-8 text-right">{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 flex gap-3">
                <Sparkles className="text-indigo-600 shrink-0" size={20} />
                <div className="space-y-2">
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    <strong>AI Skill Suggestions:</strong> Based on your role, these skills are trending:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Figma', 'Prototyping', 'Design Systems', 'User Research'].map(s => (
                      <button 
                        key={s}
                        onClick={() => addSkill({ name: s, level: 80 })}
                        className="text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
                <button 
                  onClick={() => addEducation({ school: '', degree: '', field: '', startDate: '', endDate: '' })}
                  className="premium-button-secondary py-2 px-4 text-sm"
                >
                  <Plus size={16} /> Add Education
                </button>
              </div>
              <div className="space-y-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="premium-card p-4 space-y-4">
                    <div className="flex justify-between">
                      <input 
                        type="text" 
                        className="premium-input py-2 flex-1 mr-4" 
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = cvData.education.map(x => x.id === edu.id ? { ...x, school: e.target.value } : x);
                          updateCVData({ education: newEdu });
                        }}
                      />
                      <button onClick={() => removeEducation(edu.id)} className="text-red-500 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        className="premium-input py-2" 
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = cvData.education.map(x => x.id === edu.id ? { ...x, degree: e.target.value } : x);
                          updateCVData({ education: newEdu });
                        }}
                      />
                      <input 
                        type="text" 
                        className="premium-input py-2" 
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = cvData.education.map(x => x.id === edu.id ? { ...x, field: e.target.value } : x);
                          updateCVData({ education: newEdu });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Portfolio Projects</h3>
                <button 
                  onClick={() => addProject({ title: '', description: '', link: '' })}
                  className="premium-button-secondary py-2 px-4 text-sm"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>
              <div className="space-y-4">
                {cvData.projects.map((proj) => (
                  <div key={proj.id} className="premium-card p-4 space-y-4">
                    <div className="flex justify-between">
                      <input 
                        type="text" 
                        className="premium-input py-2 flex-1 mr-4" 
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => {
                          const newProj = cvData.projects.map(x => x.id === proj.id ? { ...x, title: e.target.value } : x);
                          updateCVData({ projects: newProj });
                        }}
                      />
                      <button onClick={() => removeProject(proj.id)} className="text-red-500 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <textarea 
                      className="premium-input py-2 min-h-[60px]" 
                      placeholder="Brief description of your work..."
                      value={proj.description}
                      onChange={(e) => {
                        const newProj = cvData.projects.map(x => x.id === proj.id ? { ...x, description: e.target.value } : x);
                        updateCVData({ projects: newProj });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Photo Gallery</h3>
                <button 
                  onClick={() => addPhoto({ url: `https://picsum.photos/seed/${Math.random()}/400/300`, caption: '' })}
                  className="premium-button-secondary py-2 px-4 text-sm"
                >
                  <Plus size={16} /> Add Activity Photo
                </button>
              </div>
              <p className="text-sm text-slate-500">Showcase your professional life: events, team work, or projects in action.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {cvData.activityPhotos.map((photo) => (
                  <div key={photo.id} className="premium-card p-2 space-y-2 group relative">
                    <img src={photo.url} alt="Activity" className="w-full h-32 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <input 
                      type="text" 
                      className="premium-input py-1 text-xs" 
                      placeholder="Caption..."
                      value={photo.caption}
                      onChange={(e) => {
                        const newPhotos = cvData.activityPhotos.map(x => x.id === photo.id ? { ...x, caption: e.target.value } : x);
                        updateCVData({ activityPhotos: newPhotos });
                      }}
                    />
                    <button 
                      onClick={() => removePhoto(photo.id)} 
                      className="absolute top-4 right-4 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Brand Color</h3>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    '#4f46e5', '#0ea5e9', '#10b981', 
                    '#f59e0b', '#ef4444', '#ec4899',
                    '#8b5cf6', '#6366f1', '#14b8a6',
                    '#f97316', '#06b6d4', '#000000'
                  ].map(color => (
                    <button 
                      key={color}
                      onClick={() => updateCVData({ primaryColor: color })}
                      className={cn(
                        "w-full aspect-square rounded-xl border-2 transition-all",
                        cvData.primaryColor === color ? "border-indigo-600 scale-110 shadow-lg" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Typography</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Inter', name: 'Modern Sans' },
                    { id: 'Playfair Display', name: 'Elegant Serif' },
                    { id: 'Outfit', name: 'Tech Grotesk' },
                    { id: 'JetBrains Mono', name: 'Developer Mono' }
                  ].map(font => (
                    <button 
                      key={font.id}
                      onClick={() => updateCVData({ fontFamily: font.id })}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        cvData.fontFamily === font.id ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" : "border-slate-100 dark:border-slate-800"
                      )}
                    >
                      <p className="text-sm font-bold" style={{ fontFamily: font.id }}>{font.name}</p>
                      <p className="text-xs text-slate-500">The quick brown fox</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex justify-between">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="premium-button-secondary disabled:opacity-50"
        >
          <ChevronLeft size={20} /> Previous
        </button>
        <button 
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          className="premium-button-primary"
        >
          {step === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Builder;
