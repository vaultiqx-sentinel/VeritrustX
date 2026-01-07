const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- 1. PROXY GUARD: BIOMETRIC AUDIT (NEW & INTEGRATED) ---
// This handles the real-time eye tracking and saves it to Supabase
app.post('/api/proxy-audit', async (req, res) => {
    try {
        const { isCheatingDetected, gazeDirection, candidateId, name, role } = req.body;

        // 1. Calculate the Forensic Score
        const status = isCheatingDetected ? "TERMINATED" : "GROUNDED";
        const trustScore = isCheatingDetected ? 15 : 98; // Low score if cheating
        const verdict = isCheatingDetected 
            ? `IDENTITY FRACTURE: Gaze shifted ${gazeDirection}. Shadow AI suspected.` 
            : "IDENTITY VERIFIED: Biometric continuity stable.";

        // 2. SAVE TO SUPABASE (The Memory)
        const { data, error } = await supabase
            .from('audit_records')
            .insert([{ 
                name: name || "Candidate " + candidateId, 
                role: role || "Technical Assessment", 
                status: status, 
                trustScore: trustScore, 
                report: verdict,
                photoUrl: "" // You can add a snapshot URL here later
            }]);

        if (error) throw error;

        // 3. RESPOND TO FRONTEND
        res.json({
            status,
            verdict,
            score: trustScore,
            details: isCheatingDetected ? `Anomalous eye movement detected toward ${gazeDirection}.` : "No anomalies detected.",
            recommendation: isCheatingDetected ? "REJECT PLACEMENT" : "PROCEED WITH HIRING"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 2. EXISTING: NEURAL AUDIT (Gemini Text Analysis) ---
app.post('/api/audit', async (req, res) => {
    try {
        const { candidateData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `Perform a Forensic Scrutiny Audit on: "${candidateData}". Provide headers: ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE], ## [FORENSIC VERDICT].`;
        const result = await model.generateContent(prompt);
        res.json({ report: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 3. EXISTING: FORENSIC IMAGE ANALYSIS ---
app.post('/api/forensic-analyze', async (req, res) => {
    try {
        const { base64Data, mimeType } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            { inlineData: { data: base64Data, mimeType } },
            { text: "Examine this document for pixel-level artifacts and template violations." }
        ]);
        res.json({ report: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 4. EXISTING: DATABASE FETCH ---
app.get('/api/records', async (req, res) => {
    const { data, error } = await supabase
        .from('audit_records')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) return res.status(400).json(error);
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`VeritrustX Backend Online on Port ${PORT}`));