import React from 'react';
import { X, BookOpen, ShieldCheck, Scale, ExternalLink } from 'lucide-react';
import { DPDPA_STATUTORY_LAWS_SUMMARY } from '../data/mockData';

interface LawsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LawsModal: React.FC<LawsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                DPDP Act 2023 &amp; DPDP Rules 2025 Corpus
              </h3>
              <p className="text-xs text-slate-500">
                Scraped Statutory Rules, Schedules &amp; Benchmark Standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Laws List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-600 bg-blue-50 border border-blue-200 p-3 rounded-lg leading-relaxed">
            Our compliance engine cross-checks each database attribute against this exact statutory corpus, consisting of <strong>23 Rules</strong>, <strong>7 Schedules</strong>, and the parent <strong>DPDP Act 2023</strong> sections.
          </div>

          <div className="space-y-3">
            {DPDPA_STATUTORY_LAWS_SUMMARY.map((law, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    {law.ruleId}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    Statutory Rule
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{law.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{law.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
