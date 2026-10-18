import React from 'react';
import { ArrowRight, Play, Cpu, Zap, Activity, CheckCircle2 } from 'lucide-react';

interface AgencyHeroProps {
  onExploreWorkflows: () => void;
  onOpenDashboard: () => void;
  onOpenAuditModal: () => void;
}

export const AgencyHero: React.FC<AgencyHeroProps> = ({
  onExploreWorkflows,
  onOpenDashboard,
  onOpenAuditModal,
}) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden border-b border-slate-800/80">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left Copy & Right Interactive Architecture Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Friendly text kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="text-cyan-400 uppercase tracking-wider font-semibold">
                All-In-One Growth Engine
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Hands-Free Marketing Automation</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Automate Your Marketing. Get More Leads and Sales on Autopilot.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Stop wasting hours on repetitive manual work. NexusFlow connects your <span className="text-cyan-300 font-medium">Meta Ads, social posts, Google SEO, and CRM</span> into smart automated workflows that run 24/7 without extra headcount.
            </p>

            {/* CTA Block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onOpenAuditModal}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Get Your Free Growth Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDashboard}
                className="px-5 py-3.5 text-sm font-medium text-slate-200 glass-panel hover:bg-slate-800/90 hover:text-white rounded-lg transition-all border border-slate-700/80 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Try Live Dashboard Demo</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>You own 100% of your data & systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Meta & Instagram Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fast Google Search Indexing</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): High-Tech Live Automation Topology Mockup */}
          <div className="lg:col-span-5">
            <div className="glass-panel-elevated rounded-2xl p-6 relative overflow-hidden shadow-2xl border border-slate-700/60">
              {/* Top status bar inside panel */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Active Automation:</span>
                  <span className="text-cyan-300 font-semibold">Ad Budget Protector</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Active & Running</span>
                </div>
              </div>

              {/* Node Architecture diagram preview */}
              <div className="space-y-3 relative font-sans">
                {/* Node 1: Cron / Webhook */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
                      01
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Smart Schedule Check</div>
                      <div className="text-[11px] text-slate-400">Runs every 15 minutes to monitor ad spend</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-cyan-400 tabular-nums">12ms</span>
                </div>

                {/* Connecting Line */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-indigo-500 ml-7" />

                {/* Node 2: Meta Graph API */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                      02
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Ad Fatigue Detector</div>
                      <div className="text-[11px] text-slate-400">Stops ads when click rates drop to prevent waste</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-indigo-400 tabular-nums">172ms</span>
                </div>

                {/* Connecting Line */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-indigo-500 to-violet-500 ml-7" />

                {/* Node 3: Gemini 3.8 Flash Copywriter */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between hover:border-violet-500/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-xs">
                      03
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AI Headline Generator</div>
                      <div className="text-[11px] text-slate-400">Writes 3 fresh ad hooks and variations automatically</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-violet-400 tabular-nums">135ms</span>
                </div>

                {/* Connecting Line */}
                <div className="w-0.5 h-4 bg-gradient-to-b from-violet-500 to-emerald-500 ml-7" />

                {/* Node 4: Dynamic Budget Rebalance */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 bg-emerald-950/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                      04
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-300">Smart Budget Shift</div>
                      <div className="text-[11px] text-slate-400">Moved $450/day directly into top-performing ads</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400 tabular-nums">42ms</span>
                </div>
              </div>

              {/* Bottom live execution bar */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Live Status:</span>
                <button
                  onClick={onExploreWorkflows}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>See Live Simulation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof Metric Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              $2.4M+
            </div>
            <div className="text-xs text-slate-400">
              New Revenue Generated
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-cyan-400 tabular-nums">
              68%
            </div>
            <div className="text-xs text-slate-400">
              Lower Cost Per Customer
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-indigo-400 tabular-nums">
              14,800+
            </div>
            <div className="text-xs text-slate-400">
              Hours of Busywork Eliminated
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-400 tabular-nums">
              &lt; 4 Hours
            </div>
            <div className="text-xs text-slate-400">
              Average Google Search Approval
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
