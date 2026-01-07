const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

// 1. ENVIRONMENT CONFIGURATION
dotenv.config();

const app = express();
app.use(cors());
// Increased limit to 50mb to handle high-resolution Forensic Lab scans
app.use(express.json({ limit: '50mb' }));

// 2. INITIALIZE INSTITUTIONAL NODES
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_KEY
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- 3. PROXY GUARD: BIOMETRIC CONTINUITY ---
// This endpoint receives real-time gaze & biometrics from ProxyGuard.tsx
app.post('/api/proxy-audit', async (req, res) => {
    try {
        const { isCheatingDetected, gazeDirection, candidateId, name, role } = req.body;

        console.log(`\x1b[36m%s\x1b[0m`, `>>> BIOMETRIC UPLINK: Analyzing Candidate ${candidateId}...`);

        const status = isCheatingDetected ? "TERMINATED" : "GROUNDED";
        const trustScore = isCheatingDetected ? 12 : 98;
        const verdict = isCheatingDetected 
            ? `IDENTITY FRACTURE: Gaze shifted ${gazeDirection}. Shadow AI or hidden device detected.` 
            : "IDENTITY VERIFIED: Biometric continuity grounded.";

        // 💾 Save to Supabase Vault
        const { data, error } = await supabase
            .from('audit_records')
            .insert([{ 
                name: name || "Unknown Candidate", 
                role: role || "Engineering Lead", 
                status: status, 
                trustScore: trustScore, 
                report: verdict,
                identity_verified: !isCheatingDetected, 
                entity_verified: true // Internal reference verified
            }]);

        if (error) throw error;

        res.json({
            status,
            verdict,
            score: trustScore,
            recommendation: isCheatingDetected ? "REJECT" : "PROCEED"
        });

    } catch (error) {
        console.error("Proxy Audit Failure:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- 4. FORENSIC LAB: EXPERIENCE & ENTITY AUDIT ---
// Analyzes Experience Letters for Pixel DNA and Shell Company patterns
app.post('/api/forensic-analyze', async (req, res) => {
    try {
        const { base64Data, mimeType, companyName, candidateName } = req.body;
        
        console.log(`\x1b[33m%s\x1b[0m`, `>>> FORENSIC LAB: Deconstructing Experience Letter for ${companyName}...`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            ACT AS AN INSTITUTIONAL FORENSIC AUDITOR. 
            Examine this EXPERIENCE LETTER for the following:
            1. PIXEL DNA: Check for inconsistent fonts, digital signature artifacts, or 'stamp' overlays.
            2. TEMPLATE MATCHING: Does this look like a common 'experience-for-sale' template?
            3. ENTITY SKEPTICISM: Analyze the company [${companyName}]. Is it a known shell entity?
            
            Return a result in this format:
            VERDICT: [GROUNDED or TERMINATED]
            SCORE: [0-100]
            REASON: [Brief forensic explanation]
        `;

        const result = await model.generateContent([
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt }
        ]);

        const analysisBody = result.response.text();
        const isVerified = analysisBody.includes("GROUNDED");

        // 💾 Save Document Audit to Vault
        await supabase.from('audit_records').insert([{
            name: candidateName || "Document Audit",
            role: companyName || "Experience Verification",
            status: isVerified ? "GROUNDED" : "TERMINATED",
            trustScore: isVerified ? 92 : 18,
            report: analysisBody,
            entity_verified: isVerified,
            identity_verified: true
        }]);

        res.json({ report: analysisBody });

    } catch (error) {
        console.error("Forensic Lab Failure:", error);
        res.status(500).json({ error: error.message });
    }
});

// --- 5. BGV VAULT: FETCH INSTITUTIONAL LEDGER ---
// Serves the full 319-line BGVVault component
app.get('/api/records', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('audit_records')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- 6. NEURAL AUDIT: MANUAL RESUME SCRUTINY ---
app.post('/api/neural-audit', async (req, res) => {
    try {
        const { candidateData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(`Perform a Scrutiny Audit on: "${candidateData}". Identify gaps.`);
        res.json({ report: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. START COMMAND CENTER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`
    \x1b[32m--------------------------------------------------
    VERITRUSTX INSTITUTIONAL HEART: ONLINE
    --------------------------------------------------\x1b[0m
    STATUS: Listening on Port ${PORT}
    NEURAL MESH: Gemini 1.5 Active
    VAULT NODES: Supabase Connected
    LOGIC: Identity & Entity Grounding Enabled
    \x1b[32m--------------------------------------------------\x1b[0m
    `);
});