import React from 'react';
import { 
  Database, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Server, 
  Sparkles, 
  Scale, 
  Globe2, 
  ShieldAlert,
  Activity,
  Layers,
  FileSearch,
  ExternalLink
} from 'lucide-react';
import { SURVEY_FINDINGS, CONNECTED_DATABASE_INFO } from '../data/mockData';

interface Page3Props {
  onRunCompliance: () => void;
  onPreviewCharterDoc: () => void;
  onOpenLawsModal: () => void;
}

export const Page3SurveyFindings: React.FC<Page3Props> = ({ 
  onRunCompliance, 
  onPreviewCharterDoc,
  onOpenLawsModal 
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0c1a30] via-[#112443] to-[#1a365d] rounded-2xl p-6 text-white shadow-lg border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              STEP 3 OF 5
            </span>
            <span className="text-xs text-slate-300">Phase: Findings &amp; Pre-Audit Synthesis</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Survey Charter Findings &amp; Connection Health</h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            The survey charter NLP analysis has completed. Below is the operational connection profile and the extracted mission motto, legal mandate, and declared objectives that will govern the DPDP statutory audit.
          </p>
        </div>

        <button
          type="button"
          onClick={onRunCompliance}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Run DPDP Compliance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 2 Primary Panels: Connection Status + Survey Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Database Connection Status Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Database Connection Status</h3>
                  <p className="text-[11px] text-slate-500">Live target relational catalog</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                ACTIVE
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Engine &amp; Version</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">{CONNECTED_DATABASE_INFO.dbType}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">TLS 1.3 Encrypted</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Latency &amp; Health</div>
                <div className="font-bold text-emerald-700 text-sm mt-0.5 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> {CONNECTED_DATABASE_INFO.latency}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Health: 100% (Optimal)</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Target Records</div>
                <div className="font-bold text-slate-800 text-sm mt-0.5">10,000,000</div>
                <div className="text-[10px] text-slate-500 mt-0.5">~35M Citizen Entities</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Attributes Ingested</div>
                <div className="font-bold text-blue-700 text-sm mt-0.5">173 Fields</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Across 4 Primary Tables</div>
              </div>
            </div>

            {/* Connection Spec Details */}
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Host:</span>
                <span className="text-slate-800 font-medium">{CONNECTED_DATABASE_INFO.host}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Database:</span>
                <span className="text-slate-800 font-medium">{CONNECTED_DATABASE_INFO.databaseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">User Scope:</span>
                <span className="text-slate-800 font-medium">{CONNECTED_DATABASE_INFO.username} (read-only)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Schemas:</span>
                <span className="text-slate-800 font-medium">{CONNECTED_DATABASE_INFO.schema}</span>
              </div>
            </div>

            {/* Tables Discovered */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Primary Tables Discovered in Schema</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  { name: 'survey_households', rows: '10,000,000', attrs: '95 attributes', type: 'Core Household' },
                  { name: 'survey_members', rows: '35,284,190', attrs: '16 attributes', type: 'Individuals' },
                  { name: 'survey_assets', rows: '10,000,000', attrs: '21 attributes', type: 'Amenities & Goods' },
                  { name: 'privacy_breach_registry', rows: '0 (Audit)', attrs: '13 attributes', type: 'Compliance Ledger' },
                ].map((tbl, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">{tbl.name}</span>
                      <span className="text-[10px] text-slate-500 ml-2">({tbl.type})</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                      {tbl.attrs}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Survey Docs Analyzed & Findings Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Survey Charter NLP Extraction &amp; Findings</h3>
                <p className="text-[11px] text-slate-500">Synthesized from official gazette policy mandate</p>
              </div>
            </div>
            <button
              onClick={onPreviewCharterDoc}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>View Full Doc</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mission Motto Box - Inspired by user prompt requirement */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-blue-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Extracted Official Mission Motto</span>
            </div>
            <div className="text-base font-bold italic tracking-wide text-amber-300 font-serif my-1">
              "{SURVEY_FINDINGS.motto}"
            </div>
            <div className="text-xs text-slate-300">
              {SURVEY_FINDINGS.mottoTranslation}
            </div>
            <div className="mt-2 pt-2 border-t border-blue-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Authority: {SURVEY_FINDINGS.operatingAuthority}</span>
              <span className="font-mono text-slate-300">{SURVEY_FINDINGS.gazetteRef}</span>
            </div>
          </div>

          {/* Stated Policy Purposes (The Legal Anchor) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>6 Declared Statutory Policy Purposes (Section 8 Purpose Scope)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {SURVEY_FINDINGS.statedPurposes.map((purpose, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 leading-snug">{purpose}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitive Attributes Identified */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Sensitive Demographic Categories Detected</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {SURVEY_FINDINGS.sensitiveCategoriesIdentified.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-[11px] font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Critical DPDP Compliance Gaps Identified in Charter */}
          <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Preliminary Privacy Gaps Detected in Survey Charter</span>
            </div>
            <ul className="space-y-1 text-xs text-red-800 leading-relaxed">
              {SURVEY_FINDINGS.complianceDeficits.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">•</span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Action Section: Run DPDP Compliance Button */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Audit Engine: <strong>23 Rules &amp; 7 Schedules Loaded</strong>
            </div>

            <button
              type="button"
              onClick={onRunCompliance}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>Run DPDP Compliance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
