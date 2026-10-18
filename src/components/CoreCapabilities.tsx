import React from 'react';
import { Target, Search, Instagram, Users, ArrowUpRight, Check, Zap } from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectCapability: (tab: 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture') => void;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ onSelectCapability }) => {
  return (
    <section id="capabilities" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>Core Features</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Everything Automated</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Four Smart Systems That Put Your Marketing on Autopilot.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            We build reliable, automated systems that protect your ad budget, write fresh content, get your website ranked on Google, and convert new leads in seconds.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Meta Ads */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Target className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Meta & Instagram Ads</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400 font-semibold tabular-nums">4.4x Average Return</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                01. Smart Ad Budget Protector & AI Ad Refresh
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Most businesses lose money when ads fatigue and nobody notices for days. Our automated system checks your campaigns every 15 minutes, pauses budget waste, writes fresh ad copy with AI, and shifts money to your most profitable ads.
              </p>

              {/* Mechanism feature list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Real-time budget protection that stops wasted ad spend</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Automatic AI generation of fresh headlines and hooks</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Shifts budget into your highest-converting audiences</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Instant team notifications on Slack or email</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                System: <span className="text-cyan-300 font-medium">Smart Ad Protector</span>
              </span>
              <button
                onClick={() => onSelectCapability('meta_ads')}
                className="text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Try Ad Optimizer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Programmatic SEO & Indexing */}
          <div className="glass-panel rounded-2xl p-7 flex flex-col justify-between hover:border-indigo-500/40 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Search className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400">
                  <span>Google Search Engine</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                02. Instant Google Indexing & SEO Booster
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Don't wait weeks for Google to discover your new pages. As soon as you publish, our automation checks page health, adds rich search tags, and pushes your links directly to Google for fast approval.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Submits new pages straight to Google Search</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Automatically adds SEO tags and rich snippets</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Discovers profitable keywords your competitors miss</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Speed: <span className="text-indigo-300 font-medium">&lt; 4 Hours</span>
              </span>
              <button
                onClick={() => onSelectCapability('seo')}
                className="text-xs font-semibold text-indigo-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Check SEO Health</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Instagram Auto Scheduler */}
          <div className="glass-panel rounded-2xl p-7 flex flex-col justify-between hover:border-violet-500/40 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400">
                  <span>Social Media</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                03. Social Media Auto-Poster & Content Creator
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Turn your business insights into engaging 4-slide carousels and posts automatically. AI writes the copy, creates visual slides, adds targeted hashtags, and posts right on schedule.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Creates ready-to-post 4-slide visual carousels</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Writes engaging captions and niche hashtags</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>Publishes automatically to Instagram on your schedule</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Frequency: <span className="text-violet-300 font-medium">7 Days / Week</span>
              </span>
              <button
                onClick={() => onSelectCapability('instagram')}
                className="text-xs font-semibold text-violet-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>Create Social Post</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4: Omnichannel Lead Qualification & Nurture */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>Fast Follow-Up</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">&lt; 2 Minute Turnaround</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                04. Instant 2-Minute Lead Follow-Up & CRM Manager
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Leads that receive a reply within 5 minutes are 21x more likely to buy. The second a customer reaches out, our system scores their interest, sends a calendar booking link, and alerts your team so no deal ever slips away.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant personalized response in under 2 minutes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automated lead scoring and intent ranking</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Syncs automatically with your CRM (HubSpot, Sheets, etc.)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant SMS and email notifications to your sales team</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Booking Rate: <span className="text-emerald-300 font-medium tabular-nums">64% Meeting Rate</span>
              </span>
              <button
                onClick={() => onSelectCapability('lead_nurture')}
                className="text-xs font-semibold text-emerald-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:translate-x-1 duration-200"
              >
                <span>See Lead Manager</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
