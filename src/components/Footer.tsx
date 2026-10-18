import React from 'react';
import { Terminal, Shield, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSwitchView: (view: 'marketing' | 'dashboard') => void;
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSwitchView, onOpenAuditModal }) => {
  return (
    <footer className="border-t border-slate-800/80 site-footer py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">NexusFlow</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Marketing automation for modern growth businesses. We help you eliminate manual work, protect your ad spend, and scale your customer acquisition on autopilot.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-cyan-400 font-medium pt-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Enterprise-Grade Security & Privacy Compliant</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5 text-xs font-sans">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Platform Navigation
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => onSwitchView('dashboard')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Live Dashboard
                </button>
              </li>
              <li>
                <a href="#workflows" className="hover:text-cyan-400 transition-colors">
                  Interactive Workflows
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-400 transition-colors">
                  Ad Budget Protection
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-cyan-400 transition-colors">
                  ROI Savings Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Integrations (4 cols) */}
          <div className="md:col-span-4 space-y-2.5 text-xs font-sans">
            <div className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Seamless Integrations
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <div>· Meta Ads & Facebook Ads Manager</div>
              <div>· Google Search Console & Instant Indexing</div>
              <div>· Instagram & Social Media Channels</div>
              <div>· HubSpot, Slack, WhatsApp & Custom Webhooks</div>
              <div>· Powered by Google AI (Gemini 2.5)</div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <div>
            © {new Date().getFullYear()} NexusFlow Marketing Automation Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Policy</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <button
              onClick={onOpenAuditModal}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <span>Get Free Automation Plan</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
