
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

// Security & Parsing
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 1. Initialize Neural Core & Database Mesh
// Using the new SDK pattern with standard API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * -------------------------------------------------------
 * API ROUTES - VERITRUSTX INSTITUTIONAL MESH
 * -------------------------------------------------------
 */

// 1. PROXY GUARD: Biometric Uplink
app.post('/api/proxy-audit', async (req, res) => {
    try {
        const { 
            isCheatingDetected, 
            gazeDirection, 
            candidateId, 
            name, 
            role, 
            lipSyncStatus, 
            voiceIntegrity, 
            gazeViolationCount 
        } = req.body;
        
        console.log(`>>> BIOMETRIC AUDIT: ${name} [${candidateId}]`);
        console.log(`    Signals: Gaze(${gazeDirection}) | LipSync(${lipSyncStatus}) | Voice(${voiceIntegrity})`);

        // --- MULTI-FACTOR FRAUD LOGIC ---
        // We aggregate visual + audio signals to determine the final status
        const visualFraud = isCheatingDetected || gazeViolationCount > 3;
        const audioFraud = lipSyncStatus === 'DESYNC' || voiceIntegrity === 'SYNTHETIC_SUSPECT';
        
        const isCompromised = visualFraud || audioFraud;
        const status = isCompromised ? "TERMINATED" : "Verified";
        
        // Calculate dynamic score
        let trustScore = 98;
        if (visualFraud) trustScore -= 40;
        if (audioFraud) trustScore -= 45;
        if (gazeViolationCount > 0) trustScore -= (gazeViolationCount * 5);
        trustScore = Math.max(0, trustScore);

        // Build Forensic Verdict Details
        let verdictDetails = [];
        if (gazeDirection !== 'CENTER') verdictDetails.push(`Active Gaze Deviation (${gazeDirection})`);
        if (gazeViolationCount > 2) verdictDetails.push(`Frequent Focus Loss (${gazeViolationCount} events)`);
        if (lipSyncStatus === 'DESYNC') verdictDetails.push("Deepfake Lip-Sync Anomaly Detected");
        if (voiceIntegrity === 'SYNTHETIC_SUSPECT') verdictDetails.push("Synthetic/AI Voice Modulation Detected");

        const verdict = isCompromised 
            ? `IDENTITY FRACTURE: ${verdictDetails.join(', ') || 'Multi-Factor Biometric Failure'}` 
            : "IDENTITY VERIFIED: Multi-factor biometrics (Visual + Audio) grounded.";

        const recommendation = isCompromised ? "FAIL - IMMEDIATE ESCALATION" : "PROCEED";

        // Save to Vault
        const { error } = await supabase.from('audit_records').insert([{ 
            name: name || "Candidate " + (candidateId || "Unknown"), 
            role: role || "Technical Assessment", 
            status: status, 
            trustScore: trustScore, 
            report: verdict,
            identity_verified: !isCompromised,
            entity_verified: true,
            created_at: new Date().toISOString()
        }]);

        if (error) console.error("Vault Insert Error:", error);

        res.json({ 
            status, 
            score: trustScore, 
            verdict, 
            details: isCompromised ? verdictDetails.join(', ') : "Neural Mesh Integrity Confirmed.",
            recommendation
        });

    } catch (err) { 
        console.error(err);
        res.status(500).json({ error: err.message }); 
    }
});

// 2. FORENSIC LAB: Document Analysis
app.post('/api/forensic-analyze', async (req, res) => {
    try {
        const { base64Data, mimeType, companyName, candidateName } = req.body;
        console.log(`>>> FORENSIC LAB: Analyzing ${candidateName} @ ${companyName}`);

        if (!base64Data) return res.status(400).json({ error: "No pixel data received." });

        const prompt = `
            ACT AS: VeritrustX Chief Forensic Auditor. 
            CONTEXT: Verification of an Experience Letter for "${companyName}".
            TASK: 
            1. PIXEL DNA: Scan for font inconsistencies, digital signature artifacts, and stamp forgery.
            2. LOGIC CHECK: Are tenure dates and roles consistent?
            3. ENTITY SKEPTICISM: Is this a known shell entity?
            
            OUTPUT: A strict, forensic report in uppercase technical style. Start with "VERDICT: GROUNDED" or "VERDICT: FLAGGED".
        `;

        // Use new SDK with Gemini 2.5 Flash for image analysis
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: mimeType } },
                    { text: prompt }
                ]
            }
        });

        const reportText = response.text;
        const isGrounded = reportText.includes("GROUNDED") || !reportText.includes("TERMINATED");
        
        // Save to Vault
        await supabase.from('audit_records').insert([{
            name: candidateName || "Document Audit",
            role: companyName || "Exp Verification",
            status: isGrounded ? "Verified" : "Flagged",
            trustScore: isGrounded ? 94 : 22,
            report: reportText,
            entity_verified: isGrounded,
            identity_verified: true,
            created_at: new Date().toISOString()
        }]);

        res.json({ report: reportText });

    } catch (err) {
        console.error("Forensic Error:", err);
        res.status(500).json({ error: "Neural Mesh Timeout." });
    }
});

// 3. INTEGRITY SCANNER: Text Audit (Generic)
app.post('/api/audit', async (req, res) => {
    try {
        const { candidateData } = req.body;
        const prompt = `
        IDENTITY AUDIT PROTOCOL v9.0
        
        Analyze the following candidate text (Resume/CV) for FRAUDULENT PATTERNS.
        
        Look for:
        1. Timeline Fractures (Dates that don't match logic).
        2. Skill Stuffing (Keywords without context).
        3. Semantic Embellishment (Vague corporate jargon).
        
        Return a FORENSIC DOSSIER. 
        Start with a "TRUST SCORE: XX%".
        
        Profile Data: "${candidateData.substring(0, 5000)}"`;
        
        // Use new SDK with Gemini 3 Pro for complex text analysis
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt
        });

        res.json({ report: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. BGV VAULT: Fetch Ledger
app.get('/api/records', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('audit_records')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) { 
        res.status(500).json({ error: "Vault unreachable." }); 
    }
});

// 5. GLOBAL PULSE: Search Grounding
app.post('/api/global-search', async (req, res) => {
    const { query } = req.body;
    try {
        // Use Gemini 3 Pro for search tasks
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Conduct a background verification check on: ${query}. Return sources if possible.`
        });
        res.json({ text: response.text, sources: [] });
    } catch (e) {
        res.status(500).json({ error: "Pulse Offline" });
    }
});

// 6. ERP ARCHITECT: Logic Directive
app.post('/api/erp-directive', async (req, res) => {
    const { directive, erpState } = req.body;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Analyze this ERP JSON state: ${erpState}. Apply this business directive: "${directive}". Return the modified JSON or a status report.`
        });
        res.json({ report: response.text });
    } catch (e) {
        res.status(500).json({ error: "ERP Logic Failed" });
    }
});

// 7. LICENSING MESH
app.get('/api/licenses', async (req, res) => {
    try {
        const { data } = await supabase.from('licenses').select('*');
        res.json(data || []);
    } catch (e) { res.json([]); }
});

app.post('/api/activate-license', async (req, res) => {
    try {
        const { id } = req.body;
        await supabase.from('licenses').update({ status: 'Active' }).eq('id', id);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: "Activation Failed" }); }
});

// --- Server Init ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
  --------------------------------------------------
  VERITRUSTX INSTITUTIONAL HEART: ONLINE
  PORT: ${PORT}
  NEURAL MESH: CONNECTED
  --------------------------------------------------
  `);
});
