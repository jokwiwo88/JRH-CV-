import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVData, INITIAL_CV_DATA } from './types';

interface CVContextType {
  cvData: CVData;
  updateCVData: (newData: Partial<CVData>) => void;
  updateProfile: (profile: Partial<CVData['profile']>) => void;
  addExperience: (exp: any) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: any) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: { name: string; level: number }) => void;
  removeSkill: (name: string) => void;
  updateSkill: (name: string, level: number) => void;
  addProject: (proj: any) => void;
  removeProject: (id: string) => void;
  addPhoto: (photo: any) => void;
  removePhoto: (id: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const updateCVData = (newData: Partial<CVData>) => {
    setCvData(prev => ({ ...prev, ...newData }));
  };

  const updateProfile = (profile: Partial<CVData['profile']>) => {
    setCvData(prev => ({ ...prev, profile: { ...prev.profile, ...profile } }));
  };

  const addExperience = (exp: any) => {
    setCvData(prev => ({ ...prev, experiences: [...prev.experiences, { ...exp, id: crypto.randomUUID() }] }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  };

  const addEducation = (edu: any) => {
    setCvData(prev => ({ ...prev, education: [...prev.education, { ...edu, id: crypto.randomUUID() }] }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const addSkill = (skill: { name: string; level: number }) => {
    if (!cvData.skills.find(s => s.name === skill.name)) {
      setCvData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (name: string) => {
    setCvData(prev => ({ ...prev, skills: prev.skills.filter(s => s.name !== name) }));
  };

  const updateSkill = (name: string, level: number) => {
    setCvData(prev => ({ 
      ...prev, 
      skills: prev.skills.map(s => s.name === name ? { ...s, level } : s) 
    }));
  };

  const addProject = (proj: any) => {
    setCvData(prev => ({ ...prev, projects: [...prev.projects, { ...proj, id: crypto.randomUUID() }] }));
  };

  const removeProject = (id: string) => {
    setCvData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addPhoto = (photo: any) => {
    setCvData(prev => ({ ...prev, activityPhotos: [...prev.activityPhotos, { ...photo, id: crypto.randomUUID() }] }));
  };

  const removePhoto = (id: string) => {
    setCvData(prev => ({ ...prev, activityPhotos: prev.activityPhotos.filter(p => p.id !== id) }));
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <CVContext.Provider value={{
      cvData, updateCVData, updateProfile,
      addExperience, removeExperience,
      addEducation, removeEducation,
      addSkill, removeSkill, updateSkill,
      addProject, removeProject,
      addPhoto, removePhoto,
      isDarkMode, toggleTheme
    }}>
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error('useCV must be used within a CVProvider');
  return context;
};
