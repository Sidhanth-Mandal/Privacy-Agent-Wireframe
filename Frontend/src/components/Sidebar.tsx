import React from 'react';
import { 
  Database, 
  FileText, 
  FileSearch, 
  ShieldCheck, 
  Trash2, 
  LogOut, 
  BookOpen, 
  Bell, 
  Sparkles,
  Layers
} from 'lucide-react';

interface SidebarProps {
  currentStep: number;
  onNavigate: (step: number) => void;
  onOpenLawsModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentStep, onNavigate, onOpenLawsModal }) => {
  const navItems = [
    { step: 1, label: '1. Connect Database', icon: Database, desc: 'Target Data Lake' },
    { step: 2, label: '2. Upload Documents', icon: FileText, desc: 'Survey Charter & Policy' },
    { step: 3, label: '3. Survey Findings', icon: FileSearch, desc: 'Motto & Purpose Analysis' },
    { step: 4, label: '4. DPDP Compliance', icon: ShieldCheck, desc: 'Audit & Violations Matrix' },
    { step: 5, label: '5. Database Remediation', icon: Trash2, desc: 'Purged Attributes & Proof' },
  ];

  return (
    <aside className="w-64 bg-[#0b1727] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800 shadow-xl select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold text-white tracking-wide text-base flex items-center gap-1.5">
            PrivacyShield <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">DPDP</span>
          </div>
          <div className="text-[11px] text-slate-400">Enterprise Audit Portal</div>
        </div>
      </div>

      {/* User Profile Pill - Inspired by Screenshot */}
      <div className="p-4 mx-3 my-3 rounded-xl bg-[#132238] border border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow">
          PS
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-white truncate">Dr. Priya Sharma</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
            Data Protection Officer
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="px-3 py-2 flex-1 space-y-1">
        <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Workflow Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isPassed = currentStep > item.step;

          return (
            <button
              key={item.step}
              onClick={() => onNavigate(item.step)}
              className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group relative ${
                isActive
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : isPassed ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="truncate text-xs font-semibold">{item.label}</div>
                <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.desc}
                </div>
              </div>
              {isPassed && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Completed step" />
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Reference Vault
        </div>

        <button
          onClick={onOpenLawsModal}
          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white transition-all"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>DPDPA 2023 & Rules 2025</span>
          <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
            Corpus
          </span>
        </button>

        <div className="mx-3 mt-4 p-3 rounded-lg bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-blue-800/40 text-xs">
          <div className="flex items-center gap-1.5 text-blue-300 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Target Survey Active</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            UP-SECS Socio-Economic Survey dataset loaded: 173 attributes.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 text-xs flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          <span>Engine v2.4.0 (Online)</span>
        </div>
        <button 
          onClick={() => onNavigate(1)}
          className="hover:text-slate-200 p-1 rounded hover:bg-slate-800 text-slate-400" 
          title="Reset to Step 1"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
