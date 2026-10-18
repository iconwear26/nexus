import React from 'react';
import { TrendingUp, Quote, ExternalLink, CheckCircle } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      company: 'Novawear Performance Apparel',
      niche: 'Direct-to-Consumer E-Commerce',
      timeframe: '6-Month Campaign Run',
      metricPrimary: '4.6x',
      metricLabel: 'Sustained Return on Ad Spend (ROAS)',
      metricSecondary: '+140% Total Revenue Growth',
      problem: 'Ad fatigue caused returns to plunge from 3.2x to 1.8x within 10 days of every launch, forcing the marketing team to constantly create and reset campaigns manually.',
      solution: 'Deployed 24/7 Smart Ad Budget Protection. The system monitors performance hourly and automatically generates fresh ad variations whenever click rates drop below 1.5%.',
      testimonial: {
        quote: 'NexusFlow solved our biggest headache. Our team stopped wasting hours babysitting Ads Manager, and our budget automatically flows to winning ads without lifting a finger.',
        author: 'Elena Vance',
        role: 'VP of Growth',
      },
    },
    {
      company: 'CloudMetrics Analytics',
      niche: 'B2B Software & SaaS',
      timeframe: '4-Month SEO Project',
      metricPrimary: 'Under 4 Hours',
      metricLabel: 'Google Search Indexing Speed',
      metricSecondary: '+215% More Ranked Keywords',
      problem: 'New product comparison and guide pages took over two weeks to appear on Google, giving aggressive competitors an unfair head start in search rankings.',
      solution: 'Connected automated page publishing directly to instant Google Search indexing. Over 350 pages appeared in Google search within 48 hours without any manual submission.',
      testimonial: {
        quote: 'The automated SEO system completely changed our traffic strategy. We launch new guide pages and see them live on Google the very same afternoon.',
        author: 'Marcus Sterling',
        role: 'Chief Marketing Officer',
      },
    },
    {
      company: 'Kinetix Health Studios',
      niche: 'Healthcare & Wellness Clinics',
      timeframe: '90-Day Patient Intake Run',
      metricPrimary: '64%',
      metricLabel: 'Appointment Booking Rate',
      metricSecondary: '82s Average Response Time',
      problem: 'Potential clients submitting appointment inquiries waited an average of 4.5 hours for a staff callback, resulting in 45% booking with competitor clinics instead.',
      solution: 'Implemented the instant 2-minute follow-up system with automated SMS/email booking links and immediate smartphone alerts to clinic staff.',
      testimonial: {
        quote: 'Following up with new patient inquiries in under 90 seconds while letting them book online transformed our appointment volume and revenue immediately.',
        author: 'Dr. Alistair Thorne',
        role: 'Managing Medical Director',
      },
    },
  ];

  return (
    <section id="case-studies" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>Customer Success Stories</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Proven Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            How Smart Marketing Automation Drives Real Business Growth.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Real workflows tested on real budgets. See the quantitative outcomes generated across direct-to-consumer, B2B SaaS, and local service businesses.
          </p>
        </div>

        {/* 3 Case Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-7 flex flex-col justify-between hover:border-slate-700 transition-all space-y-6"
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-white font-semibold">{item.niche}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{item.timeframe}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{item.company}</h3>

                {/* Primary Metric Hero Inside Card */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-5">
                  <div className="text-3xl font-extrabold text-cyan-400 tabular-nums">
                    {item.metricPrimary}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{item.metricLabel}</div>
                  <div className="text-[12px] text-emerald-400 font-semibold mt-1">
                    {item.metricSecondary}
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed font-sans">
                  <div>
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] block mb-1">
                      The Challenge:
                    </span>
                    <p>{item.problem}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[11px] block mb-1">
                      The Automated Solution:
                    </span>
                    <p>{item.solution}</p>
                  </div>
                </div>
              </div>

              {/* Attributable Testimonial Quote */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs text-slate-300 italic mb-3 leading-relaxed">
                  "{item.testimonial.quote}"
                </p>
                <div className="text-xs font-semibold text-white">
                  {item.testimonial.author}
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.testimonial.role}, {item.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
