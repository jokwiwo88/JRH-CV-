export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface ActivityPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface CVData {
  profile: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    avatar: string;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  activityPhotos: ActivityPhoto[];
  template: string;
  theme: 'light' | 'dark';
  primaryColor: string;
  fontFamily: string;
}

export const INITIAL_CV_DATA: CVData = {
  profile: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    avatar: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  activityPhotos: [],
  template: 'modern',
  theme: 'light',
  primaryColor: '#4f46e5',
  fontFamily: 'Inter',
};
