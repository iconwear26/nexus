import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Terminal } from 'lucide-react';

interface LeadIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetBudget?: string;
}

export const LeadIntakeModal: React.FC<LeadIntakeModalProps> = ({
  isOpen,
  onClose,
  presetBudget,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState(presetBudget || '$15,000 - $40,000/mo');
  const [services, setServices] = useState<string[]>(['meta_ads', 'seo']);
  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (services.includes(srv)) {
      setServices(services.filter((s) => s !== srv));
    } else {
      setServices([...services, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          website,
          budget,
          services,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessResult(data);
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 modal-backdrop backdrop-blur-md animate-fadeIn">
      <div className="glass-panel-elevated rounded-2xl max-w-xl w-full p-5 sm:p-8 border-slate-700 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successResult ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">You're All Set! Your Plan is on the Way.</h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We've received your business details. A strategy confirmation and your personalized marketing automation roadmap have been sent to{' '}
              <span className="text-cyan-300 font-medium">{email}</span>.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-xs mx-auto">
              <div>Reference ID: <span className="text-emerald-400 font-mono font-semibold">{successResult.n8nExecutionId}</span></div>
              <div className="text-[11px] text-slate-400 mt-0.5">Status: Confirmed · Instant Follow-Up Dispatched</div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free 30-Minute Growth Strategy Session</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Get Your Free Marketing Automation Plan.
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Tell us about your business and ad channels. We'll show you where you're losing leads and how to put your marketing on autopilot.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company / Business Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Website Address</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://acme.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Estimated Monthly Ad Spend</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-sans"
                >
                  <option value="$5,000 - $15,000/mo">$5,000 - $15,000 / month</option>
                  <option value="$15,000 - $40,000/mo">$15,000 - $40,000 / month</option>
                  <option value="$40,000 - $100,000/mo">$40,000 - $100,000 / month</option>
                  <option value="$100,000+/mo">$100,000+ / month (Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1.5">
                  What Would You Like to Automate?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'meta_ads', label: 'Smart Ad Budget Protection' },
                    { id: 'seo', label: 'Google SEO & Fast Indexing' },
                    { id: 'instagram', label: 'Social Media Auto-Posting' },
                    { id: 'lead_nurture', label: 'Instant Lead Follow-Up & CRM' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleService(item.id)}
                      className={`p-2 rounded-lg text-left border transition-all ${
                        services.includes(item.id)
                          ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <span>{submitting ? 'Generating Your Plan...' : 'Get My Free Automation Plan'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
