import React, { useState } from 'react';
import {
  Terminal,
  ArrowRight,
  LayoutDashboard,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Zap,
  Cpu,
  Calculator,
  TrendingUp,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (sectionId) {
      if (currentView !== 'marketing') {
        onViewChange('marketing');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onViewChange('marketing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        {/* Left: Brand Identity & Live Status Badge */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => handleNavClick()}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            aria-label="NexusFlow Home"
          >
            <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/25 group-hover:shadow-cyan-500/40 group-hover:scale-105 transition-all">
              <Terminal className="w-4 h-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  Nexus<span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Flow</span>
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-cyan-400 font-medium tracking-wider uppercase -mt-0.5 hidden xs:inline">
                Marketing Automation
              </span>
            </div>
          </button>

          {/* Live Engine Status Pill (Medium + Large screens) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>n8n Engine Online</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick()}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'marketing'
                ? 'text-cyan-400 font-semibold bg-cyan-950/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            How It Works
          </button>
          <a
            href="#capabilities"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('capabilities');
            }}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap text-slate-300"
          >
            Features
          </a>
          <a
            href="#workflows"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('workflows');
            }}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap text-slate-300 flex items-center gap-1.5"
          >
            <span>Automations</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-mono">
              n8n
            </span>
          </a>
          <a
            href="#roi-calculator"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('roi-calculator');
            }}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap text-slate-300"
          >
            ROI Calculator
          </a>
          <a
            href="#case-studies"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('case-studies');
            }}
            className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all whitespace-nowrap text-slate-300"
          >
            Case Studies
          </a>
        </nav>

        {/* Right: Controls & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Segmented View Switcher (Agency Website vs Live Dashboard) */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/80 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => {
                if (currentView !== 'marketing') onViewChange('marketing');
              }}
              title="View Marketing & Agency Presentation"
              className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentView === 'marketing'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${currentView === 'marketing' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Website</span>
            </button>

            <button
              onClick={() => {
                if (currentView !== 'dashboard') onViewChange('dashboard');
              }}
              title="View Live Automation & Client Dashboard"
              className={`px-2.5 sm:px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentView === 'dashboard'
                  ? 'bg-cyan-950/60 text-cyan-300 font-semibold shadow-sm border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className={`w-3.5 h-3.5 ${currentView === 'dashboard' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Live </span>
              <span>Dashboard</span>
            </button>
          </div>

          {/* Dark / Light Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 text-xs font-medium rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
              )}
            </button>
          )}

          {/* Primary CTA Button */}
          <button
            onClick={onOpenAuditModal}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 flex items-center gap-1.5 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>Get <span className="hidden sm:inline">Free </span>Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg transition-colors flex items-center justify-center shrink-0 active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800/90 px-4 py-4 space-y-4 bg-slate-950/98 backdrop-blur-2xl animate-fadeIn shadow-2xl">
          {/* Status Banner inside Drawer */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">n8n Automation Engine</span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400">100% Operational</span>
          </div>

          {/* Mobile Links with Icons */}
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
            <button
              onClick={() => handleNavClick()}
              className="flex items-center gap-3 text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-900 hover:text-cyan-300 transition-colors"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>How It Works</span>
            </button>
            <button
              onClick={() => handleNavClick('capabilities')}
              className="flex items-center gap-3 text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-900 hover:text-cyan-300 transition-colors"
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Features & Automation Systems</span>
            </button>
            <button
              onClick={() => handleNavClick('workflows')}
              className="flex items-center gap-3 text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-900 hover:text-cyan-300 transition-colors"
            >
              <Terminal className="w-4 h-4 text-violet-400" />
              <span>Interactive Workflow Pipelines</span>
            </button>
            <button
              onClick={() => handleNavClick('roi-calculator')}
              className="flex items-center gap-3 text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-900 hover:text-cyan-300 transition-colors"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>ROI Savings Calculator</span>
            </button>
            <button
              onClick={() => handleNavClick('case-studies')}
              className="flex items-center gap-3 text-left px-3.5 py-2.5 rounded-lg hover:bg-slate-900 hover:text-cyan-300 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Case Studies & Client ROI</span>
            </button>
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewChange('marketing');
                }}
                className={`py-2 px-3 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                  currentView === 'marketing'
                    ? 'bg-slate-800 text-white border-slate-700 font-semibold'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Website</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewChange('dashboard');
                }}
                className={`py-2 px-3 rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                  currentView === 'dashboard'
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 font-semibold'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dashboard</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-300 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Your Free Growth Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
