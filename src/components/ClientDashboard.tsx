import React, { useState, useEffect } from 'react';
import { Target, Search, Instagram, Users, Sparkles, RefreshCw, Send, CheckCircle2, AlertTriangle, ExternalLink, Copy, Check, Clock, Globe, ArrowRight, Play, Terminal, Download, Settings, Trash2, X, Shield, Activity, Sliders, Building2, Zap } from 'lucide-react';
import { SeoAuditData, LeadItem, AdCampaign, IndexingQueueItem, ClientWorkspace } from '../types';

const WORKSPACES: ClientWorkspace[] = [
  {
    id: 'novawear',
    name: 'NovaWear Apparel',
    niche: 'DTC Performance Apparel',
    domain: 'novawear.co',
    monthlyBudget: '$25,000/mo',
    targetAudience: 'Active professionals & fitness enthusiasts'
  },
  {
    id: 'cloudmetrics',
    name: 'CloudMetrics B2B',
    niche: 'B2B SaaS & Cloud Observability',
    domain: 'cloudmetrics.io',
    monthlyBudget: '$50,000/mo',
    targetAudience: 'Engineering leaders, VP of Infrastructure & CTOs'
  },
  {
    id: 'kinetix',
    name: 'Kinetix Clinics',
    niche: 'Healthcare & Wellness Centers',
    domain: 'kinetixclinics.com',
    monthlyBudget: '$18,000/mo',
    targetAudience: 'Health-conscious patients seeking pain relief & mobility'
  }
];

interface ClientDashboardProps {
  initialTab?: 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture' | 'overview';
  onSwitchToMarketing: () => void;
  onOpenAuditModal: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  initialTab = 'overview',
  onSwitchToMarketing,
  onOpenAuditModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture'>(initialTab);
  const [selectedWorkspace, setSelectedWorkspace] = useState<ClientWorkspace>(WORKSPACES[0]);

  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    n8nWebhookUrl: '',
    slackWebhookUrl: '',
    geminiApiKey: '',
    metaAccessToken: '',
    metaAdAccountId: '',
    googleServiceAccountKey: '',
    testMode: true,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  // Synchronize when prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load Settings, Campaigns & Indexing Queue on mount
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings) setSettings(d.settings);
      })
      .catch((e) => console.error('Failed to load settings:', e));

    fetch('/api/meta-ads/campaigns')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.campaigns) setCampaigns(d.campaigns);
      })
      .catch((e) => console.error('Failed to load campaigns:', e));

    fetch('/api/indexing-queue')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.queue) setIndexingQueue(d.queue);
      })
      .catch((e) => console.error('Failed to load indexing queue:', e));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSavedMessage(true);
        setTimeout(() => setSettingsSavedMessage(false), 2500);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAutoFillDemoCredentials = () => {
    setSettings((prev) => ({
      ...prev,
      n8nWebhookUrl: 'http://localhost:5678/webhook/nexusflow-inbound',
      slackWebhookUrl: 'https://hooks.slack.com/services/T00000000/B00000000/DEMO_KEY_VERIFIED',
      metaAccessToken: 'EAAG_verified_test_access_token_v19',
      metaAdAccountId: 'act_89412049281',
      googleServiceAccountKey: 'gsc-sa-growth@nexusflow-prod.iam.gserviceaccount.com',
      geminiApiKey: prev.geminiApiKey || 'AIzaSy_demo_key_verified',
      testMode: true,
    }));
  };

  // Copy-to-clipboard state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // --- Meta Ads State ---
  const [adBrand, setAdBrand] = useState('NovaWear Apparel');
  const [adNiche, setAdNiche] = useState('DTC Performance Apparel');
  const [adTopic, setAdTopic] = useState('Spring Flash Sale & High-Performance Fabrics');
  const [adAudience, setAdAudience] = useState('Active professionals & fitness enthusiasts');
  const [generatingCopy, setGeneratingCopy] = useState(false);
  const [generatedAdResult, setGeneratedAdResult] = useState<any | null>(null);

  // Live Campaigns State
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [rebalancingCampaigns, setRebalancingCampaigns] = useState(false);
  const [rebalanceMessage, setRebalanceMessage] = useState<string | null>(null);

  const handleCampaignAction = async (id: string, action: 'pause' | 'scale' | 'resume' | 'cut') => {
    try {
      const res = await fetch(`/api/meta-ads/campaigns/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success && data.campaigns) {
        setCampaigns(data.campaigns);
      }
    } catch (err) {
      console.error('Failed campaign action:', err);
    }
  };

  const handleRebalanceAll = async () => {
    setRebalancingCampaigns(true);
    try {
      const res = await fetch('/api/meta-ads/rebalance', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.campaigns) {
        setCampaigns(data.campaigns);
        setRebalanceMessage(`Budget protected! Trimmed fatigue waste and shifted $${data.shiftedAmount}/day into top-performing ads.`);
        setTimeout(() => setRebalanceMessage(null), 4000);
      }
    } catch (err) {
      console.error('Failed to rebalance campaigns:', err);
    } finally {
      setRebalancingCampaigns(false);
    }
  };

  const handleGenerateAdCopy = async () => {
    setGeneratingCopy(true);
    try {
      const res = await fetch('/api/generate-marketing-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'meta_ads',
          brandName: adBrand,
          niche: adNiche,
          topic: adTopic,
          targetAudience: adAudience,
          goal: 'Conversions & High ROAS',
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedAdResult(data.data.metaAds);
      }
    } catch (err) {
      console.error('Failed to generate ad copy:', err);
    } finally {
      setGeneratingCopy(false);
    }
  };

  // --- SEO Audit & Live Indexing Queue State ---
  const [seoDomain, setSeoDomain] = useState('novawear.co');
  const [seoKeyword, setSeoKeyword] = useState('performance activewear running gear');
  const [runningSeoAudit, setRunningSeoAudit] = useState(false);
  const [seoAuditData, setSeoAuditData] = useState<SeoAuditData | null>(null);
  const [indexingPushed, setIndexingPushed] = useState(false);
  const [indexingQueue, setIndexingQueue] = useState<IndexingQueueItem[]>([]);

  const handleRunSeoAudit = async () => {
    setRunningSeoAudit(true);
    setIndexingPushed(false);
    try {
      const res = await fetch('/api/audit-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: seoDomain, targetKeyword: seoKeyword }),
      });
      const data = await res.json();
      if (data.success) {
        setSeoAuditData(data.data);
      }
    } catch (err) {
      console.error('SEO audit failed:', err);
    } finally {
      setRunningSeoAudit(false);
    }
  };

  const handlePushToIndexAPI = async () => {
    setIndexingPushed(true);
    try {
      const res = await fetch('/api/push-indexing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: seoDomain,
          url: `https://${seoDomain}/${seoKeyword.toLowerCase().replace(/\s+/g, '-')}`
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.queue) setIndexingQueue(data.queue);
        if (seoAuditData) {
          setSeoAuditData({
            ...seoAuditData,
            indexingStatus: {
              ...seoAuditData.indexingStatus,
              indexedPages: seoAuditData.indexingStatus.indexedPages + 1,
              pendingInspection: Math.max(0, seoAuditData.indexingStatus.pendingInspection - 1),
            },
          });
        }
        setTimeout(() => {
          fetch('/api/indexing-queue')
            .then((r) => r.json())
            .then((d) => {
              if (d.success && d.queue) setIndexingQueue(d.queue);
            });
        }, 2200);
      }
    } catch (err) {
      console.error('Push indexing failed:', err);
    }
  };

  const handleRecheckIndexing = async (id: string) => {
    try {
      const res = await fetch(`/api/indexing-queue/${id}/recheck`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setIndexingQueue((prev) => prev.map((item) => (item.id === id ? data.item : item)));
      }
    } catch (err) {
      console.error('Failed to recheck indexing:', err);
    }
  };

  // --- Instagram Engine State ---
  const [igTopic, setIgTopic] = useState('4 Levers to 10x Inbound Demo Bookings');
  const [generatingIg, setGeneratingIg] = useState(false);
  const [igPostData, setIgPostData] = useState<any>({
    hookHeadline: 'How Top B2B Startups Book 60+ Demos Every Month on Autopilot',
    caption: 'Manual follow-ups kill conversion rates. Here is the exact n8n pipeline our clients use to enrich, score, and contact inbound prospects in under 90 seconds.\n\nSave this framework for your Q2 pipeline audit.',
    carouselSlides: [
      { slide: 1, title: 'The Problem', body: 'Wait time > 5 minutes drops response rates by 80%.' },
      { slide: 2, title: 'The Webhook', body: 'Form submit fires instant n8n webhook payload.' },
      { slide: 3, title: 'Enrichment', body: 'Enriches firmographic headcount and revenue in 1.2s.' },
      { slide: 4, title: 'Instant Action', body: 'Routes calendar invite + sends rep Telegram ping.' },
    ],
    hashtags: ['#marketingautomation', '#n8n', '#b2bgrowth', '#pipeline', '#founder'],
    scheduledTime: 'Tomorrow at 09:30 AM EST',
    status: 'Scheduled',
  });

  const [publishingIg, setPublishingIg] = useState(false);
  const [igPublishedExecution, setIgPublishedExecution] = useState<string | null>(null);

  const handleGenerateInstagramPost = async () => {
    setGeneratingIg(true);
    setIgPublishedExecution(null);
    try {
      const res = await fetch('/api/generate-marketing-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'instagram',
          brandName: adBrand,
          niche: adNiche,
          topic: igTopic,
          targetAudience: adAudience,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.instagramPost) {
        setIgPostData({
          ...data.data.instagramPost,
          scheduledTime: 'Tomorrow at 09:30 AM EST',
          status: 'Draft Ready',
        });
      }
    } catch (err) {
      console.error('Failed to generate IG post:', err);
    } finally {
      setGeneratingIg(false);
    }
  };

  const handlePublishInstagramPost = async () => {
    setPublishingIg(true);
    try {
      const res = await fetch('/api/publish-instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: igTopic,
          caption: igPostData.caption,
          carouselSlides: igPostData.carouselSlides,
          hashtags: igPostData.hashtags,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIgPublishedExecution(data.executionId);
        setIgPostData((prev: any) => ({
          ...prev,
          status: 'Queued in n8n',
          scheduledTime: data.scheduledTime,
        }));
      }
    } catch (err) {
      console.error('Failed to queue Instagram post:', err);
    } finally {
      setPublishingIg(false);
    }
  };

  // --- Lead Nurture CRM State ---
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [testLeadName, setTestLeadName] = useState('Kieran Ross');
  const [testLeadEmail, setTestLeadEmail] = useState('kieran@apexgrowth.co');
  const [testLeadCompany, setTestLeadCompany] = useState('Apex Growth Labs');
  const [testLeadBudget, setTestLeadBudget] = useState('$15,000 - $30,000/mo');
  const [submittingTestLead, setSubmittingTestLead] = useState(false);
  const [lastSubmissionExecution, setLastSubmissionExecution] = useState<string | null>(null);

  // Fetch leads on mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        if (data.success && data.leads) {
          setLeads(data.leads);
        }
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
    };
    fetchLeads();
  }, []);

  const handleSimulateInboundLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingTestLead(true);
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testLeadName,
          email: testLeadEmail,
          company: testLeadCompany,
          budget: testLeadBudget,
          services: ['meta_ads', 'lead_nurture'],
        }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        setLastSubmissionExecution(data.n8nExecutionId);
        setTestLeadName('');
        setTestLeadEmail('');
        setTestLeadCompany('');
      }
    } catch (err) {
      console.error('Lead simulation failed:', err);
    } finally {
      setSubmittingTestLead(false);
    }
  };

  const handleUpdateLeadStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'new' ? 'enriched' : currentStatus === 'enriched' ? 'booked' : 'new';
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead : l)));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleExportLeads = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `nexusflow_leads_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
  };

  const handleExportLeadsCsv = () => {
    const headers = ['ID', 'Name', 'Email', 'Company', 'Website', 'Budget', 'Score', 'Status', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      l.score,
      l.status,
      l.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', encodeURI(csvContent));
    dlAnchorElem.setAttribute('download', `nexusflow_leads_${new Date().toISOString().split('T')[0]}.csv`);
    dlAnchorElem.click();
  };

  const handleDownloadSlide = (slide: { slide: number; title: string; body: string }) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1080, 1350);
    grad.addColorStop(0, '#0b0f19');
    grad.addColorStop(1, '#030712');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Radial violet glow
    const glow = ctx.createRadialGradient(540, 420, 60, 540, 420, 600);
    glow.addColorStop(0, 'rgba(139, 92, 246, 0.22)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1350);

    // Inner Border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    ctx.strokeRect(36, 36, 1008, 1278);

    // Header Kicker
    ctx.fillStyle = '#a78bfa';
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`SLIDE 0${slide.slide}/04`, 80, 120);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('NexusFlow Automation', 1000, 120);

    // Helper text wrapper
    const drawWrappedText = (
      text: string,
      x: number,
      startY: number,
      maxWidth: number,
      lineHeight: number,
      font: string,
      color: string
    ) => {
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      const words = text.split(' ');
      let line = '';
      let y = startY;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      return y;
    };

    // Draw Title
    const titleEndY = drawWrappedText(
      slide.title,
      540,
      480,
      920,
      76,
      'bold 60px "Plus Jakarta Sans", sans-serif',
      '#ffffff'
    );

    // Draw Accent Line
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(490, titleEndY + 40, 100, 6);

    // Draw Body
    drawWrappedText(
      slide.body,
      540,
      titleEndY + 120,
      880,
      60,
      '40px "Inter", sans-serif',
      '#cbd5e1'
    );

    // Footer Swipe Indicator
    ctx.fillStyle = '#64748b';
    ctx.font = '32px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Swipe to read →', 540, 1240);

    // Download trigger
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexusflow_slide_0${slide.slide}.png`;
    a.click();
  };

  const handleDownloadAllSlides = () => {
    if (!igPostData.carouselSlides) return;
    igPostData.carouselSlides.forEach((slide: any, idx: number) => {
      setTimeout(() => handleDownloadSlide(slide), idx * 250);
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Dashboard Top Header Bar */}
      <div className="border-b border-slate-800 dashboard-subnav sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-2">
                  <span>Automation Hub</span>
                  <span className="text-slate-500 font-normal">/</span>
                  <span className="text-cyan-400 text-[11px] font-semibold">Live System</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Connected to Meta Ads, Google SEO, Instagram & Gemini AI
                </div>
              </div>
            </div>

            {/* Client Workspace Switcher */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs">
              <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400 text-[11px] hidden sm:inline font-medium">Client Workspace:</span>
              <select
                value={selectedWorkspace.id}
                onChange={(e) => {
                  const ws = WORKSPACES.find((w) => w.id === e.target.value) || WORKSPACES[0];
                  setSelectedWorkspace(ws);
                  setAdBrand(ws.name);
                  setAdNiche(ws.niche);
                  setAdAudience(ws.targetAudience);
                  setSeoDomain(ws.domain);
                }}
                className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
              >
                {WORKSPACES.map((w) => (
                  <option key={w.id} value={w.id} className="bg-slate-900 text-white">
                    {w.name} ({w.monthlyBudget})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-xs text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span><span className="hidden sm:inline">Connection </span>Settings</span>
            </button>
            <button
              onClick={onSwitchToMarketing}
              className="text-xs text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              <span><span className="hidden sm:inline">Back to </span>Home</span>
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span><span className="hidden sm:inline">Schedule </span>Consultation</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented Functional Controls) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Overview & Status</span>
          </button>

          <button
            onClick={() => setActiveTab('meta_ads')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
              activeTab === 'meta_ads'
                ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Ad Optimizer</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
              activeTab === 'seo'
                ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Google SEO Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
              activeTab === 'instagram'
                ? 'bg-violet-950/40 text-violet-300 border border-violet-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span>Social Post Creator</span>
          </button>

          <button
            onClick={() => setActiveTab('lead_nurture')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
              activeTab === 'lead_nurture'
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>New Leads & CRM</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ===================== TAB 1: OVERVIEW & STATUS ===================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel rounded-xl p-5 border-slate-800">
                <div className="text-xs text-slate-400">ACTIVE AUTOMATIONS</div>
                <div className="text-2xl font-bold text-white tabular-nums mt-1">14 Connected</div>
                <div className="text-[11px] text-cyan-400 mt-1">All Systems Running Smoothly</div>
              </div>

              <div className="glass-panel rounded-xl p-5 border-slate-800">
                <div className="text-xs text-slate-400">TASKS AUTOMATED (30 DAYS)</div>
                <div className="text-2xl font-bold text-cyan-400 tabular-nums mt-1">71,400</div>
                <div className="text-[11px] text-slate-400 mt-1">Average speed: 0.3s</div>
              </div>

              <div className="glass-panel rounded-xl p-5 border-slate-800">
                <div className="text-xs text-slate-400">AD BUDGET SAVED & SHIFTED</div>
                <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">$48,250</div>
                <div className="text-[11px] text-slate-400 mt-1">Moved to best-performing ads</div>
              </div>

              <div className="glass-panel rounded-xl p-5 border-slate-800">
                <div className="text-xs text-slate-400">PAGES INDEXED ON GOOGLE</div>
                <div className="text-2xl font-bold text-indigo-400 tabular-nums mt-1">842 Pages</div>
                <div className="text-[11px] text-slate-400 mt-1">Approved on Google Search</div>
              </div>
            </div>

            {/* Active Webhook Registry Table */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Active Automations & Integrations</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your automated marketing pipelines running 24/7 in the background.
                  </p>
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>All Automations Active</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">AUTOMATION NAME</th>
                      <th className="pb-3 font-semibold">TRIGGER TYPE</th>
                      <th className="pb-3 font-semibold">TRIGGER LINK</th>
                      <th className="pb-3 font-semibold">SPEED</th>
                      <th className="pb-3 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      {
                        name: 'Meta Ad Budget Protection',
                        method: 'POST / CRON',
                        url: settings.n8nWebhookUrl || 'https://n8n.nexusflow.agency/webhook/meta-pacing-v3',
                        duration: '385ms',
                        key: 'wh1',
                        wfId: 'meta_ads_pacing',
                      },
                      {
                        name: 'Instant Google Search Indexing',
                        method: 'POST',
                        url: settings.n8nWebhookUrl ? `${settings.n8nWebhookUrl}/seo-index` : 'https://n8n.nexusflow.agency/webhook/seo-google-index',
                        duration: '420ms',
                        key: 'wh2',
                        wfId: 'seo_instant_index',
                      },
                      {
                        name: 'Instagram Social Post Scheduler',
                        method: 'POST / SCHEDULE',
                        url: settings.n8nWebhookUrl ? `${settings.n8nWebhookUrl}/ig-publish` : 'https://n8n.nexusflow.agency/webhook/ig-carousel-pub',
                        duration: '510ms',
                        key: 'wh3',
                        wfId: 'instagram_auto_scheduler',
                      },
                      {
                        name: 'Instant Lead Follow-Up & CRM Sync',
                        method: 'POST',
                        url: settings.n8nWebhookUrl ? `${settings.n8nWebhookUrl}/lead-crm` : 'https://n8n.nexusflow.agency/webhook/lead-enrich-crm',
                        duration: '295ms',
                        key: 'wh4',
                        wfId: 'lead_nurture_crm',
                      },
                    ].map((row) => (
                      <tr key={row.key} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 text-white font-medium">{row.name}</td>
                        <td className="py-3 text-cyan-400 font-bold">{row.method}</td>
                        <td className="py-3 text-slate-400 truncate max-w-xs">{row.url}</td>
                        <td className="py-3 text-slate-300 tabular-nums">{row.duration}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`/api/workflows/${row.wfId}/download`}
                              download={`${row.wfId}.json`}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors inline-flex items-center gap-1 border border-slate-700/60"
                              title="Download automation template"
                            >
                              <Download className="w-3 h-3 text-cyan-400" />
                              <span>Template</span>
                            </a>
                            <button
                              onClick={() => handleCopy(row.url, row.key)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors inline-flex items-center gap-1 border border-slate-700/60"
                            >
                              {copiedKey === row.key ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Link</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: META ADS ENGINE ===================== */}
        {activeTab === 'meta_ads' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Meta Ad Pacing Monitor Strip */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Live Ad Campaign Monitor ({selectedWorkspace.name})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Automatically checks ad performance every 15 minutes, detects creative fatigue, and protects your daily budget.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRebalanceAll}
                    disabled={rebalancingCampaigns}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <Zap className={`w-3.5 h-3.5 ${rebalancingCampaigns ? 'animate-spin' : 'fill-current'}`} />
                    <span>{rebalancingCampaigns ? 'Rebalancing Budgets...' : 'Rebalance Budgets Now'}</span>
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold hidden sm:flex">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Auto-Pacing Active</span>
                  </div>
                </div>
              </div>

              {rebalanceMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{rebalanceMessage}</span>
                </div>
              )}

              {/* Dynamic Interactive Ad Sets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                {campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-colors ${
                      camp.status === 'fatigued'
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : camp.status === 'paused'
                        ? 'bg-slate-900/60 border-slate-800 opacity-75'
                        : 'bg-slate-900/90 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{camp.name}</span>
                        <span
                          className={`font-bold tabular-nums ${
                            camp.roas >= 4 ? 'text-emerald-400' : camp.roas >= 3 ? 'text-cyan-400' : 'text-amber-400'
                          }`}
                        >
                          {camp.roas}x ROAS
                        </span>
                      </div>
                      <div className="space-y-1 text-slate-300 text-[11px]">
                        <div>Daily Budget: <span className="text-white font-semibold">${camp.dailyBudget.toLocaleString()}/day</span></div>
                        <div>Frequency: <span className="tabular-nums">{camp.frequency}</span> ({camp.frequency > 3.5 ? 'Fatigued' : camp.frequency > 2.5 ? 'Optimal' : 'Healthy'})</div>
                        <div className="text-[11px] text-cyan-300 line-clamp-2 mt-1">
                          {camp.lastAction || `Pacing: ${camp.pacingStatus}`}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        camp.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : camp.status === 'fatigued' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {camp.status}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {camp.status === 'active' ? (
                          <>
                            <button
                              onClick={() => handleCampaignAction(camp.id, 'scale')}
                              className="px-2 py-1 text-[11px] font-medium rounded bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 transition-colors"
                              title="Increase daily budget by 25%"
                            >
                              Scale +25%
                            </button>
                            <button
                              onClick={() => handleCampaignAction(camp.id, 'pause')}
                              className="px-2 py-1 text-[11px] font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                              Pause
                            </button>
                          </>
                        ) : camp.status === 'fatigued' ? (
                          <>
                            <button
                              onClick={() => handleCampaignAction(camp.id, 'cut')}
                              className="px-2 py-1 text-[11px] font-medium rounded bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/30 transition-colors"
                            >
                              Trim -30%
                            </button>
                            <button
                              onClick={() => handleCampaignAction(camp.id, 'pause')}
                              className="px-2 py-1 text-[11px] font-medium rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                              Pause
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleCampaignAction(camp.id, 'resume')}
                            className="px-2.5 py-1 text-[11px] font-medium rounded bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 transition-colors"
                          >
                            Resume Campaign
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live AI Ad Copy & Hook Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Input (5 cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <h4 className="text-sm font-bold text-white">Create New Ad Headlines & Copy</h4>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Brand Name</label>
                  <input
                    type="text"
                    value={adBrand}
                    onChange={(e) => setAdBrand(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Industry or Category</label>
                  <input
                    type="text"
                    value={adNiche}
                    onChange={(e) => setAdNiche(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Special Offer or Focus</label>
                  <input
                    type="text"
                    value={adTopic}
                    onChange={(e) => setAdTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Target Customer Type</label>
                  <input
                    type="text"
                    value={adAudience}
                    onChange={(e) => setAdAudience(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  onClick={handleGenerateAdCopy}
                  disabled={generatingCopy}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${generatingCopy ? 'animate-spin' : ''}`} />
                  <span>{generatingCopy ? 'Creating Fresh Copy with AI...' : 'Generate Fresh Ad Copy'}</span>
                </button>
              </div>

              {/* Output Preview (7 cols) */}
              <div className="lg:col-span-7 glass-panel-elevated rounded-2xl p-6 border-slate-800">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-medium">Ad Preview</span>
                  {generatedAdResult && (
                    <span className="text-[11px] text-cyan-400 font-semibold">
                      Angle: {generatedAdResult.angleTested}
                    </span>
                  )}
                </div>

                {generatedAdResult ? (
                  <div className="space-y-4 font-sans">
                    {/* Simulated Facebook Feed Card */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          {adBrand.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{adBrand}</div>
                          <div className="text-[10px] text-slate-500">Sponsored · Active Campaign</div>
                        </div>
                      </div>

                      {/* Hook & Primary Text */}
                      <p className="text-xs font-medium text-cyan-300">
                        {generatedAdResult.hook}
                      </p>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {generatedAdResult.primaryText}
                      </p>

                      {/* Mock Graphic Container */}
                      <div className="h-44 rounded-lg bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center">
                        <Target className="w-8 h-8 text-cyan-400 mb-2" />
                        <span className="text-sm font-bold text-white">{adTopic}</span>
                        <span className="text-xs text-slate-400 mt-1">AI-Generated Creative Angle</span>
                      </div>

                      {/* Headline & CTA */}
                      <div className="pt-2 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] text-slate-400 uppercase">
                            {adBrand.toLowerCase().replace(/\s+/g, '')}.com
                          </div>
                          <div className="text-xs font-bold text-white">
                            {generatedAdResult.headline}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {generatedAdResult.description}
                          </div>
                        </div>
                        <button className="px-3.5 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white shrink-0 border border-slate-700">
                          {generatedAdResult.callToAction}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCopy(JSON.stringify(generatedAdResult, null, 2), 'adCopy')}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedKey === 'adCopy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Ad Text</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Target className="w-10 h-10 text-slate-700 mb-2" />
                    <p className="text-xs">
                      Fill in the details on the left and click "Generate Fresh Ad Copy" to test.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: SEO HEALTH & INDEXING ===================== */}
        {activeTab === 'seo' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Domain Audit Control Bar */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-indigo-400" />
                    <span>Google Search & SEO Health Checker</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Check if your website is fast, healthy, and properly discovered by Google Search.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Your Website Domain</label>
                  <input
                    type="text"
                    value={seoDomain}
                    onChange={(e) => setSeoDomain(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-400"
                    placeholder="yourbrand.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Primary Keyword to Track</label>
                  <input
                    type="text"
                    value={seoKeyword}
                    onChange={(e) => setSeoKeyword(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-400"
                    placeholder="marketing automation"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleRunSeoAudit}
                    disabled={runningSeoAudit}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
                  >
                    <Search className={`w-3.5 h-3.5 ${runningSeoAudit ? 'animate-spin' : ''}`} />
                    <span>{runningSeoAudit ? 'Checking Website & Rankings...' : 'Check Website SEO'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audit Diagnostics Display */}
            {seoAuditData ? (
              <div className="space-y-6">
                {/* Score & Indexing Push Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="glass-panel rounded-xl p-5 border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-medium text-slate-400">WEBSITE HEALTH SCORE</div>
                      <div className="text-4xl font-extrabold text-emerald-400 tabular-nums mt-1">
                        {seoAuditData.overallScore}/100
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Page Speed & Experience: {seoAuditData.coreWebVitals.status}</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="glass-panel rounded-xl p-5 border-slate-800">
                    <div className="text-xs font-medium text-slate-400">GOOGLE INDEXED PAGES</div>
                    <div className="text-4xl font-extrabold text-indigo-400 tabular-nums mt-1">
                      {seoAuditData.indexingStatus.indexedPages} Pages
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Pending Review: {seoAuditData.indexingStatus.pendingInspection} Pages
                    </div>
                  </div>

                  {/* 1-Click Google Indexing Push Action */}
                  <div className="glass-panel-elevated rounded-xl p-5 border-indigo-500/40 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-indigo-300">INSTANT GOOGLE SEARCH SUBMISSION</div>
                      <p className="text-xs text-slate-300 mt-1">
                        Instantly notify Google about new pages and blog posts so they appear in search results faster.
                      </p>
                    </div>

                    <button
                      onClick={handlePushToIndexAPI}
                      disabled={indexingPushed}
                      className={`mt-3 py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                        indexingPushed
                          ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {indexingPushed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Submitted to Google Search (Instant)</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Submit to Google Index Queue</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Keyword Opportunities Table */}
                <div className="glass-panel rounded-2xl p-6 border-slate-800">
                  <div className="pb-3 mb-4 border-b border-slate-800">
                    <h4 className="text-sm font-bold text-white">High-Opportunity Keywords to Target</h4>
                    <p className="text-xs text-slate-400">Valuable search terms with high buyer demand and low competition.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2 font-semibold">TARGET KEYWORD</th>
                          <th className="pb-2 font-semibold">MONTHLY SEARCHES</th>
                          <th className="pb-2 font-semibold">COMPETITION LEVEL</th>
                          <th className="pb-2 font-semibold">BUYER INTENT</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {seoAuditData.keywordAnalysis.clusterOpportunities.map((kw, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/20">
                            <td className="py-2.5 text-white font-medium">{kw.keyword}</td>
                            <td className="py-2.5 text-slate-300 tabular-nums">{kw.volume.toLocaleString()} searches</td>
                            <td className="py-2.5 text-cyan-400 tabular-nums font-medium">{kw.kd}/100</td>
                            <td className="py-2.5 text-slate-400">{kw.intent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Structured Data & Actionable Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="glass-panel rounded-2xl p-6 border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-400" />
                      <span>Google-Friendly Structured Data (Rich Snippets)</span>
                    </h4>
                    <p className="text-xs text-slate-400 mb-3">Tags detected on your site that help Google display rich search cards.</p>
                    <div className="flex flex-wrap gap-2">
                      {seoAuditData.securityAndSchema.structuredDataFound.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-sans text-xs font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-2xl p-6 border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Actionable Steps to Improve Your Ranking</span>
                    </h4>
                    <p className="text-xs text-slate-400 mb-3">Simple recommendations to increase your search traffic and climb to page 1.</p>
                    <div className="space-y-2">
                      {seoAuditData.actionableRecommendations?.map((rec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-12 text-center text-slate-500">
                <Search className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-xs max-w-sm mx-auto">
                  Enter your website address above and click "Run SEO Check" to analyze page speed, Google index status, and keyword ranking opportunities.
                </p>
              </div>
            )}
            {/* Live Google Search Console Indexing Queue */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Google Search Console Indexing Queue ({indexingQueue.length} Pages)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live inspection status. URLs are crawled by Googlebot and verified in Google SERP.
                  </p>
                </div>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Google Indexing API v3 Linked</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2.5 font-semibold">SUBMITTED URL</th>
                      <th className="pb-2.5 font-semibold">DOMAIN</th>
                      <th className="pb-2.5 font-semibold">SUBMITTED</th>
                      <th className="pb-2.5 font-semibold">GOOGLEBOT CRAWL</th>
                      <th className="pb-2.5 font-semibold">STATUS</th>
                      <th className="pb-2.5 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {indexingQueue.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-2.5 text-white font-medium max-w-xs truncate">
                          {item.url}
                        </td>
                        <td className="py-2.5 text-slate-300">{item.domain}</td>
                        <td className="py-2.5 text-slate-400 tabular-nums">
                          {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-2.5 text-slate-300">
                          <span className="text-emerald-400 font-bold tabular-nums">HTTP {item.googlebotResponseCode}</span>{' '}
                          <span className="text-[11px] text-slate-500">({item.inspectionLatencyMs}ms)</span>
                        </td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              item.status === 'indexed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : item.status === 'crawled'
                                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {item.status === 'indexed' ? 'Google Indexed' : item.status === 'crawled' ? 'Crawled by Bot' : 'In Queue'}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            onClick={() => handleRecheckIndexing(item.id)}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition-colors"
                          >
                            Re-inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: INSTAGRAM CONTENT HUB ===================== */}
        {activeTab === 'instagram' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-violet-400" />
                    <span>Social Media Post & Carousel Creator</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Automatically create beautiful multi-slide social carousels and schedule them to publish.
                  </p>
                </div>
                <div className="text-xs font-medium text-violet-400">
                  Publishing Cadence: 7 Posts / Week
                </div>
              </div>

              {/* Topic Generator Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={igTopic}
                  onChange={(e) => setIgTopic(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-violet-400 font-sans"
                  placeholder="Enter any topic or idea (e.g. 5 tips to save money on marketing, agency growth)..."
                />
                <button
                  onClick={handleGenerateInstagramPost}
                  disabled={generatingIg}
                  className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-md shadow-violet-600/20"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${generatingIg ? 'animate-spin' : ''}`} />
                  <span>{generatingIg ? 'Creating Your Post...' : 'Create Post with AI'}</span>
                </button>
              </div>
            </div>

            {/* Carousel & Caption Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Carousel Slides Preview (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    Preview: 4-Slide Instagram Carousel
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadAllSlides}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-violet-300 border border-violet-500/30 flex items-center gap-1.5 transition-colors"
                      title="Download high-resolution 1080x1350 PNG images for all 4 slides"
                    >
                      <Download className="w-3 h-3 text-violet-400" />
                      <span>Download All Slides (.png)</span>
                    </button>
                    <span className="text-xs font-medium text-emerald-400">
                      Status: {igPostData.status === 'scheduled' ? 'Scheduled to Post' : igPostData.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {igPostData.carouselSlides?.map((slide: any) => (
                    <div
                      key={slide.slide}
                      className="aspect-[4/5] rounded-xl p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between hover:border-violet-500/40 transition-colors relative group"
                    >
                      <div className="flex items-center justify-between text-[11px] font-medium text-violet-400">
                        <span>SLIDE 0{slide.slide}/04</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`/api/instagram/slide/${slide.slide}?title=${encodeURIComponent(slide.title)}&body=${encodeURIComponent(slide.body)}&brand=${encodeURIComponent(selectedWorkspace.name)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Open vector SVG slide in new tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => handleDownloadSlide(slide)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Download this slide as 1080x1350 PNG"
                          >
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="my-auto text-center px-2">
                        <div className="text-xs font-bold text-white mb-2 leading-snug">
                          {slide.title}
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {slide.body}
                        </p>
                      </div>
                      <div className="text-[10px] text-slate-500 text-center font-medium">
                        Swipe to read →
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caption & Schedule Details (5 cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Ready-to-Post Caption & Hashtags
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed mb-4 max-h-52 overflow-y-auto font-sans">
                    {igPostData.caption}
                  </div>

                  <div className="text-xs font-medium text-violet-400 mb-1">Recommended Hashtags</div>
                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400 font-sans">
                    {igPostData.hashtags?.map((tag: string, i: number) => (
                      <span key={i} className="text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                    <div className="text-slate-400">
                      Post Date: <span className="text-white font-medium">{igPostData.scheduledTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(igPostData.caption, 'igCaption')}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
                      >
                        {copiedKey === 'igCaption' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Caption</span>
                      </button>

                      <button
                        onClick={handlePublishInstagramPost}
                        disabled={publishingIg}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow-md shadow-violet-600/20 transition-all cursor-pointer"
                      >
                        <Play className={`w-3.5 h-3.5 fill-current ${publishingIg ? 'animate-spin' : ''}`} />
                        <span>{publishingIg ? 'Queueing in n8n...' : 'Push to n8n Queue'}</span>
                      </button>
                    </div>
                  </div>

                  {igPublishedExecution && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Dispatched to n8n Auto-Publisher (Run #{igPublishedExecution})</span>
                      </div>
                      <button onClick={() => setIgPublishedExecution(null)} className="text-slate-400 hover:text-white">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                    <span className="text-violet-400 font-semibold">Live Publishing Note:</span> Connect your Meta Graph API credentials in <em>Connection Settings</em> to push rendered assets directly to your live Instagram Business account. Autonomous drafting and n8n queueing work immediately out of the box.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: LEAD INBOUND & CRM ===================== */}
        {activeTab === 'lead_nurture' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Explanation & Inbound Lead Simulator */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Instant 2-Minute Lead Follow-Up System</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test your lead flow in real time. Submit a sample contact below to watch the instant notification and follow-up trigger.
                </p>
              </div>

              <form onSubmit={handleSimulateInboundLead} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  value={testLeadName}
                  onChange={(e) => setTestLeadName(e.target.value)}
                  placeholder="Full Name (e.g. Alex Morgan)"
                  className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-sans"
                />
                <input
                  type="email"
                  required
                  value={testLeadEmail}
                  onChange={(e) => setTestLeadEmail(e.target.value)}
                  placeholder="Email (e.g. alex@company.com)"
                  className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-sans"
                />
                <input
                  type="text"
                  required
                  value={testLeadCompany}
                  onChange={(e) => setTestLeadCompany(e.target.value)}
                  placeholder="Company / Business Name"
                  className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={submittingTestLead}
                  className="py-2 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-400/20"
                >
                  <Send className={`w-3.5 h-3.5 ${submittingTestLead ? 'animate-spin' : ''}`} />
                  <span>{submittingTestLead ? 'Sending Test Lead...' : 'Send Test Lead'}</span>
                </button>
              </form>

              {lastSubmissionExecution && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between">
                  <span>
                    Lead Processed Successfully! Automated follow-up sent and lead added to CRM in under 1 second (Run #{lastSubmissionExecution}).
                  </span>
                  <button onClick={() => setLastSubmissionExecution(null)} className="text-slate-400 hover:text-white">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Leads Table */}
            <div className="glass-panel rounded-2xl p-6 border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    All Leads & Potential Clients ({leads.length} Contacts)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Click any status badge to update pipeline stage (New Lead → Contacted & Qualified → Call Booked).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleExportLeadsCsv}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs flex items-center gap-1.5 border border-emerald-500/40 transition-colors font-medium cursor-pointer"
                    title="Export leads formatted as CSV for Excel or Google Sheets"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV (Excel)</span>
                  </button>
                  <button
                    onClick={handleExportLeads}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-700 transition-colors font-medium cursor-pointer"
                    title="Export leads as raw JSON data"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>JSON</span>
                  </button>
                  <span className="text-xs text-emerald-400 font-medium hidden sm:inline">CRM Auto-Sync Active</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">CONTACT NAME</th>
                      <th className="pb-3 font-semibold">COMPANY</th>
                      <th className="pb-3 font-semibold">ESTIMATED BUDGET</th>
                      <th className="pb-3 font-semibold">INTEREST SCORE</th>
                      <th className="pb-3 font-semibold">LEAD STAGE</th>
                      <th className="pb-3 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3">
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.email}</div>
                        </td>
                        <td className="py-3 text-slate-300">{lead.company}</td>
                        <td className="py-3 text-cyan-300 font-medium tabular-nums">{lead.budget}</td>
                        <td className="py-3">
                          <span className="font-bold text-emerald-400 tabular-nums">
                            {lead.score}/100
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleUpdateLeadStatus(lead.id, lead.status)}
                            className="text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 px-2.5 py-1 rounded-md border border-emerald-500/30 transition-colors cursor-pointer"
                            title="Click to advance status"
                          >
                            {lead.status === 'booked' ? 'Call Booked' : lead.status === 'enriched' ? 'Contacted & Qualified' : 'New Lead'}
                          </button>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop backdrop-blur-md animate-fadeIn">
          <div className="glass-panel-elevated rounded-2xl max-w-xl w-full p-6 sm:p-8 border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5">
              <Sliders className="w-4 h-4" />
              <span>Integration & Connection Settings</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              Connect Your Marketing Tools & Automation Server
            </h3>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <p className="text-xs text-slate-400">
                Configure your live connections. All leads, ad alerts, and social triggers sync directly to your business tools.
              </p>
              <button
                type="button"
                onClick={handleAutoFillDemoCredentials}
                className="px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Auto-Fill Demo Keys
              </button>
            </div>

            {/* Live System Status Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-[10px] font-sans">
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400">Meta Graph API</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>v19.0 Verified</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400">Google Indexing</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>API v3 Ready</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400">n8n Engine</div>
                <div className="text-cyan-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Port 5678 Linked</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                <div className="text-slate-400">AI Engine</div>
                <div className="text-violet-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                  <span>Gemini 2.5 Flash</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs font-sans max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  Automation Server URL (Webhook Endpoint)
                </label>
                <input
                  type="url"
                  value={settings.n8nWebhookUrl}
                  onChange={(e) => setSettings({ ...settings, n8nWebhookUrl: e.target.value })}
                  placeholder="https://your-server.domain/webhook/inbound-lead"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Receives real-time lead submissions and workflow triggers.
                </span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  Meta Graph API User Token & Ad Account ID
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="password"
                    value={settings.metaAccessToken || ''}
                    onChange={(e) => setSettings({ ...settings, metaAccessToken: e.target.value })}
                    placeholder="EAAG... Access Token"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <input
                    type="text"
                    value={settings.metaAdAccountId || ''}
                    onChange={(e) => setSettings({ ...settings, metaAdAccountId: e.target.value })}
                    placeholder="act_89412049281"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Controls ad budget pacing and auto-pauses fatigued creative on Facebook/Instagram.
                </span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  Google Search Console Service Account Email / Key
                </label>
                <input
                  type="text"
                  value={settings.googleServiceAccountKey || ''}
                  onChange={(e) => setSettings({ ...settings, googleServiceAccountKey: e.target.value })}
                  placeholder="sa-growth@project.iam.gserviceaccount.com"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Authorizes instant URL submissions to Google Indexing API v3.
                </span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  Slack Notification Webhook URL
                </label>
                <input
                  type="url"
                  value={settings.slackWebhookUrl}
                  onChange={(e) => setSettings({ ...settings, slackWebhookUrl: e.target.value })}
                  placeholder="https://hooks.slack.com/services/..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Sends instant notifications to your Slack channel when leads arrive or ads need attention.
                </span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  AI Copywriting Key (Gemini)
                </label>
                <input
                  type="password"
                  value={settings.geminiApiKey}
                  onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Powers instant AI ad variations, SEO suggestions, and social carousel generation.
                </span>
              </div>

              {settingsSavedMessage && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Settings updated and saved successfully!</span>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-5 py-2 rounded-lg font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{savingSettings ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
