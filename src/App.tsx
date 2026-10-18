/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AgencyHero } from './components/AgencyHero';
import { CoreCapabilities } from './components/CoreCapabilities';
import { InteractiveWorkflowCanvas } from './components/InteractiveWorkflowCanvas';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { ClientDashboard } from './components/ClientDashboard';
import { LeadIntakeModal } from './components/LeadIntakeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'marketing' | 'dashboard'>('marketing');
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture'>('overview');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [presetBudget, setPresetBudget] = useState<string | undefined>(undefined);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('nexusflow_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('nexusflow_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenAuditModal = (budget?: string) => {
    if (budget) setPresetBudget(budget);
    setIsAuditModalOpen(true);
  };

  const handleSelectCapability = (tab: 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture') => {
    setDashboardTab(tab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreWorkflows = () => {
    if (currentView !== 'marketing') {
      setCurrentView('marketing');
      setTimeout(() => {
        document.getElementById('workflows')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('workflows')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#070b14] text-slate-100'} flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 transition-colors duration-200`}>
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuditModal={() => handleOpenAuditModal()}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Viewport */}
      {currentView === 'marketing' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <AgencyHero
            onExploreWorkflows={handleExploreWorkflows}
            onOpenDashboard={() => {
              setCurrentView('dashboard');
              setDashboardTab('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuditModal={() => handleOpenAuditModal()}
          />

          {/* Core Capabilities Bento Grid */}
          <CoreCapabilities onSelectCapability={handleSelectCapability} />

          {/* Observable n8n Interactive Workflow Canvas */}
          <InteractiveWorkflowCanvas />

          {/* Interactive ROI & Time Saved Calculator */}
          <RoiCalculator onOpenAuditModal={handleOpenAuditModal} />

          {/* Quantified Client Case Studies */}
          <CaseStudies />
        </main>
      ) : (
        <main className="flex-1">
          {/* Client Automation Command Center */}
          <ClientDashboard
            initialTab={dashboardTab}
            onSwitchToMarketing={() => {
              setCurrentView('marketing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuditModal={() => handleOpenAuditModal()}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onSwitchView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuditModal={() => handleOpenAuditModal()}
      />

      {/* Lead Intake Modal */}
      <LeadIntakeModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        presetBudget={presetBudget}
      />
    </div>
  );
}
