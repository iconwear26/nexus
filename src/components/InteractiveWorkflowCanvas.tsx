import React, { useState } from 'react';
import { AutomationWorkflow, WorkflowNode } from '../types';
import { WORKFLOWS_DATA } from '../data/mockWorkflows';
import { Play, CheckCircle2, Clock, Terminal, ChevronRight, X, Cpu, Layers, Sparkles, Send, Database, Search, Instagram, Users, Download, Globe } from 'lucide-react';

export const InteractiveWorkflowCanvas: React.FC = () => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>('meta_ads_pacing');
  const [activeWorkflow, setActiveWorkflow] = useState<AutomationWorkflow>(WORKFLOWS_DATA[0]);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [inspectedNode, setInspectedNode] = useState<WorkflowNode | null>(null);
  const [executionResult, setExecutionResult] = useState<any | null>(null);
  const [customWebhookUrl, setCustomWebhookUrl] = useState<string>('');
  const [showWebhookInput, setShowWebhookInput] = useState<boolean>(false);

  const handleSelectWorkflow = (wfId: string) => {
    const wf = WORKFLOWS_DATA.find((w) => w.id === wfId) || WORKFLOWS_DATA[0];
    setSelectedWorkflowId(wfId);
    setActiveWorkflow(wf);
    setCompletedNodes([]);
    setActiveNodeIndex(-1);
    setExecutionResult(null);
  };

  const handleDownloadBlueprint = () => {
    window.open(`/api/workflows/${activeWorkflow.id}/download`, '_blank');
  };

  const handleRunSimulation = async () => {
    if (simulating) return;
    setSimulating(true);
    setCompletedNodes([]);
    setActiveNodeIndex(-1);
    setExecutionResult(null);

    try {
      const response = await fetch('/api/simulate-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId: activeWorkflow.id,
          webhookUrl: customWebhookUrl.trim() || undefined,
        }),
      });
      const data = await response.json();

      // Step-by-step animation
      for (let i = 0; i < activeWorkflow.nodes.length; i++) {
        setActiveNodeIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 450));
        setCompletedNodes((prev) => [...prev, activeWorkflow.nodes[i].id]);
      }

      setActiveNodeIndex(-1);
      setExecutionResult(data.execution);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setSimulating(false);
    }
  };

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'trigger':
        return <Clock className="w-4 h-4 text-cyan-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-violet-400" />;
      case 'action':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'transform':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'notification':
        return <Send className="w-4 h-4 text-amber-400" />;
      default:
        return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="workflows" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              <span>Interactive Workflows</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>See How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Test How Each Automation Works Step-by-Step.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              No black boxes. Click any step below to see what happens behind the scenes, or run a live test simulation to watch the data flow.
            </p>
          </div>

          {/* Simulation & Download Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadBlueprint}
              className="px-4 py-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all glass-panel hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 shadow-sm"
              title="Download automation template file"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download Automation Template</span>
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={simulating}
              className={`px-5 py-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                simulating
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold shadow-cyan-500/20 hover:scale-[1.02]'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${simulating ? 'animate-spin' : 'fill-current'}`} />
              <span>{simulating ? 'Running Workflow Steps...' : 'Test Live Flow'}</span>
            </button>
          </div>
        </div>

        {/* Optional Custom Webhook Relay Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => setShowWebhookInput(!showWebhookInput)}
            className="text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{showWebhookInput ? 'Hide Webhook Connection' : 'Connect to Your Own Webhook? (Optional)'}</span>
          </button>
          {showWebhookInput && (
            <div className="flex-1 min-w-[280px] flex items-center gap-2 animate-fadeIn">
              <input
                type="url"
                value={customWebhookUrl}
                onChange={(e) => setCustomWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-endpoint/..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
              <span className="text-[11px] text-slate-500">Live Relay</span>
            </div>
          )}
        </div>

        {/* Workflow Category Segmented Selector */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 mb-8 max-w-3xl">
          {WORKFLOWS_DATA.map((wf) => (
            <button
              key={wf.id}
              onClick={() => handleSelectWorkflow(wf.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedWorkflowId === wf.id
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {wf.category === 'meta_ads' && <TargetIcon className="w-3.5 h-3.5 text-cyan-400" />}
              {wf.category === 'seo' && <Search className="w-3.5 h-3.5 text-indigo-400" />}
              {wf.category === 'instagram' && <Instagram className="w-3.5 h-3.5 text-violet-400" />}
              {wf.category === 'lead_nurture' && <Users className="w-3.5 h-3.5 text-emerald-400" />}
              <span>
                {wf.category === 'meta_ads'
                  ? 'Ad Budget Protection'
                  : wf.category === 'seo'
                  ? 'Google Search Indexing'
                  : wf.category === 'instagram'
                  ? 'Social Content Scheduler'
                  : 'Instant Lead Follow-Up'}
              </span>
            </button>
          ))}
        </div>

        {/* Workflow Overview Meta Bar */}
        <div className="glass-panel rounded-xl p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs border-slate-800">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500">Starts With:</span>{' '}
              <span className="text-slate-200 font-semibold">{activeWorkflow.triggerType}</span>
            </div>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
            <div>
              <span className="text-slate-500">Times Executed:</span>{' '}
              <span className="text-cyan-400 font-semibold tabular-nums">{activeWorkflow.executionCount.toLocaleString()}</span>
            </div>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
            <div>
              <span className="text-slate-500">Reliability:</span>{' '}
              <span className="text-emerald-400 font-semibold tabular-nums">{activeWorkflow.successRate}%</span>
            </div>
          </div>

          <div className="text-slate-400">
            Result: <span className="text-white font-medium">{activeWorkflow.businessImpact}</span>
          </div>
        </div>

        {/* Interactive n8n Node Topology Canvas */}
        <div className="relative glass-panel-elevated rounded-2xl p-6 sm:p-10 overflow-x-auto border-slate-800">
          {/* Simulation Success Banner */}
          {executionResult && (
            <div className="mb-8 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="text-emerald-300 font-bold">Execution Successful:</span>{' '}
                  <span className="text-slate-300">{executionResult.workflowName} finished in </span>
                  <span className="font-mono text-emerald-400 font-bold tabular-nums">
                    {executionResult.totalDurationMs}ms
                  </span>
                  . All nodes returned HTTP 200 / valid payloads.
                </div>
              </div>
              <button
                onClick={() => setExecutionResult(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Node Grid Layout */}
          <div className="min-w-[760px] flex items-center justify-between gap-4 py-6">
            {activeWorkflow.nodes.map((node, index) => {
              const isCurrent = activeNodeIndex === index;
              const isDone = completedNodes.includes(node.id);

              return (
                <React.Fragment key={node.id}>
                  {/* Node Card */}
                  <div
                    onClick={() => setInspectedNode(node)}
                    className={`relative flex-1 p-4 rounded-xl border transition-all cursor-pointer group ${
                      isCurrent
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105'
                        : isDone
                        ? 'bg-slate-900/90 border-emerald-500/60 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Node Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                          {getNodeIcon(node.category)}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {node.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono tabular-nums text-slate-500">
                        {node.executionTime}ms
                      </span>
                    </div>

                    {/* Node Name */}
                    <h4 className="text-xs font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {node.name}
                    </h4>

                    {/* Node Subtitle */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>

                    {/* Inspect Payload CTA */}
                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-cyan-400 font-mono">
                      <span>Inspect Node</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    {/* Active Pulse Animation Badge */}
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-md bg-cyan-400 text-slate-950 text-[10px] font-bold font-mono animate-bounce">
                        RUNNING
                      </div>
                    )}
                    {isDone && !isCurrent && (
                      <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold font-mono">
                        DONE
                      </div>
                    )}
                  </div>

                  {/* Connecting Arrow (between nodes) */}
                  {index < activeWorkflow.nodes.length - 1 && (
                    <div className="shrink-0 flex items-center px-1">
                      <div className={`h-0.5 w-6 sm:w-8 transition-colors ${
                        isDone ? 'bg-emerald-400' : isCurrent ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Canvas Tip */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Tip: Click any node box to inspect real JSON payloads and API headers.</span>
            <span>n8n Core v1.42.0 Engine Compatible</span>
          </div>
        </div>

        {/* Node Payload Inspector Modal */}
        {inspectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="glass-panel-elevated rounded-2xl max-w-2xl w-full p-6 border-slate-700 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                    {getNodeIcon(inspectedNode.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{inspectedNode.name}</h3>
                    <div className="text-xs text-slate-400 font-mono">{inspectedNode.type}</div>
                  </div>
                </div>
                <button
                  onClick={() => setInspectedNode(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Node description */}
              <p className="text-xs text-slate-300 mb-4">{inspectedNode.description}</p>

              {/* Config & Payload JSON tabs */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    Node Configuration & Parameters
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-40">
                    {JSON.stringify(inspectedNode.config, null, 2)}
                  </pre>
                </div>

                {inspectedNode.samplePayload && (
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      Execution Sample Output (JSON Payload)
                    </div>
                    <pre className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48">
                      {JSON.stringify(inspectedNode.samplePayload, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setInspectedNode(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
