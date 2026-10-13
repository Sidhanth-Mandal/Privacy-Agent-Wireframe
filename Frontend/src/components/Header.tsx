import React from 'react';
import { 
  Bell, 
  Settings, 
  ChevronRight, 
  ShieldCheck, 
  HelpCircle,
  Database,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  onNavigate: (step: number) => void;
  onOpenLawsModal: () => void;
}

const STEP_TITLES: Record<number, { title: string; breadcrumb: string }> = {
  1: { title: 'Connect to Database', breadcrumb: 'Database Connection & Schema Ingestion' },
  2: { title: 'Upload Documents', breadcrumb: 'Survey Charter & Policy Extraction' },
  3: { title: 'Survey Findings & Mandate', breadcrumb: 'Mission Motto & Purpose Alignment' },
  4: { title: 'DPDP Compliance Matrix', breadcrumb: 'Audited Attributes & Violation Analytics' },
  5: { title: 'Database Remediation Complete', breadcrumb: 'Sanitized Schema & Verification' },
};

export const Header: React.FC<HeaderProps> = ({ currentStep, onNavigate, onOpenLawsModal }) => {
  const current = STEP_TITLES[currentStep] || STEP_TITLES[1];

  return (
    <header className="bg-white border-b border-slate-200/90 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Breadcrumbs & Step Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => onNavigate(1)}>
            State Privacy Portal
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 font-semibold">{current.title}</span>
        </div>
        <span className="h-4 w-[1px] bg-slate-300 hidden sm:inline-block"></span>
        <span className="text-xs text-slate-400 hidden sm:inline-block">
          {current.breadcrumb}
        </span>
      </div>

      {/* Right Action Icons & Badges */}
      <div className="flex items-center gap-3">
        {/* Step Indicator Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse"></span>
          <span>Step {currentStep} of 5</span>
        </div>

        {/* Database Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>PostgreSQL 15 Connected</span>
        </div>

        {/* Laws Reference Button */}
        <button
          onClick={onOpenLawsModal}
          className="hidden sm:flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200/80 transition-colors"
          title="View DPDPA Statutory Rules Reference"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DPDPA Laws</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>
        </div>

        {/* Settings Button */}
        <button className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            PS
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">Dr. Priya Sharma</div>
            <div className="text-[10px] text-slate-500">Chief Privacy Officer</div>
          </div>
        </div>
      </div>
    </header>
  );
};
