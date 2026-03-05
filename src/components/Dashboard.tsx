import React from 'react';
import { motion } from 'motion/react';
import { useCV } from '../CVContext';
import { cn, calculateCVStrength } from '../lib/utils';
import { 
  LayoutDashboard, FileText, Palette, 
  BarChart3, Settings, LogOut, 
  Moon, Sun, Bell, Search,
  Menu, X, Info, TrendingUp, Users, Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Builder from './Builder';
import Preview from './Preview';
import AboutPage from './AboutPage';

const Dashboard = ({ onBackToLanding }: { onBackToLanding: () => void }) => {
  const { isDarkMode, toggleTheme, cvData, updateCVData } = useCV();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('create');
  const [showAbout, setShowAbout] = React.useState(false);

  const analyticsData = [
    { name: 'Mon', views: 400, scans: 240 },
    { name: 'Tue', views: 300, scans: 139 },
    { name: 'Wed', views: 200, scans: 980 },
    { name: 'Thu', views: 278, scans: 390 },
    { name: 'Fri', views: 189, scans: 480 },
    { name: 'Sat', views: 239, scans: 380 },
    { name: 'Sun', views: 349, scans: 430 },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'create', label: 'Create CV', icon: <FileText size={20} /> },
    { id: 'templates', label: 'Templates', icon: <Palette size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'about', label: 'About JRH CV', icon: <Info size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  const templates = [
    { id: 'modern', name: 'Modern Executive', color: 'bg-indigo-600' },
    { id: 'minimal', name: 'Clean Minimal', color: 'bg-slate-900' },
    { id: 'professional', name: 'Corporate Pro', color: 'bg-blue-800' },
    { id: 'creative', name: 'Creative Portfolio', color: 'bg-pink-500' },
    { id: 'startup', name: 'Tech Startup', color: 'bg-emerald-500' },
    { id: 'elegant', name: 'Elegant Serif', color: 'bg-amber-600' },
  ];

  return (
    <div className="h-screen flex bg-white dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 bg-white dark:bg-slate-950"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0">J</div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">JRH CV</span>}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'about') setShowAbout(true);
                else setActiveTab(item.id);
              }}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                activeTab === item.id 
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold" 
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {isSidebarOpen && (
          <div className="px-6 py-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">CV Strength</span>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{calculateCVStrength(cvData)}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateCVStrength(cvData)}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-2">Complete more sections to reach 100%</p>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            {isSidebarOpen && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Exit Platform</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-slate-950">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search features..." 
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Jefri Rahman</p>
                <p className="text-xs text-slate-500">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold">
                JR
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {activeTab === 'create' && (
            <>
              <div className="w-full md:w-[450px] lg:w-[550px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
                <Builder />
              </div>
              <div className="flex-1 bg-slate-50 dark:bg-slate-900 overflow-hidden hidden md:block">
                <Preview />
              </div>
            </>
          )}

          {activeTab === 'templates' && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Choose Your Identity</h1>
                <p className="text-slate-500 mb-10">Select a template that best represents your professional brand.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {templates.map((t) => (
                    <div 
                      key={t.id} 
                      onClick={() => {
                        updateCVData({ template: t.id });
                        setActiveTab('create');
                      }}
                      className={cn(
                        "premium-card group cursor-pointer overflow-hidden p-0",
                        cvData.template === t.id && "ring-2 ring-indigo-600"
                      )}
                    >
                      <div className={cn("h-48 w-full relative", t.color)}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                          <span className="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold shadow-lg">Use Template</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white">{t.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">Professional & Clean</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Welcome back, Jefri</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="premium-card bg-indigo-600 text-white">
                    <h3 className="text-indigo-100 text-sm font-bold uppercase tracking-wider mb-2">CV Views</h3>
                    <p className="text-4xl font-bold">1,284</p>
                    <div className="mt-4 text-xs text-indigo-200 flex items-center gap-1">
                      <span className="text-emerald-300 font-bold">+12%</span> from last week
                    </div>
                  </div>
                  <div className="premium-card">
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">QR Scans</h3>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white">432</p>
                    <div className="mt-4 text-xs text-slate-500 flex items-center gap-1">
                      <span className="text-emerald-500 font-bold">+5%</span> from last week
                    </div>
                  </div>
                  <div className="premium-card">
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Recruiters</h3>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white">18</p>
                    <div className="mt-4 text-xs text-slate-500 flex items-center gap-1">
                      <span className="text-indigo-500 font-bold">3 new</span> messages
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="premium-card flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Search size={18} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">Someone from Jakarta viewed your CV</p>
                          <p className="text-xs text-slate-500">2 hours ago • via LinkedIn</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 text-xs font-bold">View Details</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
                    <p className="text-slate-500">Track how your professional identity is performing.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-bold">Last 7 Days</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Export Report</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2 premium-card">
                    <h3 className="text-lg font-bold mb-8">Visitor Traffic</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ fontWeight: 'bold' }}
                          />
                          <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="premium-card">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Conversion Rate</p>
                          <p className="text-2xl font-bold">4.2%</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[42%]" />
                      </div>
                    </div>
                    <div className="premium-card">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                          <Users size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Unique Visitors</p>
                          <p className="text-2xl font-bold">842</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[65%]" />
                      </div>
                    </div>
                    <div className="premium-card">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                          <Eye size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg. Time on Page</p>
                          <p className="text-2xl font-bold">2m 45s</p>
                        </div>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[80%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
                <div className="space-y-6">
                  <div className="premium-card">
                    <h3 className="text-lg font-bold mb-6">Profile Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                        <input type="text" className="premium-input" defaultValue="Jefri Rahman" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                        <input type="email" className="premium-input" defaultValue="jefrirh9@gmail.com" />
                      </div>
                    </div>
                    <button className="premium-button-primary mt-8">Save Changes</button>
                  </div>
                  <div className="premium-card border-red-100 dark:border-red-900/30">
                    <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                    <p className="text-sm text-slate-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">Delete Account</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
