import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  Filter, 
  Trash2, 
  ChevronRight, 
  BarChart3, 
  PieChart, 
  Layers, 
  Scale, 
  Sparkles,
  Info,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  AUDIT_ATTRIBUTES, 
  VIOLATION_ATTRIBUTES, 
  CONDITIONAL_ATTRIBUTES, 
  COMPLIANT_ATTRIBUTES,
  AttributeItem 
} from '../data/mockData';

interface Page4Props {
  onRemoveNonCompliant: () => void;
  onSelectAttribute: (attr: AttributeItem) => void;
}

export const Page4ComplianceResults: React.FC<Page4Props> = ({ 
  onRemoveNonCompliant, 
  onSelectAttribute 
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'VIOLATION' | 'CONDITIONAL' | 'COMPLIANT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('all');

  const filteredAttributes = AUDIT_ATTRIBUTES.filter((item) => {
    const matchesFilter = activeFilter === 'ALL' || item.status === activeFilter;
    const matchesTable = selectedTable === 'all' || item.table === selectedTable;
    const matchesSearch =
      item.attribute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.statutoryLaw.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesTable && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner - Inspired by Image 1 */}
      <div className="bg-gradient-to-r from-[#0c1a30] via-[#112443] to-[#1a365d] rounded-2xl p-6 text-white shadow-lg border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              STEP 4 OF 5
            </span>
            <span className="text-xs text-slate-300">Phase: Quantitative Audit &amp; Violation Analysis</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">DPDP Compliance Audit &amp; Violation Matrix</h1>
          <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            All 173 database attributes have been audited against the DPDP Act 2023, DPDP Rules 2025, and the declared UP-SECS Survey Charter. Review findings below and execute non-compliant data elimination.
          </p>
        </div>

        {/* Action Button: Remove Non-Compliant Attributes */}
        <button
          type="button"
          onClick={onRemoveNonCompliant}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 hover:shadow-red-600/40 transition-all hover:scale-105 shrink-0 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-white" />
          <span>Remove Non-Compliant Attributes</span>
          <span className="text-xs bg-red-900/80 px-2 py-0.5 rounded-full font-mono">12</span>
        </button>
      </div>

      {/* Top Quantitative Visualizations & 4 Stat Cards - Inspired by Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Audited */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden border-t-4 border-t-blue-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Audited Attributes
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2 font-mono">
            {AUDIT_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>100% of schema catalog scanned</span>
          </div>
        </div>

        {/* Card 2: Compliant */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden border-t-4 border-t-emerald-500">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Compliant Attributes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-mono">
            {COMPLIANT_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-semibold">
            91.33% Pass Rate (Low Risk)
          </div>
        </div>

        {/* Card 3: Non-Compliant Violations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden border-t-4 border-t-red-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Violations (High Risk)</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-extrabold text-red-600 mt-2 font-mono">
            {VIOLATION_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-red-700 mt-1 font-semibold">
            6.94% Targeted for Purge
          </div>
        </div>

        {/* Card 4: Conditional */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden border-t-4 border-t-amber-500">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Conditional Attributes</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-2 font-mono">
            {CONDITIONAL_ATTRIBUTES.length}
          </div>
          <div className="text-xs text-amber-700 mt-1 font-semibold">
            1.73% (Remediation Required)
          </div>
        </div>
      </div>

      {/* Visual Analytics Row: Circular Gauge & Statutory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Donut Gauge (5 cols) - Inspired by Image 1 */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Compliance Posture Score</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
              Post-Audit
            </span>
          </div>

          <div className="my-6 flex items-center justify-center">
            {/* SVG Donut Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#f1f5f9"
                  strokeWidth="11"
                  fill="transparent"
                />
                {/* Green Compliant Segment: 91.3% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#16a34a"
                  strokeWidth="11"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 * (1 - 0.913)}
                  strokeLinecap="round"
                  fill="transparent"
                />
                {/* Red Violation Segment: 6.9% */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#dc2626"
                  strokeWidth="11"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 * (1 - 0.069)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="opacity-90"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">91.3%</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Overall Score
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">158 / 173 Clean</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-3 border-t border-slate-100">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <div className="text-emerald-700 font-bold">158</div>
              <div className="text-[10px] text-emerald-600">Compliant</div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <div className="text-red-700 font-bold">12</div>
              <div className="text-[10px] text-red-600">Violations</div>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <div className="text-amber-700 font-bold">3</div>
              <div className="text-[10px] text-amber-600">Conditional</div>
            </div>
          </div>
        </div>

        {/* Statutory Breaches Breakdown (7 cols) - Inspired by Image 1 */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Violation Frequency by Statutory Provision</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">DPDP Act 2023 &amp; Rules 2025</span>
          </div>

          <div className="space-y-3.5 my-4">
            {[
              { rule: 'Rule 3 (Itemised Notice Deficit)', count: 9, color: 'bg-red-500', total: 12 },
              { rule: 'Section 8 (Purpose Limitation & Minimisation)', count: 7, color: 'bg-rose-500', total: 12 },
              { rule: 'Section 9 & Rule 10 (Children Personal Data)', count: 2, color: 'bg-orange-500', total: 12 },
              { rule: 'Article 21 (Proportionality & Sub-District Geo)', count: 2, color: 'bg-amber-500', total: 12 },
              { rule: 'Rule 6 (Reasonable Security & Encryption)', count: 2, color: 'bg-blue-500', total: 12 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.rule}</span>
                  <span className="font-mono text-slate-600 font-bold">{item.count} Attributes</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
            <span>Critical concentration in sub-district location codes, infant age counters, and unlinked consumer assets.</span>
          </div>
        </div>
      </div>

      {/* Attributes List & Filter Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {/* Section Header & Filter Pills - Inspired by Screenshot Image 2 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Audited Attributes Ledger</h3>
            <p className="text-xs text-slate-500">
              Click any attribute to view the exact statutory law breached, legal rationale, or compliance proof.
            </p>
          </div>

          {/* Filter Pills - Inspired by Image 2 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({AUDIT_ATTRIBUTES.length})
            </button>
            <button
              onClick={() => setActiveFilter('VIOLATION')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'VIOLATION'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Violations ({VIOLATION_ATTRIBUTES.length})
            </button>
            <button
              onClick={() => setActiveFilter('CONDITIONAL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'CONDITIONAL'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Conditional ({CONDITIONAL_ATTRIBUTES.length})
            </button>
            <button
              onClick={() => setActiveFilter('COMPLIANT')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'COMPLIANT'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Compliant ({COMPLIANT_ATTRIBUTES.length})
            </button>
          </div>
        </div>

        {/* Search & Table Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by attribute name, law, or description..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs">
            <span className="text-slate-500">Table:</span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All Tables</option>
              <option value="survey_households">survey_households</option>
              <option value="survey_members">survey_members</option>
              <option value="survey_assets">survey_assets</option>
              <option value="privacy_breach_registry">privacy_breach_registry</option>
            </select>
          </div>
        </div>

        {/* Attributes List Cards (Clickable) */}
        <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
          {filteredAttributes.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              No attributes matching the current filter criteria.
            </div>
          ) : (
            filteredAttributes.map((attr) => {
              const isViolation = attr.status === 'VIOLATION';
              const isConditional = attr.status === 'CONDITIONAL';
              const isCompliant = attr.status === 'COMPLIANT';

              return (
                <div
                  key={attr.id}
                  onClick={() => onSelectAttribute(attr)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                    isViolation
                      ? 'border-red-200 bg-red-50/30 hover:bg-red-50/70 border-l-4 border-l-red-600'
                      : isConditional
                      ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50/70 border-l-4 border-l-amber-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 border-l-4 border-l-emerald-500'
                  }`}
                >
                  {/* Left Column: Attribute Info */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {attr.attribute}
                      </span>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {attr.dataType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {attr.table}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      {attr.description || 'Database field captured in primary household record.'}
                    </p>

                    <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-slate-700">
                        Law: <span className="font-mono text-blue-700">{attr.statutoryLaw}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="truncate max-w-md text-slate-500">
                        {attr.breachReason}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Status Badge & Chevron */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    {isViolation && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        VIOLATION
                      </span>
                    )}
                    {isConditional && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        CONDITIONAL
                      </span>
                    )}
                    {isCompliant && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        COMPLIANT
                      </span>
                    )}

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner with Action Trigger */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
            <span>
              <strong>12 Non-Compliant Attributes</strong> identified for database purging under Section 8 &amp; 9.
            </span>
          </div>

          <button
            type="button"
            onClick={onRemoveNonCompliant}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/30 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-white" />
            <span>Remove Non-Compliant Attributes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
