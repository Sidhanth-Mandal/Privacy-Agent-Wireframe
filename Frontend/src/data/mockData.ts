import attributesData from './attributes.json';

export interface AttributeItem {
  id: string;
  table: string;
  attribute: string;
  dataType: string;
  description: string;
  sensitivity: string;
  status: 'COMPLIANT' | 'VIOLATION' | 'CONDITIONAL';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  statutoryLaw: string;
  breachReason: string;
  remediation: string;
}

export const AUDIT_ATTRIBUTES: AttributeItem[] = attributesData as AttributeItem[];

export const VIOLATION_ATTRIBUTES = AUDIT_ATTRIBUTES.filter(a => a.status === 'VIOLATION');
export const CONDITIONAL_ATTRIBUTES = AUDIT_ATTRIBUTES.filter(a => a.status === 'CONDITIONAL');
export const COMPLIANT_ATTRIBUTES = AUDIT_ATTRIBUTES.filter(a => a.status === 'COMPLIANT');

export const SURVEY_FINDINGS = {
  surveyName: 'UP-SECS (Uttar Pradesh Comprehensive Socio-Economic, Caste & Family Welfare Survey)',
  operatingAuthority: 'State Socio-Economic Survey Directorate & Directorate of Economics and Statistics, Government of Uttar Pradesh',
  gazetteRef: 'GO/PLN-SW/2024/782-B (Issued: October 14, 2024)',
  motto: 'अंत्योदय से सर्वोदय: सशक्त परिवार, पारदर्शी शासन, सर्वांगीण विकास',
  mottoTranslation: '(From the Last Person to Universal Upliftment: Empowered Families, Transparent Governance, and Holistic Development)',
  targetHouseholds: '10,000,000 Sample Households (~35 Million Citizens)',
  geographicScope: 'All 75 Districts, 351 Tehsils, 826 CD Blocks, Urban Local Bodies',
  legalBasisClaimed: [
    'Article 162 of the Constitution of India (State Executive Power)',
    'Entry 20 of List III (Concurrent List) - Economic and Social Planning',
    'Section 7 of the Aadhaar (Targeted Delivery of Subsidies, Benefits & Services) Act, 2016',
    'Uttar Pradesh Direct Benefit Transfer Delivery Rules',
    'Supreme Court Precedents (Indra Sawhney, K. Krishnamurthy, Vikas Kishanrao Gawali, Bihar Jati Adharit Ganana)'
  ],
  statedPurposes: [
    'Rationalise Direct Benefit Transfers (DBT) and eliminate ghost beneficiaries',
    'Identify rural/urban housing, piped water, sanitation, and electricity needs',
    'Provide contemporary empirical data for caste-based affirmative action and quota planning',
    'Map health vulnerability, chronic diseases, and disability for universal healthcare',
    'Assess agrarian livelihoods, landholding patterns, and rural employment (MGNREGS)',
    'Track circular labor migration and urban-rural economic transitions'
  ],
  sensitiveCategoriesIdentified: [
    'Caste & Sub-Caste classifications (Sensitive demographic marker)',
    'Religious affiliations (Belief & identity metrics)',
    'Physical & mental disability indicators (Protected health data)',
    'Minor and infant demographic metrics (<6 and 6-14 years)',
    'Aadhaar tokens & biometric linkage flags (Statutory identifier)',
    'Household micro-assets and consumer durables (Over-collection)'
  ],
  complianceDeficits: [
    'No explicit data retention period specified in the Gazette charter (Breach of Section 8(3))',
    'Absence of verifiable parental consent protocol for child enumeration (Breach of Section 9(1) & Rule 10)',
    'Sub-district granular spatial tracking without documented necessity (Breach of Article 21 & Section 8)',
    'Lack of explicit third-party data sharing protocol or public notice disclosure (Breach of Rule 3)'
  ]
};

export const CONNECTED_DATABASE_INFO = {
  dbType: 'PostgreSQL 15 (OLTP Core)',
  host: 'pg-cluster-prod.up-planning.gov.in',
  port: 5432,
  databaseName: 'ses_dp_production',
  username: 'ses_dp_audit_ro',
  schema: 'public, survey_2024',
  environment: 'State Production Welfare Lakehouse',
  totalRecords: '10,000,000 Households / 35,284,190 Citizens',
  tableCount: 4,
  attributeCount: 173,
  connectionStatus: 'Connected & Synced (TLS 1.3)',
  latency: '24 ms',
  healthStatus: 'Optimal'
};

export const DPDPA_STATUTORY_LAWS_SUMMARY = [
  {
    ruleId: 'Section 8 DPDP Act 2023',
    title: 'General Obligations of Data Fiduciary: Purpose Limitation & Data Minimisation',
    description: 'A Data Fiduciary shall process personal data only for a specified purpose for which the Data Principal has given consent or which is necessary under Section 7. Fiduciary must erase personal data upon purpose completion.'
  },
  {
    ruleId: 'Rule 3 DPDP Rules 2025',
    title: 'Itemised Notice Given by Data Fiduciary to Data Principal',
    description: 'Every request for consent must be accompanied or preceded by an itemised notice enumerating every personal data element to be processed, the specified purpose, and the exercise of rights.'
  },
  {
    ruleId: 'Section 9 DPDP Act 2023',
    title: 'Processing of Personal Data of Children',
    description: 'A Data Fiduciary shall, before processing any personal data of a child, obtain verifiable consent of the parent or lawful guardian. No tracking, behavioral monitoring, or targeted ads directed at children.'
  },
  {
    ruleId: 'Rule 10 DPDP Rules 2025',
    title: 'Verifiable Consent for Processing Personal Data of Child',
    description: 'Prescribes technical and documentary standards for verifying parental or guardian consent before enrolling any child in state data registers.'
  },
  {
    ruleId: 'Rule 6 DPDP Rules 2025',
    title: 'Reasonable Security Safeguards',
    description: 'Mandates column-level encryption, access segregation, pseudonymisation, and integrity validation for sensitive attributes.'
  },
  {
    ruleId: 'Article 21 Constitution of India',
    title: 'Proportionality & Necessity Test (Right to Privacy)',
    description: 'Invasion of privacy must be sanctioned by law, serve a legitimate state aim, and satisfy the three-fold proportionality test (Puttaswamy standard).'
  }
];
