import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StepProgressBar } from './components/StepProgressBar';
import { LoadingModal, LoadingConfig } from './components/LoadingModal';
import { AttributeDetailDrawer } from './components/AttributeDetailDrawer';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { LawsModal } from './components/LawsModal';
import { SqlLogModal } from './components/SqlLogModal';
import { Page1ConnectDatabase } from './pages/Page1ConnectDatabase';
import { Page2UploadDocuments } from './pages/Page2UploadDocuments';
import { Page3SurveyFindings } from './pages/Page3SurveyFindings';
import { Page4ComplianceResults } from './pages/Page4ComplianceResults';
import { Page5RemediationComplete } from './pages/Page5RemediationComplete';
import { AttributeItem } from './data/mockData';

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAttribute, setSelectedAttribute] = useState<AttributeItem | null>(null);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [isLawsModalOpen, setIsLawsModalOpen] = useState(false);
  const [isSqlLogModalOpen, setIsSqlLogModalOpen] = useState(false);

  // Loading modal state
  const [loadingConfig, setLoadingConfig] = useState<LoadingConfig>({
    isOpen: false,
    durationSeconds: 3,
    title: '',
    subtitle: '',
    steps: [],
    mode: 'database',
    onComplete: () => {},
  });

  // Page 1 -> Page 2: 9 seconds loading screen (3x of 3s)
  const handleAnalyzeDataset = () => {
    setLoadingConfig({
      isOpen: true,
      durationSeconds: 9,
      title: 'Connecting to Database & Discovering Schema',
      subtitle: 'Analyzing tables, foreign keys, and 173 technical attributes',
      mode: 'database',
      steps: [
        { label: 'Connecting to database server', detail: 'Handshake with pg-cluster-prod.up-planning.gov.in:5432 over TLS 1.3' },
        { label: 'Validating read-only credentials', detail: 'Granted SELECT on survey schemas: public, survey_2024' },
        { label: 'Loading attributes & relations', detail: 'Querying information_schema.columns & pg_foreign_keys' },
        { label: 'Cataloging entity models', detail: 'Discovered survey_households, survey_members, survey_assets (173 attributes)' },
      ],
      onComplete: () => {
        setLoadingConfig(prev => ({ ...prev, isOpen: false }));
        setCurrentStep(2);
      },
    });
  };

  // Page 2 -> Page 3: 6 seconds loading screen (3x of 2s)
  const handleAnalyzeDocs = () => {
    setLoadingConfig({
      isOpen: true,
      durationSeconds: 6,
      title: 'Extracting Relevant Document Information',
      subtitle: 'Analyzing survey charter, gazette mandate, and mission motto',
      mode: 'document',
      steps: [
        { label: 'Extracting relevant information', detail: 'Parsing SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md' },
        { label: 'Synthesizing mission motto', detail: 'Found: "अंत्योदय से सर्वोदय: सशक्त परिवार, पारदर्शी शासन, सर्वांगीण विकास"' },
        { label: 'Identifying legal grounds & purposes', detail: 'Extracted 6 welfare purposes & Article 162 / Aadhaar Act Section 7 mandate' },
      ],
      onComplete: () => {
        setLoadingConfig(prev => ({ ...prev, isOpen: false }));
        setCurrentStep(3);
      },
    });
  };

  // Page 3 -> Page 4: 15 seconds loading screen (3x of 5s)
  const handleRunCompliance = () => {
    setLoadingConfig({
      isOpen: true,
      durationSeconds: 15,
      title: 'Running DPDP Statutory Compliance Audit',
      subtitle: 'Evaluating 173 database attributes against DPDP Act 2023 & Rules 2025',
      mode: 'compliance',
      steps: [
        { label: 'Loaded all Laws of DPDT', detail: 'Indexed DPDP Act 2023 chapters, 23 Rules & 7 Schedules into legal matrix' },
        { label: 'Verifying each attribute against every law', detail: 'Auditing Section 8 purpose-limitation & data minimisation requirements' },
        { label: 'Evaluating Rule 3 Itemised Notice rules', detail: 'Verifying whether each field was enumerated in citizen privacy notice' },
        { label: 'Auditing Section 9 child personal data protections', detail: 'Checking for verifiable parental consent mechanisms on minor records' },
        { label: 'Testing Article 21 spatial proportionality', detail: 'Analyzing sub-district geographic granularity against welfare targeting needs' },
      ],
      onComplete: () => {
        setLoadingConfig(prev => ({ ...prev, isOpen: false }));
        setCurrentStep(4);
      },
    });
  };

  // Page 4 -> Page 5: 12 seconds loading screen (3x of 4s)
  const handleRemoveNonCompliant = () => {
    setLoadingConfig({
      isOpen: true,
      durationSeconds: 12,
      title: 'Removing Non-Compliant Attributes from Database',
      subtitle: 'Executing schema migration and purging violating columns from PostgreSQL cluster',
      mode: 'remediation',
      steps: [
        { label: 'Initiating database remediation transaction', detail: 'Opening BEGIN TRANSACTION on ses_dp_production' },
        { label: 'Removing data for those attributes from the database', detail: 'Executing ALTER TABLE ... DROP COLUMN for 12 non-compliant fields' },
        { label: 'Purging sub-district geocodes & child metrics', detail: 'Dropping tehsil_code, children_under_6, has_tv, member_name_hindi' },
        { label: 'Rebuilding schema indexes & enforcing data minimisation', detail: 'Executing VACUUM ANALYZE and logging compliance event to audit ledger' },
      ],
      onComplete: () => {
        setLoadingConfig(prev => ({ ...prev, isOpen: false }));
        setCurrentStep(5);
      },
    });
  };

  const handleRestart = () => {
    setCurrentStep(1);
  };

  return (
    <div className="flex min-h-screen bg-[#f0f4f9] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Left Sidebar - Fixed navigation */}
      <Sidebar
        currentStep={currentStep}
        onNavigate={(step) => setCurrentStep(step)}
        onOpenLawsModal={() => setIsLawsModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentStep={currentStep}
          onNavigate={(step) => setCurrentStep(step)}
          onOpenLawsModal={() => setIsLawsModalOpen(true)}
        />

        {/* Stepper Progress Bar */}
        <StepProgressBar
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentStep === 1 && (
            <Page1ConnectDatabase onAnalyzeDataset={handleAnalyzeDataset} />
          )}

          {currentStep === 2 && (
            <Page2UploadDocuments
              onAnalyzeDocs={handleAnalyzeDocs}
              onPreviewCharterDoc={() => setIsCharterModalOpen(true)}
            />
          )}

          {currentStep === 3 && (
            <Page3SurveyFindings
              onRunCompliance={handleRunCompliance}
              onPreviewCharterDoc={() => setIsCharterModalOpen(true)}
              onOpenLawsModal={() => setIsLawsModalOpen(true)}
            />
          )}

          {currentStep === 4 && (
            <Page4ComplianceResults
              onRemoveNonCompliant={handleRemoveNonCompliant}
              onSelectAttribute={(attr) => setSelectedAttribute(attr)}
            />
          )}

          {currentStep === 5 && (
            <Page5RemediationComplete
              onRestart={handleRestart}
              onSelectAttribute={(attr) => setSelectedAttribute(attr)}
              onOpenSqlLog={() => setIsSqlLogModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Dynamic Loading Modal (3s, 2s, 5s, 4s) */}
      <LoadingModal {...loadingConfig} />

      {/* Attribute Detail Drawer */}
      <AttributeDetailDrawer
        attribute={selectedAttribute}
        onClose={() => setSelectedAttribute(null)}
      />

      {/* Survey Charter Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={isCharterModalOpen}
        onClose={() => setIsCharterModalOpen(false)}
      />

      {/* DPDPA Laws & Rules Corpus Modal */}
      <LawsModal
        isOpen={isLawsModalOpen}
        onClose={() => setIsLawsModalOpen(false)}
      />

      {/* SQL Migration Log Modal */}
      <SqlLogModal
        isOpen={isSqlLogModalOpen}
        onClose={() => setIsSqlLogModalOpen(false)}
      />
    </div>
  );
}

export default App;
