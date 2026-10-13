import React from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  FileCode, 
  ShieldAlert, 
  Wrench, 
  Copy, 
  Check
} from 'lucide-react';
import { AttributeItem } from '../data/mockData';

interface AttributeDetailDrawerProps {
  attribute: AttributeItem | null;
  onClose: () => void;
}

export const AttributeDetailDrawer: React.FC<AttributeDetailDrawerProps> = ({ attribute, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!attribute) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(attribute, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (attribute.status === 'VIOLATION') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          NON-COMPLIANT VIOLATION (HIGH RISK)
        </span>
      );
    }
    if (attribute.status === 'CONDITIONAL') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          CONDITIONAL PROCESSING (MEDIUM RISK)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        FULLY COMPLIANT (LOW RISK)
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-mono">
                {attribute.table}
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>{attribute.attribute}</span>
                <span className="text-xs font-mono font-normal text-slate-500 px-2 py-0.5 bg-slate-200 rounded">
                  {attribute.dataType}
                </span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              title="Copy JSON details"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Banner */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            {getStatusBadge()}
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              Category: {attribute.sensitivity}
            </span>
          </div>

          {/* Description */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Field Description &amp; Schema Function
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              {attribute.description || 'Database field captured in primary household entity record.'}
            </p>
          </div>

          {/* Statutory Law Cited */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>Statutory Laws &amp; Provisions</span>
            </div>
            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl text-sm font-semibold text-blue-950 font-mono">
              {attribute.statutoryLaw}
            </div>
          </div>

          {/* Exact Breach Rationale / Compliance Verdict */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {attribute.status === 'COMPLIANT' ? 'Compliance Justification' : 'Exact Statutory Breach Rationale'}
            </div>
            <div
              className={`p-4 rounded-xl border text-sm leading-relaxed ${
                attribute.status === 'VIOLATION'
                  ? 'bg-red-50/60 border-red-200 text-red-950'
                  : attribute.status === 'CONDITIONAL'
                  ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              }`}
            >
              {attribute.breachReason}
            </div>
          </div>

          {/* Remediation & Workarounds */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-slate-600" />
              <span>Recommended Action &amp; Remediation Safeguard</span>
            </div>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs font-mono leading-relaxed space-y-2">
              <div className="text-slate-400 font-sans">{attribute.remediation}</div>
              {attribute.status === 'VIOLATION' && (
                <div className="pt-2 border-t border-slate-800 text-red-400">
                  SQL Recommendation: ALTER TABLE {attribute.table} DROP COLUMN {attribute.attribute};
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
