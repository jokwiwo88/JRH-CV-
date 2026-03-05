import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateCVStrength = (data: any) => {
  let score = 0;
  if (data.profile.fullName) score += 10;
  if (data.profile.summary) score += 15;
  if (data.experiences.length > 0) score += 25;
  if (data.skills.length > 0) score += 15;
  if (data.education.length > 0) score += 15;
  if (data.projects.length > 0) score += 10;
  if (data.activityPhotos.length > 0) score += 10;
  return score;
};

export const calculateATSScore = (data: any) => {
  // Simple heuristic for ATS score
  let score = 60; // Base score
  if (data.profile.summary.length > 100) score += 10;
  if (data.experiences.some((e: any) => e.description.length > 50)) score += 10;
  if (data.skills.length > 10) score += 10;
  if (data.profile.email && data.profile.phone) score += 10;
  return Math.min(score, 100);
};
