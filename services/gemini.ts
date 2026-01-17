
/**
 * VERITRUSTX NEURAL UPLINK - v1.7 (Stable Production)
 * Institutional Grade Connector
 */

// Automatically switch between Production and Localhost for Demos
// Cast import.meta to any to avoid TypeScript errors with vite env
export const API_BASE = ((import.meta as any).env?.VITE_API_URL || "http://localhost:5000") + "/api"; 

/** 1. INTEGRITY SCANNER (Audit) */
export const performQuantumAudit = async (candidateData: string, licenseKey: string = "DEMO"): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateData, licenseKey })
    });
    const data = await response.json();
    return data.report || data.error || "Neural Core Response Timeout.";
  } catch (error) {
    return "[UPLINK ERROR]: Neural Core unreachable. Running in disconnected mode.";
  }
};

/** 2. FORENSIC DNA LAB (Image Analysis) */
export const analyzeDocumentImage = async (base64Data: string, mimeType: string, licenseKey: string = "DEMO"): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/forensic-analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Data, mimeType, licenseKey })
    });
    const data = await response.json();
    return data.report || "Forensic Link Fault.";
  } catch (error) {
    return "LAB ERROR: Connection failed. Ensure Neural Server is active.";
  }
};

/** 3. ERP ARCHITECT (Logic Transformation) */
export const executeBusinessDirective = async (directive: string, erpState: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/erp-directive`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ directive, erpState })
    });
    const data = await response.json();
    return data.report;
  } catch (error) {
    return "ERP ERROR: Logic Mesh offline.";
  }
};

/** 4. RESOURCE LEDGER (Optimization) */
export const optimizeResources = async (resourcesJson: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/optimize-resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourcesJson })
    });
    const data = await response.json();
    return data.report;
  } catch (error) {
    return "Optimization analysis offline.";
  }
};

/** 5. STAKEHOLDER MESSAGING (Licensing) */
export const generateUpdateMessage = async (auditContext: string, updateType: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/generate-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditContext, updateType })
    });
    const data = await response.json();
    return data.report;
  } catch (error) {
    return "Communication Drafting Failed.";
  }
};

/** 6. GLOBAL SEARCH (Pulse) */
export const globalBackgroundSearch = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE}/global-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return await response.json();
  } catch (error) {
    return { text: "Search service offline. Local grounding active.", sources: [] };
  }
};

/** 7. VAULT STORAGE (Database Sync) */
export const saveAuditToVault = async (record: any) => {
  return await fetch(`${API_BASE}/vault`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  });
};
