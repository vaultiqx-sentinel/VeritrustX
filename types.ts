export type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'select' | 'email' | 'currency';

export interface ModuleField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // For select type
  required: boolean;
}

export interface ModuleSchema {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: ModuleField[];
  createdAt: number;
}

export interface ModuleEntry {
  id: string;
  moduleId: string;
  data: Record<string, any>;
  createdAt: number;
  updatedAt: number;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}