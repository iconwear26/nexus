export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  category: 'trigger' | 'ai' | 'action' | 'transform' | 'notification';
  icon: string;
  status: 'idle' | 'running' | 'success' | 'error';
  executionTime?: number;
  description: string;
  config: Record<string, any>;
  samplePayload?: Record<string, any>;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  tagline: string;
  category: 'meta_ads' | 'seo' | 'instagram' | 'lead_nurture';
  triggerType: string;
  frequency: string;
  executionCount: number;
  successRate: number;
  avgDurationMs: number;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  businessImpact: string;
}

export interface MetaAdVariant {
  hook: string;
  primaryText: string;
  headline: string;
  description: string;
  callToAction: string;
  angleTested: string;
}

export interface InstagramPostData {
  hookHeadline: string;
  caption: string;
  carouselSlides: Array<{ slide: number; title: string; body: string }>;
  hashtags: string[];
  recommendedAudioStyle: string;
}

export interface SeoStrategyData {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
}

export interface SeoAuditData {
  domain: string;
  analyzedAt: string;
  overallScore: number;
  coreWebVitals: {
    lcp: string;
    fid: string;
    cls: string;
    status: string;
  };
  indexingStatus: {
    indexedPages: number;
    pendingInspection: number;
    sitemapDetected: boolean;
    robotsTxtValid: boolean;
    canonicalTagsEnforced: boolean;
  };
  securityAndSchema: {
    httpsEnforced: boolean;
    structuredDataFound: string[];
    openGraphTagsPresent: boolean;
  };
  keywordAnalysis: {
    query: string;
    searchVolume: number;
    keywordDifficulty: number;
    currentEstimatedRank: number;
    projectedMonthlyClicks: number;
    clusterOpportunities: Array<{
      keyword: string;
      volume: number;
      kd: number;
      intent: string;
    }>;
  };
  actionableRecommendations: string[];
}

export interface LeadItem {
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

export interface ClientWorkspace {
  id: string;
  name: string;
  niche: string;
  domain: string;
  monthlyBudget: string;
  targetAudience: string;
}
