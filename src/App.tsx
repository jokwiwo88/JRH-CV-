import React, { useState } from 'react';
import { CVProvider } from './CVContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'about'>('landing');

  return (
    <CVProvider>
      <div className="font-sans antialiased">
        {view === 'landing' && (
          <LandingPage 
            onStart={() => setView('dashboard')} 
            onAbout={() => setView('about')}
          />
        )}
        {view === 'dashboard' && (
          <Dashboard onBackToLanding={() => setView('landing')} />
        )}
        {view === 'about' && (
          <AboutPage onBack={() => setView('landing')} />
        )}
      </div>
    </CVProvider>
  );
}
