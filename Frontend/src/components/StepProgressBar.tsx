import React from 'react';
import { Database, FileUp, FileSearch, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const STEPS = [
  { number: 1, label: 'Connect to Database', icon: Database, shortDesc: 'Schema Extraction' },
  { number: 2, label: 'Upload Documents', icon: FileUp, shortDesc: 'Survey Charter' },
  { number: 3, label: 'Survey Findings', icon: FileSearch, shortDesc: 'Motto & Purpose' },
  { number: 4, label: 'DPDP Compliance', icon: ShieldAlert, shortDesc: 'Audit Violations' },
  { number: 5, label: 'Remediation Complete', icon: CheckCircle2, shortDesc: 'Sanitized DB' },
];

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 py-4 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 -z-0">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isPassed = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isUpcoming = currentStep < step.number;

          return (
            <button
              key={step.number}
              onClick={() => onStepClick(step.number)}
              className="group relative z-10 flex flex-col items-center focus:outline-none"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-xs ${
                  isActive
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                    : isPassed
                    ? 'bg-emerald-600 text-white shadow-sm hover:scale-105'
                    : 'bg-white border-2 border-slate-300 text-slate-500 hover:border-slate-400'
                }`}
              >
                {isPassed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={`block text-xs font-semibold tracking-tight transition-colors ${
                    isActive
                      ? 'text-blue-700 font-bold'
                      : isPassed
                      ? 'text-slate-800'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
                <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">
                  {step.shortDesc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
