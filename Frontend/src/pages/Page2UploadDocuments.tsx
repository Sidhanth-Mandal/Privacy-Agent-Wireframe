import React, { useState } from 'react';
import { 
  FileUp, 
  UploadCloud, 
  FileText, 
  Search, 
  CheckCircle2, 
  Eye, 
  ArrowRight, 
  Database, 
  Layers, 
  FileCheck,
  AlertCircle,
  FileCode,
  Tag
} from 'lucide-react';
import { AUDIT_ATTRIBUTES } from '../data/mockData';

interface Page2Props {
  onAnalyzeDocs: () => void;
  onPreviewCharterDoc: () => void;
}

export const Page2UploadDocuments: React.FC<Page2Props> = ({ onAnalyzeDocs, onPreviewCharterDoc }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('all');
  const [isDragging, setIsDragging] = useState(false);

  // Group attributes by table
  const tables = ['all', 'survey_households', 'survey_members', 'survey_assets', 'privacy_breach_registry'];

  const filteredAttributes = AUDIT_ATTRIBUTES.filter((attr) => {
    const matchesSearch =
      attr.attribute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attr.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTable = selectedTable === 'all' || attr.table === selectedTable;
    return matchesSearch && matchesTable;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0c1a30] via-[#112443] to-[#1a365d] rounded-2xl p-6 text-white shadow-lg border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              STEP 2 OF 5
            </span>
            <span className="text-xs text-slate-300">Phase: Charter &amp; Mandate Ingestion</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Survey &amp; Policy Documents</h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            The database attributes have been loaded. Now upload the official survey charter, gazette mandate, or consent notice documents to analyze the stated purpose, motto, and permissible processing boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-900/50 border border-blue-700/60 px-4 py-2 rounded-xl text-xs text-blue-200">
          <Database className="w-4 h-4 text-emerald-400" />
          <span><strong>173 Attributes</strong> Loaded from Database</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Secondary Section: Pulled Database Attributes List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-[640px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Extracted Attributes Catalog</h2>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
              {filteredAttributes.length} Fields
            </span>
          </div>

          <p className="text-[11px] text-slate-500 my-2">
            Pulled from connected database catalog. Click search or filter by table.
          </p>

          {/* Search & Filter */}
          <div className="space-y-2 mb-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search attribute name or description..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Table Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
              {tables.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTable(t)}
                  className={`px-2 py-1 rounded whitespace-nowrap font-medium transition-colors ${
                    selectedTable === t
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t === 'all' ? 'All Tables' : t}
                </button>
              ))}
            </div>
          </div>

          {/* Attributes Scrollable List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredAttributes.map((attr) => (
              <div
                key={attr.id}
                className="p-2.5 rounded-lg border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-slate-800 text-[11px]">{attr.attribute}</span>
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    {attr.dataType}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {attr.description || 'Database column.'}
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono">{attr.table}</span>
                  <span className="bg-slate-100 text-slate-500 px-1 rounded">{attr.sensitivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right / Main Section: Upload Document Section */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between h-[640px]">
          <div className="space-y-4">
            {/* Header */}
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileUp className="w-5 h-5 text-blue-600" />
                  <span>Upload Survey Charter &amp; Policy Mandate</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  The primary anchor for DPDP Section 8 purpose-limitation &amp; data minimisation evaluation
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                Primary Step
              </span>
            </div>

            {/* Upload Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                Upload all related survey policy, mandate, and charter documents here
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-3">
                Drop your Gazette Notifications, Policy Charters, Consent Forms, or Questionnaire specs (.pdf, .docx, .md, .txt)
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold shadow-xs"
              >
                Browse Document Files
              </button>
            </div>

            {/* Pre-Loaded / Active Survey Charter Document Card */}
            <div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Active Survey Charter Document Attached</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Analysis
                </span>
              </div>

              <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/40 border border-blue-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-2">
                      <span>SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-mono px-1.5 py-0.5 rounded">
                        18.9 KB
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 truncate mt-0.5">
                      Govt of UP • Order Ref: <span className="font-mono">GO/PLN-SW/2024/782-B</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Target: 10 Million Sample Households (~35M Citizens) Across 75 Districts
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onPreviewCharterDoc}
                  className="px-3.5 py-2 bg-white border border-slate-300 hover:border-blue-400 hover:text-blue-700 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Doc</span>
                </button>
              </div>
            </div>

            {/* Information Notice */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Natural Language Purpose Extraction:</span> The engine will parse this charter to determine the stated aims, legitimate statutory authorities (e.g. Article 162, Aadhaar Section 7), and declared survey motto.
              </div>
            </div>
          </div>

          {/* Action Button: "Analyze Docs" */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Analysis duration: <strong>~6 seconds</strong>
            </div>

            <button
              type="button"
              onClick={onAnalyzeDocs}
              className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Analyze Docs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
