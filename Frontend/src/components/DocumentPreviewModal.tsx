import React from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { SURVEY_FINDINGS } from '../data/mockData';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md
              </h3>
              <p className="text-xs text-slate-500">
                Official Gazette Extraordinary Notification • Govt. of Uttar Pradesh
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 font-sans leading-relaxed">
          {/* Gazette Banner */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
              Official Notification Header
            </div>
            <div className="font-semibold text-slate-800 text-sm mt-1">
              {SURVEY_FINDINGS.operatingAuthority}
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Order Reference No.: <span className="font-mono font-medium">{SURVEY_FINDINGS.gazetteRef}</span>
            </div>
          </div>

          {/* Motto Box */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-5 shadow-sm">
            <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">
              Declared Survey Motto &amp; Philosophy
            </div>
            <blockquote className="text-lg font-bold italic tracking-wide text-amber-300 font-serif">
              "{SURVEY_FINDINGS.motto}"
            </blockquote>
            <p className="text-xs text-slate-300 mt-1">
              {SURVEY_FINDINGS.mottoTranslation}
            </p>
          </div>

          {/* Stated Policy Objectives */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              6 Declared Primary Policy Objectives
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {SURVEY_FINDINGS.statedPurposes.map((purpose, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{purpose}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Backing Claimed */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Statutory Backing &amp; Constitutional Authorities Cited
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {SURVEY_FINDINGS.legalBasisClaimed.map((basis, idx) => (
                <li key={idx} className="font-mono text-slate-700">{basis}</li>
              ))}
            </ul>
          </div>

          {/* Critical DPDP Deficits */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-bold text-red-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Identified Privacy Gaps in Charter Document
            </h4>
            <ul className="space-y-1 text-xs text-red-800">
              {SURVEY_FINDINGS.complianceDeficits.map((deficit, idx) => (
                <li key={idx}>• {deficit}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>Target Scope: 10 Million Households across 75 Districts</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
