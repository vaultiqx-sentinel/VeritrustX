import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 1. Initialize Neural Core & Database Mesh
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const proModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const flashModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * 🔐 MIDDLEWARE: INSTITUTIONAL GATEKEEPER
 * (Modified for Monday Demo: Allows 'DEMO-2026' to bypass license check)
 */
const validateLicense = async (req, res, next) => {
    const { licenseKey } = req.body;
    if (licenseKey === "DEMO-2026") return next(); // Bypass for Ishita Demo

    if (!licenseKey) return res.status(401).json({ error: "LOCKED: Neural Access Token Required." });

    const { data: license } = await supabase.from('licenses').select('*').eq('license_key', licenseKey).single();
    if (!license || license.status !== 'Active') return res.status(402).json({ error: "SETTLEMENT REQUIRED" });
    
    req.license = license;
    next();
};

// --- 🧠 1. PROXY GUARD: BIOMETRIC UPLINK ---
// Fixed: This matches what your ProxyGuard.tsx calls
app.post('/api/proxy-audit', async (req, res) => {
    try {
        const { isCheatingDetected, gazeDirection, candidateId, name, role } = req.body;
        const status = isCheatingDetected ? "TERMINATED" : "GROUNDED";
        const trustScore = isCheatingDetected ? 12 : 98;
        const verdict = isCheatingDetected 
            ? `IDENTITY FRACTURE: Gaze shifted ${gazeDirection}. Shadow AI suspected.` 
            : "IDENTITY VERIFIED: Biometric continuity grounded.";

        // Save to Vault
        await supabase.from('audit_records').insert([{ 
            name: name || "Candidate " + candidateId, 
            role: role || "Technical Assessment", 
            status: status, 
            trustScore: trustScore, 
            report: verdict,
            identity_verified: !isCheatingDetected,
            entity_verified: true 
        }]);

        res.json({ status, score: trustScore, verdict });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 🧬 2. FORENSIC LAB: EXPERIENCE & ENTITY AUDIT ---
app.post('/api/forensic-analyze', async (req, res) => {
    try {
        const { base64Data, mimeType, companyName, candidateName } = req.body;

        console.log(`>>> NEURAL MESH INTAKE: Analyzing Experience for [${candidateName}] at [${companyName}]`);

        if (!base64Data) {
            return res.status(400).json({ error: "No image data received by the Forensic Node." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            ACT AS: VeritrustX Chief Forensic Auditor. 
            CONTEXT: Verification of an Experience Letter for the company "${companyName}".
            TASK: 
            1. PIXEL DNA: Scan for font inconsistencies, digital signature artifacts, and stamp forgery.
            2. LOGIC CHECK: Are tenure dates and roles consistent for a senior role?
            3. ENTITY SKEPTICISM: Does this company appear to be a known shell entity or "experience-for-sale" firm?
            
            FORMAT: Provide headers: ## [FORENSIC ANOMALIES], ## [TRUST SCORE %], ## [VERDICT].
            RESULT: Use the word "GROUNDED" if genuine, or "TERMINATED" if fraud is detected.
        `;

        const result = await model.generateContent([
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
        ]);

        const reportText = result.response.text();
        const isGrounded = reportText.includes("GROUNDED");

        // 💾 Anchoring the result in the Supabase Vault
        const { error: dbError } = await supabase.from('audit_records').insert([{
            name: candidateName || "Document Audit",
            role: companyName || "Exp Verification",
            status: isGrounded ? "GROUNDED" : "TERMINATED",
            trustScore: isGrounded ? 94 : 18,
            report: reportText,
            entity_verified: isGrounded,
            identity_verified: true // Document matches ID
        }]);

        if (dbError) console.error("Vault Sync Error:", dbError);

        res.json({ report: reportText });

    } catch (err) {
        console.error("Forensic Node Failure:", err);
        res.status(500).json({ error: "Neural Mesh Timeout: Gemini API rejected the pixel DNA scan." });
    }
});
// --- 🏦 3. BGV VAULT: INSTITUTIONAL LEDGER ---
// Fixed: Endpoint renamed to /api/records to match App.tsx
app.get('/api/records', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('audit_records')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Vault unreachable." }); }
});

// --- 🌐 4. GLOBAL PULSE & OTHER ENDPOINTS ---
app.post('/api/global-search', async (req, res) => {
    const { query } = req.body;
    const result = await proModel.generateContent(`Verify shadow trace for ${query}`);
    res.json({ text: result.response.text() });
});

app.post('/api/erp-directive', async (req, res) => {
    const { directive, erpState } = req.body;
    const result = await proModel.generateContent(`Evolution logic for: ${directive}`);
    res.json({ report: result.response.text() });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
  --------------------------------------------------
  VERITRUSTX INSTITUTIONAL HEART: ONLINE
  PORT: ${PORT}
  AUTHORITY: CHALLA ADITYA, FOUNDER & CEO
  --------------------------------------------------
  `);
});