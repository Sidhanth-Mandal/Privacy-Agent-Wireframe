import React, { useState } from 'react';
import { X, FileCode, Copy, Check, Terminal, Database } from 'lucide-react';
import { VIOLATION_ATTRIBUTES } from '../data/mockData';

interface SqlLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SqlLogModal: React.FC<SqlLogModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlStatements = `-- ====================================================================
-- DPDP ACT 2023 / DPDP RULES 2025 DATABASE SANITIZATION SCRIPT
-- Target Engine: PostgreSQL 15 (OLTP Core)
-- Database: ses_dp_production | Schemas: public, survey_2024
-- Executed By: Dr. Priya Sharma (Chief Data Protection Officer)
-- Execution Timestamp: ${new Date().toISOString()}
-- ====================================================================

BEGIN TRANSACTION;

-- [Phase 1: Safe column drops on survey_households]
${VIOLATION_ATTRIBUTES.filter(a => a.table === 'survey_households').map(a => `ALTER TABLE survey_households DROP COLUMN IF EXISTS ${a.attribute} CASCADE; -- Breach: ${a.statutoryLaw}`).join('\n')}

-- [Phase 2: Safe column drops on survey_members]
${VIOLATION_ATTRIBUTES.filter(a => a.table === 'survey_members').map(a => `ALTER TABLE survey_members DROP COLUMN IF EXISTS ${a.attribute} CASCADE; -- Breach: ${a.statutoryLaw}`).join('\n')}

-- [Phase 3: Safe column drops on survey_assets]
${VIOLATION_ATTRIBUTES.filter(a => a.table === 'survey_assets').map(a => `ALTER TABLE survey_assets DROP COLUMN IF EXISTS ${a.attribute} CASCADE; -- Breach: ${a.statutoryLaw}`).join('\n')}

-- [Phase 4: Audit Ledger & Index Flush]
INSERT INTO privacy_breach_registry (
  incident_id, entity_table, remediation_type, attributes_purged_count, compliance_status, timestamp
) VALUES (
  gen_random_uuid(), 'survey_households', 'PURGE_NON_COMPLIANT_COLUMNS', ${VIOLATION_ATTRIBUTES.length}, 'COMPLIANT_ENFORCED', NOW()
);

VACUUM ANALYZE survey_households;
VACUUM ANALYZE survey_members;
VACUUM ANALYZE survey_assets;

COMMIT;
-- ====================================================================
-- STATUS: 12 COLUMNS PURGED. DATA MINIMISATION SECTION 8 SATISFIED.
-- ====================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlStatements);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#0b1727] text-slate-200 w-full max-w-3xl rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-[#0f1f33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/60 text-blue-400 rounded-lg border border-blue-700/40">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Executed DDL Migration Script (<code className="text-blue-400 text-xs">remediate_dpdp_up_secs.sql</code>)
              </h3>
              <p className="text-xs text-slate-400">
                PostgreSQL schema alteration log executed on connected production lakehouse
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Copy SQL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/90 leading-relaxed selection:bg-blue-600">
          <pre>{sqlStatements}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0f1f33] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Executed on cluster: pg-cluster-prod.up-planning.gov.in</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors"
          >
            Close Script
          </button>
        </div>
      </div>
    </div>
  );
};
