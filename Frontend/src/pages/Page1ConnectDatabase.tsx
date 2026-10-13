import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
  HardDrive,
  Layers,
  FileCheck
} from 'lucide-react';

interface Page1Props {
  onAnalyzeDataset: () => void;
}

export const Page1ConnectDatabase: React.FC<Page1Props> = ({ onAnalyzeDataset }) => {
  const [dbType, setDbType] = useState('PostgreSQL');
  const [host, setHost] = useState('pg-cluster-prod.up-planning.gov.in');
  const [port, setPort] = useState('5432');
  const [databaseName, setDatabaseName] = useState('ses_dp_production');
  const [username, setUsername] = useState('ses_dp_audit_ro');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [schema, setSchema] = useState('public, survey_2024');
  const [connectionName, setConnectionName] = useState('UP-SECS State Production Data Lakehouse');
  const [sslMode, setSslMode] = useState('require');
  const [isTested, setIsTested] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleQuickFill = () => {
    setDbType('PostgreSQL');
    setHost('pg-cluster-prod.up-planning.gov.in');
    setPort('5432');
    setDatabaseName('ses_dp_production');
    setUsername('ses_dp_audit_ro');
    setPassword('UP_Planning_Secret_2026!');
    setSchema('public, survey_2024');
    setConnectionName('UP-SECS State Production Data Lakehouse');
    setSslMode('require');
    setIsTested(true);
  };

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setIsTested(true);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Welcome Card - Inspired by Image 1 */}
      <div className="bg-gradient-to-r from-[#0c1a30] via-[#112443] to-[#1a365d] rounded-2xl p-6 text-white shadow-lg border border-slate-700/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_70%)] pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                STEP 1 OF 5
              </span>
              <span className="text-xs text-slate-300">Phase: Ingestion &amp; Cataloging</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Connect to Client Database</h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Connect to client database repositories to pull technical attributes, foreign key graphs, and data models before evaluating DPDP statutory compliance.
            </p>
          </div>

          <button
            onClick={handleQuickFill}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-xl text-xs font-semibold border border-blue-400/40 shadow-sm transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Load Demo Credentials</span>
          </button>
        </div>
      </div>

      {/* Main Connection Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Database Connection Credentials</h2>
              <p className="text-xs text-slate-500">Provide read-only credentials to inspect tables and attributes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isTested && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Connection Verified (24ms)
              </span>
            )}
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3.5 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing...' : 'Test Ping'}</span>
            </button>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Database Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Database Engine</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={dbType}
                onChange={(e) => setDbType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="PostgreSQL">PostgreSQL (v12 - v16)</option>
                <option value="MySQL">MySQL / MariaDB</option>
                <option value="Oracle">Oracle Database 19c/21c</option>
                <option value="Snowflake">Snowflake Data Cloud</option>
                <option value="MSSQL">Microsoft SQL Server</option>
                <option value="MongoDB">MongoDB Atlas (NoSQL)</option>
              </select>
            </div>
          </div>

          {/* Connection Alias */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Connection Alias / Project Name</span>
            </label>
            <input
              type="text"
              value={connectionName}
              onChange={(e) => setConnectionName(e.target.value)}
              placeholder="e.g. State Socio-Economic Survey Prod"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Host / URL */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span>Host / Server URL</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="e.g. db.example.com or IP address"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Port */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Port</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="5432"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Database Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>Database Name</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
              placeholder="ses_dp_production"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>Username (Read-Only)</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ses_dp_audit_ro"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Password</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-10 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Schema / Search Path */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Schema Scope</span>
            </label>
            <input
              type="text"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder="public, survey_2024"
              className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* SSL Mode */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>SSL Encryption Mode</span>
            </label>
            <select
              value={sslMode}
              onChange={(e) => setSslMode(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="require">Require (TLS 1.3)</option>
              <option value="verify-ca">Verify Certificate Authority</option>
              <option value="verify-full">Verify Full (Strict FQDN)</option>
            </select>
          </div>

          {/* Read-Only Notice Callout */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/80 text-[11px] text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Audit requires read privileges on schema metadata. No live records are modified during inspection.</span>
            </div>
          </div>
        </div>

        {/* Security & Ingestion Notice */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <div className="p-1.5 bg-slate-200 rounded text-slate-700 mt-0.5">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-xs mb-0.5">Automated Attribute Discovery Protocol</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Once initiated, the engine executes queries against <code className="text-blue-700 font-mono">information_schema.columns</code> and <code className="text-blue-700 font-mono">pg_catalog</code> to discover table boundaries, foreign keys, and attribute data types across the target lakehouse.
            </p>
          </div>
        </div>

        {/* Action Button - "Analyze Dataset" */}
        <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Target Catalog: <strong>UP-SECS Household Registry (173 Attributes)</strong></span>
          </div>

          <button
            type="button"
            onClick={onAnalyzeDataset}
            className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Analyze Dataset</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
