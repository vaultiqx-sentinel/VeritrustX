import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

// Security Middleware - Relaxed for local development sync
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors());
app.use(express.json({ limit: '50mb' })); // High limit for Forensic Image scanning

// 1. Initialize AI & Database
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Helper to get specific models
const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- ENDPOINT: Neural Audit (Integrity Scanner) ---
app.post('/api/audit', async (req, res) => {
  try {
    const { candidateData } = req.body;
    const result = await proModel.generateContent(`
      ACT AS: VeritrustX Forensic Auditor.
      TASK: Scrutinize the following candidate data for logic fractures, tenure overlaps, and credential padding.
      DATA: ${candidateData}
      FORMAT: Provide ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE] (as a %), and ## [FORENSIC VERDICT].
    `);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: ERP Directive (ERP Architect) ---
app.post('/api/erp-directive', async (req, res) => {
  try {
    const { directive, erpState } = req.body;
    const result = await proModel.generateContent(`
      You are the VeritrustX Autonomous Logic Mesh.
      CURRENT STATE: ${erpState}
      USER DIRECTIVE: ${directive}
      TASK: Interpret this directive. Identify which data nodes must change. 
      Predict business impact and logic conflicts.
      OUTPUT: Markdown format with [LOGIC INTERPRETATION] and [STATE TRANSFORMATIONS].
    `);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: Forensic DNA Analysis (Forensic Lab) ---
app.post('/api/forensic-analyze', async (req, res) => {
  try {
    const { base64Data, mimeType } = req.body;
    const result = await flashModel.generateContent([
      { inlineData: { data: base64Data, mimeType } },
      { text: "Examine this document for pixel-level tampering, font inconsistencies, and template violations. Provide a forensic report and an Authenticity Score %." }
    ]);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: Generate Stakeholder Message (Licensing Hub) ---
app.post('/api/generate-message', async (req, res) => {
  try {
    const { auditContext, updateType } = req.body;
    const result = await flashModel.generateContent(`
      Generate a professional, authoritative, and strategic email for ${updateType}.
      CONTEXT: ${auditContext}
      TONE: Institutional and Urgent.
    `);
    res.json({ report: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ENDPOINT: Save to Vault (Database Storage) ---
app.post('/api/vault', async (req, res) => {
  try {
    const { name, role, status, trustScore, report } = req.body;
    const { data, error } = await supabase
      .from('audit_records')
      .insert([{ name, role, status, trustScore, report }]);

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- ENDPOINT: Fetch Vault ---
app.get('/api/vault', async (req, res) => {
  try {
    const { data, error } = await supabase.from('audit_records').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// --- ENDPOINT: Global Search (Pulse) ---
app.post('/api/global-search', async (req, res) => {
  try {
    const { query } = req.body;
    // Grounding note: To use real Google Search grounding, you'd enable the search tool here.
    const result = await proModel.generateContent(`Verify professional claims for: ${query}. Search for 'Shadow Traces' and institutional overlaps.`);
    res.json({ text: result.response.text(), sources: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  -----------------------------------------
  VERITRUSTX NEURAL CORE: ONLINE
  PORT: ${PORT}
  SERVICES: AUDIT, ERP, LAB, VAULT, PULSE
  -----------------------------------------
  `);
});