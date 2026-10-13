import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Trash2, 
  ShieldCheck, 
  Download, 
  FileCode, 
  RefreshCw, 
  Layers, 
  Sparkles,
  ExternalLink,
  Lock,
  Database,
  ArrowRight,
  FileCheck
} from 'lucide-react';
import { 
  VIOLATION_ATTRIBUTES, 
  CONDITIONAL_ATTRIBUTES, 
  COMPLIANT_ATTRIBUTES, 
  AttributeItem 
} from '../data/mockData';

interface Page5Props {
  onRestart: () => void;
  onSelectAttribute: (attr: AttributeItem) => void;
  onOpenSqlLog: () => void;
}

export const Page5RemediationComplete: React.FC<Page5Props> = ({ 
  onRestart, 
  onSelectAttribute,
  onOpenSqlLog 
}) => {
  useEffect(() => {
    // Launch celebratory confetti burst on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleDownloadCertificate = () => {
    const certText = `STATE SOCIO-ECONOMIC SURVEY DATA PLATFORM (SES-DP)
OFFICIAL DPDP ACT 2023 COMPLIANCE CERTIFICATE
=====================================================
Target Lakehouse: ses_dp_production (PostgreSQL 15)
Operating Authority: State Socio-Economic Survey Directorate & DES, GoUP
Order Reference: GO/PLN-SW/2024/782-B
Audit Timestamp: ${new Date().toISOString()}

EXECUTIVE REMEDIATION VERDICT:
- Total Attributes Scanned: 173
- Non-Compliant Attributes Purged: 12
- Conditional Attributes Tokenized: 3
- Compliant Attributes Verified: 158
- Final Compliance Posture: 100% SATISFIED

Purged Attributes List:
${VIOLATION_ATTRIBUTES.map((a, i) => `${i + 1}. ${a.table}.${a.attribute} - Breached: ${a.statutoryLaw} [REMOVED]`).join('\n')}

Issued by: Dr. Priya Sharma, Chief Data Protection Officer`;

    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DPDP_Compliance_Certificate_UP_SECS.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Hero Success Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 rounded-2xl p-7 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_70%)] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                REMEDIATION PIPELINE COMPLETE
              </span>
              <span className="text-xs text-slate-300">Phase 5: Sanitized Production Posture</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Database Successfully Remediated &amp; DPDP Compliant!</span>
              <Sparkles className="w-6 h-6 text-amber-300" />
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              All 12 non-compliant attributes have been purged from table schemas. Data minimisation principles under Section 8 and child privacy protections under Section 9 are now strictly enforced on the connected PostgreSQL cluster.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadCertificate}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Compliance Certificate</span>
            </button>

            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs border-t-4 border-t-emerald-500">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Post-Remediation Score
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">
            100%
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-semibold">
            Zero High-Risk Violations Remaining
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs border-t-4 border-t-red-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Attributes Purged</span>
            <Trash2 className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-extrabold text-red-600 mt-2 font-mono">
            {VIOLATION_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-red-700 mt-1 font-semibold">
            Dropped via DDL Migration
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs border-t-4 border-t-amber-500">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Conditional Guardrails</span>
            <Lock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2 font-mono">
            {CONDITIONAL_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-amber-700 mt-1 font-semibold">
            Pseudonymised &amp; DPIA Linked
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs border-t-4 border-t-blue-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Preserved Clean Fields</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-blue-700 mt-2 font-mono">
            {COMPLIANT_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-blue-700 mt-1 font-semibold">
            Fully Retained for Welfare Delivery
          </div>
        </div>
      </div>

      {/* Main Section: The Purged Non-Compliant Attributes List (Prompt Requirement!) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span>List of Non-Compliant Attributes Purged from Database</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These 12 attributes violated DPDP Act 2023 statutory mandates and have been safely removed. Click any attribute to inspect legal justification.
            </p>
          </div>

          <button
            onClick={onOpenSqlLog}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <FileCode className="w-4 h-4 text-blue-600" />
            <span>View SQL DDL Script</span>
          </button>
        </div>

        {/* Removed Attributes Table / Cards */}
        <div className="space-y-3">
          {VIOLATION_ATTRIBUTES.map((attr) => (
            <div
              key={attr.id}
              onClick={() => onSelectAttribute(attr)}
              className="p-4 rounded-xl border border-red-200 bg-red-50/40 hover:bg-red-50/70 border-l-4 border-l-red-600 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-slate-900 line-through text-sm">
                    {attr.attribute}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white font-mono">
                    PURGED / DROPPED
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">
                    {attr.table}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-200/80 px-1.5 py-0.5 rounded">
                    {attr.dataType}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  {attr.description}
                </p>

                <div className="text-[11px] text-red-950 font-medium flex items-center gap-2 flex-wrap">
                  <span className="text-red-700 font-bold">Violated Statutory Provision:</span>
                  <span className="font-mono text-blue-900 bg-blue-100/70 px-1.5 py-0.2 rounded text-[10px]">
                    {attr.statutoryLaw}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 truncate max-w-lg">
                    {attr.breachReason}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                  Inspect Justification &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Conditional Attributes with Active Governance Safeguards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Conditional Attributes (3 Processed Under Mandatory Safeguards)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Retained for welfare operations subject to strict technical controls (pseudonymisation, notice amendment, DPIA).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CONDITIONAL_ATTRIBUTES.map((attr) => (
            <div
              key={attr.id}
              onClick={() => onSelectAttribute(attr)}
              className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/80 border-l-4 border-l-amber-500 cursor-pointer transition-all text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{attr.attribute}</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  SAFEGUARDED
                </span>
              </div>
              <div className="text-[11px] text-slate-600 line-clamp-2">
                {attr.description}
              </div>
              <div className="text-[10px] text-amber-900 font-mono bg-white p-2 rounded border border-amber-200">
                Remedy: {attr.remediation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Certificate Details & Technical Sign-Off Box */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Official Verification Dossier Generated</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified by Enterprise DPDP Compliance Engine • Gazette Reference: <span className="font-mono font-bold">GO/PLN-SW/2024/782-B</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSqlLog}
            className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            Review DDL Execution Log
          </button>
          <button
            onClick={handleDownloadCertificate}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
