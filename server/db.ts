import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  services: string[];
  createdAt: string;
  score: number;
  status: 'new' | 'enriched' | 'booked';
  notes?: string;
  lastContactedAt?: string;
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  triggeredAt: string;
  durationMs: number;
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL';
  triggerSource: string;
  webhookUrlDispatched?: string;
  steps: Array<{
    node: string;
    type: string;
    status: 'EXECUTED' | 'FAILED' | 'SKIPPED';
    duration: number;
    outputSummary: string;
    payload?: any;
  }>;
}

export interface AdCampaign {
  id: string;
  clientId?: string;
  name: string;
  dailyBudget: number;
  roas: number;
  frequency: number;
  status: 'active' | 'paused' | 'fatigued';
  pacingStatus: 'scaling' | 'optimal' | 'rebalanced' | 'paused';
  lastAction?: string;
  lastUpdated: string;
}

export interface IndexingQueueItem {
  id: string;
  url: string;
  domain: string;
  submittedAt: string;
  status: 'queued' | 'crawled' | 'indexed';
  googlebotResponseCode: number;
  inspectionLatencyMs: number;
}

export interface SystemSettings {
  n8nWebhookUrl: string;
  slackWebhookUrl: string;
  discordWebhookUrl: string;
  telegramChatId: string;
  geminiApiKey: string;
  autoRebalanceEnabled: boolean;
  metaAccessToken?: string;
  metaAdAccountId?: string;
  googleServiceAccountKey?: string;
  testMode?: boolean;
}

const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const EXECUTIONS_FILE = path.join(DATA_DIR, 'executions.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CAMPAIGNS_FILE = path.join(DATA_DIR, 'campaigns.json');
const INDEXING_FILE = path.join(DATA_DIR, 'indexing_queue.json');

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    name: 'Elena Vance',
    email: 'elena@novawear.co',
    company: 'NovaWear Apparel',
    website: 'https://novawear.co',
    budget: '$15,000 - $40,000/mo',
    services: ['meta_ads', 'instagram'],
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    score: 94,
    status: 'booked',
    notes: 'Booked discovery call after automated sub-90s nurture invite.'
  },
  {
    id: 'lead-02',
    name: 'Marcus Sterling',
    email: 'marcus@cloudmetrics.io',
    company: 'CloudMetrics B2B',
    website: 'https://cloudmetrics.io',
    budget: '$40,000 - $100,000/mo',
    services: ['seo', 'lead_nurture'],
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    score: 98,
    status: 'enriched',
    notes: 'Domain enriched with 45 employees, series A funding verified.'
  },
  {
    id: 'lead-03',
    name: 'Dr. Alistair Thorne',
    email: 'athorne@kinetixclinics.com',
    company: 'Kinetix Health Studios',
    website: 'https://kinetixclinics.com',
    budget: '$15,000 - $40,000/mo',
    services: ['meta_ads', 'lead_nurture'],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    score: 91,
    status: 'booked',
    notes: 'Multi-location acquisition pipeline active.'
  }
];

const INITIAL_SETTINGS: SystemSettings = {
  n8nWebhookUrl: 'https://n8n.nexusflow.agency/webhook/inbound-lead',
  slackWebhookUrl: '',
  discordWebhookUrl: '',
  telegramChatId: '',
  geminiApiKey: '',
  autoRebalanceEnabled: true,
  metaAccessToken: 'EAAG...test_token_verified',
  metaAdAccountId: 'act_89412049281',
  googleServiceAccountKey: 'gsc-sa-growth@nexusflow-prod.iam.gserviceaccount.com',
  testMode: true
};

const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'adset-108',
    clientId: 'novawear',
    name: 'Ad Set #108 (Broad Scale Advantage+)',
    dailyBudget: 1250,
    roas: 4.6,
    frequency: 1.82,
    status: 'active',
    pacingStatus: 'scaling',
    lastAction: 'Scaled budget +25% automatically due to 4.6x ROAS headroom',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'adset-214',
    clientId: 'novawear',
    name: 'Ad Set #214 (Dynamic Catalog Retargeting)',
    dailyBudget: 800,
    roas: 5.2,
    frequency: 2.94,
    status: 'active',
    pacingStatus: 'optimal',
    lastAction: 'Stable baseline performance maintained',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'adset-104',
    clientId: 'novawear',
    name: 'Ad Set #104 (Lookalike 1% Top Buyers)',
    dailyBudget: 350,
    roas: 2.1,
    frequency: 3.84,
    status: 'fatigued',
    pacingStatus: 'rebalanced',
    lastAction: 'Budget trimmed from $600 to $350 to prevent waste. AI hook generation triggered.',
    lastUpdated: new Date().toISOString()
  }
];

const INITIAL_INDEXING_QUEUE: IndexingQueueItem[] = [
  {
    id: 'idx-1',
    url: 'https://novawear.co/collections/aeroflex-activewear',
    domain: 'novawear.co',
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'indexed',
    googlebotResponseCode: 200,
    inspectionLatencyMs: 142
  },
  {
    id: 'idx-2',
    url: 'https://novawear.co/guides/breathable-running-gear-2026',
    domain: 'novawear.co',
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'indexed',
    googlebotResponseCode: 200,
    inspectionLatencyMs: 168
  },
  {
    id: 'idx-3',
    url: 'https://cloudmetrics.io/compare/cloudmetrics-vs-datadog',
    domain: 'cloudmetrics.io',
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'crawled',
    googlebotResponseCode: 200,
    inspectionLatencyMs: 195
  }
];

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Database API
export const db = {
  getLeads(): Lead[] {
    return readJsonFile<Lead[]>(LEADS_FILE, INITIAL_LEADS);
  },

  addLead(lead: Lead): Lead {
    const leads = this.getLeads();
    leads.unshift(lead);
    writeJsonFile(LEADS_FILE, leads);
    return lead;
  },

  updateLeadStatus(id: string, status: 'new' | 'enriched' | 'booked'): Lead | null {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return null;
    leads[index].status = status;
    writeJsonFile(LEADS_FILE, leads);
    return leads[index];
  },

  deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter((l) => l.id !== id);
    if (filtered.length === leads.length) return false;
    writeJsonFile(LEADS_FILE, filtered);
    return true;
  },

  getExecutions(): ExecutionLog[] {
    return readJsonFile<ExecutionLog[]>(EXECUTIONS_FILE, []);
  },

  addExecution(exec: ExecutionLog): ExecutionLog {
    const list = this.getExecutions();
    list.unshift(exec);
    if (list.length > 50) list.pop(); // keep last 50 runs
    writeJsonFile(EXECUTIONS_FILE, list);
    return exec;
  },

  getSettings(): SystemSettings {
    return readJsonFile<SystemSettings>(SETTINGS_FILE, INITIAL_SETTINGS);
  },

  updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    const current = this.getSettings();
    const merged = { ...current, ...updates };
    writeJsonFile(SETTINGS_FILE, merged);
    return merged;
  },

  getCampaigns(): AdCampaign[] {
    return readJsonFile<AdCampaign[]>(CAMPAIGNS_FILE, INITIAL_CAMPAIGNS);
  },

  updateCampaign(id: string, updates: Partial<AdCampaign>): AdCampaign | null {
    const list = this.getCampaigns();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates, lastUpdated: new Date().toISOString() };
    writeJsonFile(CAMPAIGNS_FILE, list);
    return list[index];
  },

  rebalanceCampaigns(): { campaigns: AdCampaign[]; savedAmount: number; shiftedAmount: number } {
    const list = this.getCampaigns();
    let shifted = 0;
    
    // Find fatigued campaigns and trim, then add budget to top performing
    const highestRoas = list.reduce((prev, curr) => (curr.roas > prev.roas ? curr : prev), list[0]);

    for (let c of list) {
      if (c.roas < 3.0 && c.status !== 'paused') {
        const cut = Math.round(c.dailyBudget * 0.3);
        c.dailyBudget -= cut;
        c.pacingStatus = 'rebalanced';
        c.lastAction = `Trimmed $${cut}/day to prevent fatigue leakage`;
        shifted += cut;
      }
    }

    if (highestRoas && shifted > 0) {
      highestRoas.dailyBudget += shifted;
      highestRoas.pacingStatus = 'scaling';
      highestRoas.lastAction = `Received +$${shifted}/day shifted from fatigued campaigns`;
    }

    writeJsonFile(CAMPAIGNS_FILE, list);
    return { campaigns: list, savedAmount: shifted, shiftedAmount: shifted };
  },

  getIndexingQueue(): IndexingQueueItem[] {
    return readJsonFile<IndexingQueueItem[]>(INDEXING_FILE, INITIAL_INDEXING_QUEUE);
  },

  addIndexingQueue(url: string, domain?: string): IndexingQueueItem {
    const list = this.getIndexingQueue();
    const cleanDomain = domain || (url.includes('://') ? url.split('/')[2] : 'unknown');
    const newItem: IndexingQueueItem = {
      id: `idx-${Date.now().toString().slice(-6)}`,
      url,
      domain: cleanDomain,
      submittedAt: new Date().toISOString(),
      status: 'queued',
      googlebotResponseCode: 200,
      inspectionLatencyMs: Math.floor(Math.random() * 80 + 110)
    };
    list.unshift(newItem);
    if (list.length > 40) list.pop();
    writeJsonFile(INDEXING_FILE, list);
    return newItem;
  },

  updateIndexingStatus(id: string, status: 'queued' | 'crawled' | 'indexed'): IndexingQueueItem | null {
    const list = this.getIndexingQueue();
    const item = list.find((i) => i.id === id);
    if (!item) return null;
    item.status = status;
    writeJsonFile(INDEXING_FILE, list);
    return item;
  }
};
