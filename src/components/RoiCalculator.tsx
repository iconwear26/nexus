import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, TrendingUp, Sparkles } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAuditModal: (presetBudget?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAuditModal }) => {
  const [adSpend, setAdSpend] = useState<number>(25000);
  const [manualHours, setManualHours] = useState<number>(45);
  const [hourlyRate, setHourlyRate] = useState<number>(75);

  // Calculations
  const wastedSpendPercent = 0.28; // Average 28% budget loss to creative fatigue
  const recoveredAdSpend = Math.round(adSpend * wastedSpendPercent);
  const laborHoursSaved = Math.round(manualHours * 0.85); // 85% of manual tasks automated
  const laborSavings = Math.round(laborHoursSaved * hourlyRate);
  const totalMonthlyValue = recoveredAdSpend + laborSavings;
  const annualValue = totalMonthlyValue * 12;

  const budgetTierString =
    adSpend < 15000
      ? '$5,000 - $15,000/mo'
      : adSpend < 40000
      ? '$15,000 - $40,000/mo'
      : '$40,000+/mo';

  return (
    <section id="roi-calculator" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>ROI Calculator</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Estimate Your Savings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            See How Much Time & Money Automation Saves You.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Automating your ad budget pacing, social posting, and lead follow-ups doesn't just cut busywork—it stops budget leakage and ensures no prospective client is lost.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span>Calculate Your Estimated Savings</span>
            </h3>

            {/* Slider 1: Monthly Ad Spend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">Your Monthly Ad Budget</span>
                <span className="font-bold text-cyan-400 tabular-nums">
                  ${adSpend.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>$5,000</span>
                <span>$50,000</span>
                <span>$100,000+</span>
              </div>
            </div>

            {/* Slider 2: Manual Marketing Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">Hours Your Team Spends on Manual Work Each Month</span>
                <span className="font-bold text-indigo-400 tabular-nums">
                  {manualHours} Hours / mo
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="160"
                step="5"
                value={manualHours}
                onChange={(e) => setManualHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>10h (Part-time)</span>
                <span>80h</span>
                <span>160h (1 Full FTE)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Labor Cost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-300 font-medium">Average Hourly Rate of Your Team</span>
                <span className="font-bold text-emerald-400 tabular-nums">
                  ${hourlyRate} / hr
                </span>
              </div>
              <input
                type="range"
                min="35"
                max="175"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>$35/hr</span>
                <span>$100/hr</span>
                <span>$175/hr</span>
              </div>
            </div>

            {/* Assumptions Note */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans">
              <span className="text-slate-300 font-semibold">How we calculate:</span> Based on verified client performance where automated 15-minute ad checks prevent an average of 28% in ad fatigue waste and eliminate 85% of repetitive scheduling and reporting tasks.
            </div>
          </div>

          {/* Results Summary Column (5 cols) */}
          <div className="lg:col-span-5 glass-panel-elevated rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-cyan-500/30">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Projected Savings</span>
                <span className="text-cyan-400 font-bold">Real-Time Model</span>
              </div>

              {/* Annual Value Marquee */}
              <div className="mb-6">
                <div className="text-xs uppercase text-slate-400 mb-1 font-semibold">
                  Estimated Total Money Saved Per Year
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-white tabular-nums">
                  ${annualValue.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  (${totalMonthlyValue.toLocaleString()} / month in combined team & ad savings)
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Wasted Ad Budget Saved:</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    +${recoveredAdSpend.toLocaleString()} / mo
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Work Hours Saved Every Month:</span>
                  <span className="text-indigo-300 font-bold tabular-nums">
                    {laborHoursSaved} hrs / mo
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Expected Ad Return Boost:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">+42%</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => onOpenAuditModal(budgetTierString)}
                className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Get This Automation Plan For Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
