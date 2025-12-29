const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Higher limit for Forensic Lab images

// Initialize Supabase (Database & Storage)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- 1. NEURAL AUDIT ENDPOINT ---
app.post('/api/audit', async (req, res) => {
    try {
        const { candidateData } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        const prompt = `Perform a Forensic Scrutiny Audit on: "${candidateData}". 
        Provide headers: ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE], ## [FORENSIC VERDICT].`;

        const result = await model.generateContent(prompt);
        const report = result.response.text();

        res.json({ report });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 2. FORENSIC IMAGE ANALYSIS ---
app.post('/api/forensic-analyze', async (req, res) => {
    try {
        const { base64Data, mimeType } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([
            { inlineData: { data: base64Data, mimeType } },
            { text: "Examine this document for pixel-level artifacts, font mismatches, and template violations. Provide a detailed forensic report." }
        ]);

        res.json({ report: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 3. DATABASE: FETCH ALL RECORDS (The Vault) ---
app.get('/api/records', async (req, res) => {
    const { data, error } = await supabase
        .from('audit_records')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json(error);
    res.json(data);
});

// --- 4. DATABASE: SAVE NEW RECORD ---
app.post('/api/records', async (req, res) => {
    const { name, role, status, trustScore, report, photoUrl } = req.body;
    const { data, error } = await supabase
        .from('audit_records')
        .insert([{ name, role, status, trustScore, report, photoUrl }]);

    if (error) return res.status(400).json(error);
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`VeritrustX Backend Online on Port ${PORT}`));