import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();

// Security: Allow Frontend connection and disable CSP for high-visibility UI
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 1. Initialize Neural Core & Database
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * 🛡️ MIDDLEWARE: LICENSE GATEKEEPER
 * Ensures the client has a valid, active license with remaining credits.
 */
const validateLicense = async (req, res, next) => {
  const { licenseKey } = req.body;
  if (!licenseKey || licenseKey === "DEMO") {
    return res.status(401).json({ error: "LOCKED: A valid Neural Access Token is required." });
  }

  const { data: license, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('license_key', licenseKey)
    .single();

  if (error || !license) {
    return res.status(403).json({ error: "INVALID TOKEN: License not found in Registry." });
  }

  if (license.status !== 'Active' || license.credits <= 0) {
    return res.status(402).json({ error: "SETTLEMENT REQUIRED: 0 Credits or Suspended Status." });
  }

  req.license = license; // Pass license data to the next function
  next();
};

// --- ENDPOINT: Neural Audit (Scanner) ---
app.post('/api/audit', validateLicense, async (req, res) => {
  try {
    const { candidateData } = req.body;
    const result = await proModel.generateContent(`
      ACT AS: VeritrustX Forensic Auditor.
      TASK: Scrutinize this data for logic fractures and tenure inconsistencies: ${candidateData}
      FORMAT: ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE], ## [FORENSIC VERDICT].
    `);
    
    // Deduct 1 credit from the client after a successful scan
    await supabase.from('licenses').update({ credits: req.license.credits - 1 }).eq('id', req.license.id);
    
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: ERP Directive (Architect) ---
app.post('/api/erp-directive', async (req, res) => {
  try {
    const { directive, erpState } = req.body;
    const result = await proModel.generateContent(`
      You are the VeritrustX Autonomous Logic Mesh.
      Interpret this business logic change for Schema Evolution: ${directive}
      Current State: ${erpState}
    `);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: Forensic Image Analysis (Lab) ---
app.post('/api/forensic-analyze', validateLicense, async (req, res) => {
  try {
    const { base64Data, mimeType } = req.body;
    const result = await flashModel.generateContent([
      { inlineData: { data: base64Data, mimeType } },
      { text: "Examine for pixel tampering and template violations. Return Forensic Authenticity Score %." }
    ]);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: Database Sync (Vault) ---
app.get('/api/vault', async (req, res) => {
  const { data } = await supabase.from('audit_records').select('*').order('created_at', { ascending: false });
  res.json(data);
});

app.post('/api/vault', async (req, res) => {
  const { data } = await supabase.from('audit_records').insert([req.body]);
  res.json(data);
});

// --- ENDPOINT: Founder License Management ---
app.get('/api/licenses', async (req, res) => {
  const { data } = await supabase.from('licenses').select('*').order('created_at', { ascending: false });
  res.json(data);
});

app.post('/api/activate-license', async (req, res) => {
  const { id, creditsToGrant } = req.body;
  const { data } = await supabase
    .from('licenses')
    .update({ status: 'Active', credits: creditsToGrant || 100 })
    .eq('id', id);
  res.json(data);
});

// --- ENDPOINT: Global Search (Pulse) ---
app.post('/api/global-search', async (req, res) => {
  try {
    const { query } = req.body;
    const result = await proModel.generateContent(`Search shadow evidence for: ${query}`);
    res.json({ text: result.response.text(), sources: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`>>> VERITRUSTX NEURAL CORE v1.5 ACTIVE`));