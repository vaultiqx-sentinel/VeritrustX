/**
 * VERITRUSTX NEURAL UPLINK SERVICE
 * This service routes all frontend requests to the local/production Node.js backend.
 */

// LOCAL TESTING: Use Port 5000
// PRODUCTION: Replace with your Render.com URL (e.g., https://veritrustx-api.onrender.com/api)
const API_BASE = "http://localhost:5000/api";

/**
 * 1. INTEGRITY SCANNER: Forensic Scrutiny Audit
 * Analyzes candidate text for logic fractures and inconsistencies.
 */
export const performQuantumAudit = async (candidateData: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/audit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateData })
    });
    const data = await response.json();
    return data.report || "Audit failed to generate logic report.";
  } catch (error) {
    console.error("Audit Error:", error);
    return "OFFLINE: Neural Core connection severed. Ensure backend is running.";
  }
};

/**
 * 2. FORENSIC LAB: Digital DNA Image Analysis
 * Scans documents for pixel tampering and template violations.
 */
export const analyzeDocumentImage = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/forensic-analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Data, mimeType })
    });
    const data = await response.json();
    return data.report || "Analysis failed.";
  } catch (error) {
    return "LAB ERROR: Image data too large or backend offline.";
  }
};

/**
 * 3. ERP ARCHITECT: Autonomous Logic Core
 * Transforms business rules using natural language directives.
 */
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
    throw new Error("Logic Core offline.");
  }
};

/**
 * 4. GLOBAL PULSE: Grounded Background Search
 */
export const globalBackgroundSearch = async (query: string) => {
  try {
    const response = await fetch(`${API_BASE}/global-search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return await response.json();
  } catch (error) {
    return { text: "Search offline.", sources: [] };
  }
};

/**
 * 5. LICENSING HUB: Automated Client Messaging
 */
export const generateUpdateMessage = async (auditContext: string, updateType: string) => {
  try {
    const response = await fetch(`${API_BASE}/generate-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auditContext, updateType })
    });
    const data = await response.json();
    return data.report;
  } catch (error) {
    return "Message generation failed.";
  }
};

/**
 * 6. RESOURCE LEDGER: Infrastructure Optimization
 */
export const optimizeResources = async (resourcesJson: string) => {
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

/**
 * 7. BGV VAULT: Save Record to Supabase Database
 */
export const saveAuditToVault = async (record: any) => {
  try {
    const response = await fetch(`${API_BASE}/vault`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    return await response.json();
  } catch (error) {
    console.error("Vault Save Failure:", error);
  }
};