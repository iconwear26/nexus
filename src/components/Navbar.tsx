import React from 'react';
import { Sparkles, Terminal, ArrowRight, LayoutDashboard, Globe, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentView: 'marketing' | 'dashboard';
  onViewChange: (view: 'marketing' | 'dashboard') => void;
  onOpenAuditModal: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenAuditModal,
  theme = 'dark',
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single element Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onViewChange('marketing')}
            className="flex items-center gap-2.5 text-left group transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
                NexusFlow
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold tracking-wider uppercase -mt-0.5">
                Marketing Automation
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onViewChange('marketing')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              currentView === 'marketing' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            How It Works
          </button>
          <a
            href="#capabilities"
            onClick={(e) => {
              if (currentView !== 'marketing') {
                e.preventDefault();
                onViewChange('marketing');
                setTimeout(() => {
                  document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap text-slate-300"
          >
            Features
          </a>
          <a
            href="#workflows"
            onClick={(e) => {
              if (currentView !== 'marketing') {
                e.preventDefault();
                onViewChange('marketing');
                setTimeout(() => {
                  document.getElementById('workflows')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap text-slate-300"
          >
            Automations
          </a>
          <a
            href="#roi-calculator"
            onClick={(e) => {
              if (currentView !== 'marketing') {
                e.preventDefault();
                onViewChange('marketing');
                setTimeout(() => {
                  document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap text-slate-300"
          >
            ROI Calculator
          </a>
          <a
            href="#case-studies"
            onClick={(e) => {
              if (currentView !== 'marketing') {
                e.preventDefault();
                onViewChange('marketing');
                setTimeout(() => {
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-white transition-colors whitespace-nowrap text-slate-300"
          >
            Results
          </a>
        </nav>

        {/* Zone 3: Primary Action & Mode Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Light / Dark Mode Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-xs font-medium rounded-lg border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-fadeIn" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 animate-fadeIn" />
              )}
            </button>
          )}

          {/* View switcher button */}
          <button
            onClick={() => onViewChange(currentView === 'marketing' ? 'dashboard' : 'marketing')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-2 whitespace-nowrap ${
              currentView === 'dashboard'
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {currentView === 'marketing' ? (
              <>
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Dashboard</span>
              </>
            ) : (
              <>
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Agency Website</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenAuditModal}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Free Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
