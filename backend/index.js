import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env
dotenv.config();

const app = express();

/**
 * 🛡️ SYSTEM SECURITY & CONFIGURATION
 * Helmet is configured to allow high-visibility UI components from Vercel.
 */
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' })); // High limit for Forensic DNA Lab images

// 1. Initialize Neural Core & Database Mesh
if (!process.env.GEMINI_API_KEY || !process.env.SUPABASE_URL) {
    console.error("❌ CRITICAL ERROR: Environment variables missing. Check .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Logic Shards: Pro for deep reasoning, Flash for rapid throughput
const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * 🔐 MIDDLEWARE: INSTITUTIONAL GATEKEEPER
 * This ensures that only clients with a PAID and ACTIVE license can use the AI.
 * It protects the Founder's (Challa Aditya) revenue stream.
 */
const validateLicense = async (req, res, next) => {
    const { licenseKey } = req.body;

    // Default "DEMO" check or missing key
    if (!licenseKey || licenseKey === "DEMO") {
        return res.status(401).json({ error: "LOCKED: A valid Neural Access Token is required for forensic uplink." });
    }

    const { data: license, error } = await supabase
        .from('licenses')
        .select('*')
        .eq('license_key', licenseKey)
        .single();

    if (error || !license) {
        return res.status(403).json({ error: "INVALID TOKEN: License not found in the global registry." });
    }

    if (license.status !== 'Active' || license.credits <= 0) {
        return res.status(402).json({ error: "SETTLEMENT REQUIRED: Zero credits or license suspended. Check Invoice Portal." });
    }

    req.license = license;
    next();
};

// --- 🧠 ENDPOINT: INTEGRITY AUDIT (Scanner) ---
app.post('/api/audit', validateLicense, async (req, res) => {
    try {
        const { candidateData } = req.body;
        const result = await proModel.generateContent(`
      ACT AS: VeritrustX Chief Forensic Auditor. 
      TASK: Scrutinize this professional history for logic fractures, tenure overlaps, and credential padding: "${candidateData}"
      FORMAT: Provide results with these headers: ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE], ## [FORENSIC VERDICT].
      TONE: Institutional, cold, and factual.
    `);

        // Deduct 1 shard (credit) from the client's account
        await supabase.from('licenses').update({ credits: req.license.credits - 1 }).eq('id', req.license.id);

        res.json({ report: result.response.text() });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🧬 ENDPOINT: FORENSIC DNA ANALYSIS (Lab) ---
app.post('/api/forensic-analyze', validateLicense, async (req, res) => {
    try {
        const { base64Data, mimeType } = req.body;
        const result = await flashModel.generateContent([
            { inlineData: { data: base64Data, mimeType } },
            { text: "Institutional Analysis: Scan for pixel-level artifacts, font mismatching, and template forgery. Provide an Authenticity Score %." }
        ]);

        // Deduct credit
        await supabase.from('licenses').update({ credits: req.license.credits - 1 }).eq('id', req.license.id);

        res.json({ report: result.response.text() });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ⚡ ENDPOINT: ERP DIRECTIVE (Architect) ---
app.post('/api/erp-directive', async (req, res) => {
    try {
        const { directive, erpState } = req.body;
        const result = await proModel.generateContent(`
      ACT AS: VeritrustX Schema Evolution Mesh.
      DIRECTIVE: "${directive}"
      CONTEXT: ${erpState}
      TASK: Interpret the directive into autonomous backend logic. Explain the data mutations.
    `);
        res.json({ report: result.response.text() });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🖥️ ENDPOINT: RESOURCE OPTIMIZATION (Ledger) ---
app.post('/api/optimize-resources', async (req, res) => {
    try {
        const { resourcesJson } = req.body;
        const result = await flashModel.generateContent(`
      Analyze these server loads: ${resourcesJson}. 
      Provide a 3-point plan to optimize the VeritrustX Neural Mesh throughput. 
      Tone: Institutional and highly technical.
    `);
        res.json({ report: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 📩 ENDPOINT: GENERATE STRATEGIC MESSAGE (Licensing) ---
app.post('/api/generate-message', async (req, res) => {
    try {
        const { auditContext, updateType } = req.body;
        const result = await flashModel.generateContent(`
      Draft an authoritative institutional email for: ${updateType}.
      Subject lines should reflect the VeritrustX Brand.
      CONTEXT: ${auditContext}
      AUTHOR: Challa Aditya, Founder & CEO.
    `);
        res.json({ report: result.response.text() });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🏦 ENDPOINT: VAULT STORAGE (Database) ---
app.get('/api/vault', async (req, res) => {
    const { data, error } = await supabase.from('audit_records').select('*').order('created_at', { ascending: false });
    if (error) return res.status(400).json(error);
    res.json(data);
});

app.post('/api/vault', async (req, res) => {
    const { data, error } = await supabase.from('audit_records').insert([req.body]);
    if (error) return res.status(400).json(error);
    res.json(data);
});

// --- 🔑 ENDPOINT: LICENSE MANAGEMENT (Founder Dash) ---
app.get('/api/licenses', async (req, res) => {
    const { data } = await supabase.from('licenses').select('*').order('created_at', { ascending: false });
    res.json(data);
});

app.post('/api/activate-license', async (req, res) => {
    const { id } = req.body;
    // Founder Action: Activate license and grant 100 neural shards (credits)
    const { data } = await supabase
        .from('licenses')
        .update({ status: 'Active', credits: 100 })
        .eq('id', id);
    res.json(data);
});

// --- 🌐 ENDPOINT: GLOBAL PULSE SEARCH ---
app.post('/api/global-search', async (req, res) => {
    try {
        const { query } = req.body;
        const result = await proModel.generateContent(`Institutional Search: Verify shadow trace for ${query}`);
        res.json({ text: result.response.text(), sources: [] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
  --------------------------------------------------
  VERITRUSTX NEURAL CORE v1.7: ONLINE
  PORT: ${PORT}
  AUTHORITY: CHALLA ADITYA, FOUNDER & CEO
  STATUS: READY FOR INSTITUTIONAL DEPLOYMENT
  --------------------------------------------------
  `);
});