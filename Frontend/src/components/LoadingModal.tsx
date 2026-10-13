import React, { useEffect, useState } from 'react';
import { 
  Database, 
  FileSearch, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  Cpu, 
  Terminal,
  Activity
} from 'lucide-react';

export interface LoadingConfig {
  isOpen: boolean;
  durationSeconds: number;
  title: string;
  subtitle: string;
  steps: { label: string; detail: string }[];
  mode: 'database' | 'document' | 'compliance' | 'remediation';
  onComplete: () => void;
}

export const LoadingModal: React.FC<LoadingConfig> = ({
  isOpen,
  durationSeconds,
  title,
  subtitle,
  steps,
  mode,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [logOutputs, setLogOutputs] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStepIdx(0);
      setLogOutputs([]);
      return;
    }

    const totalMs = durationSeconds * 1000;
    const intervalMs = 50;
    const totalTicks = totalMs / intervalMs;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks++;
      const currentPct = Math.min(100, Math.round((ticks / totalTicks) * 100));
      setProgress(currentPct);

      // Determine active step index
      const stepIndex = Math.min(
        steps.length - 1,
        Math.floor((ticks / totalTicks) * steps.length)
      );
      setCurrentStepIdx(stepIndex);

      // Add log entries periodically
      if (ticks % Math.max(1, Math.floor(totalTicks / steps.length)) === 0 && steps[stepIndex]) {
        setLogOutputs((prev) => [
          ...prev.slice(-3),
          `[${new Date().toLocaleTimeString()}] ${steps[stepIndex].label}: ${steps[stepIndex].detail}`,
        ]);
      }

      if (ticks >= totalTicks) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isOpen, durationSeconds, steps, onComplete]);

  if (!isOpen) return null;

  const getModeIcon = () => {
    switch (mode) {
      case 'database':
        return <Database className="w-8 h-8 text-blue-500 animate-pulse" />;
      case 'document':
        return <FileSearch className="w-8 h-8 text-indigo-500 animate-pulse" />;
      case 'compliance':
        return <ShieldCheck className="w-8 h-8 text-emerald-500 animate-pulse" />;
      case 'remediation':
        return <Trash2 className="w-8 h-8 text-red-500 animate-pulse" />;
      default:
        return <Cpu className="w-8 h-8 text-blue-500 animate-spin" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0b1727] text-white w-full max-w-xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 bg-[#0f1f33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-inner">
              {getModeIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
              <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-mono text-blue-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{progress}%</span>
          </div>
        </div>

        {/* Center Progress Bar Area */}
        <div className="p-6 space-y-5">
          {/* Main Filling Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                Processing Pipeline Active
              </span>
              <span>{Math.round((durationSeconds * (100 - progress)) / 100)}s remaining</span>
            </div>

            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-75 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Sequential Steps Checklist */}
          <div className="space-y-2.5 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {steps.map((s, idx) => {
              const isDone = idx < currentStepIdx || progress === 100;
              const isCurrent = idx === currentStepIdx && progress < 100;

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 transition-all duration-300 ${
                    isCurrent
                      ? 'text-white font-medium scale-[1.01]'
                      : isDone
                      ? 'text-emerald-400/90'
                      : 'text-slate-500 opacity-60'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[9px]">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold">{s.label}</div>
                    <div className="text-[11px] text-slate-400">{s.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulated Live Terminal Output */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500 border-b border-slate-800 pb-1 mb-1.5">
              <Terminal className="w-3 h-3 text-slate-400" />
              <span>LIVE SYSTEM STREAM</span>
            </div>
            {logOutputs.length === 0 ? (
              <div className="text-slate-600 italic">Initializing execution worker thread...</div>
            ) : (
              logOutputs.map((log, i) => (
                <div key={i} className="truncate text-slate-300">
                  <span className="text-blue-500 font-bold mr-1">&gt;</span>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-[11px] text-slate-500">
          Duration calibrated to {durationSeconds}s • Digital Personal Data Protection Compliance Engine
        </div>
      </div>
    </div>
  );
};
