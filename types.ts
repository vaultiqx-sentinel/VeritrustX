export type VeritrustTheme = 'indigo' | 'emerald' | 'onyx';

export type VerdictType = 'Verified' | 'Likely True' | 'Unverified' | 'Misleading' | 'False' | 'Flagged' | 'Failed';

export interface Source {
  title: string;
  uri: string;
}

export interface VaultRecord {
  id: string;
  name: string;
  role: string;
  status: 'Verified' | 'Flagged' | 'Failed';
  trustScore: number;
  report?: string;
  created_at: string;
  photoUrl?: string | null;
  entity_verified?: boolean;
  identity_verified?: boolean;
}

export enum AnalysisMode {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  DEEP_SCAN = 'DEEP_SCAN'
}

export interface VerificationResult {
  score: number;
  verdict: VerdictType;
  summary: string;
  analysisPoints: string[];
  sources: Source[];
}

export interface ModuleSchema {
  id: string;
  name: string;
  description: string;
  fields: {
    id: string;
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select' | 'email' | 'currency' | 'boolean';
    required?: boolean;
    options?: string[];
  }[];
}

export interface ModuleEntry {
  id: string;
  moduleId: string;
  data: Record<string, any>;
  verified: boolean;
  timestamp: string;
}