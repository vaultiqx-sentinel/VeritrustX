import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to get model
const getProModel = () => genAI.getGenerativeModel({ 
    model: "gemini-1.5-pro",
    generationConfig: { maxOutputTokens: 2000 }
});

// 1. ERP Directive Endpoint
app.post('/api/erp-directive', async (req, res) => {
  try {
    const { directive, erpState } = req.body;
    const result = await getProModel().generateContent(`
      You are the ERP Intelligent Logic Engine.
      STATE: ${erpState}
      DIRECTIVE: ${directive}
      Task: Propose a logic path and budget impact.
    `);
    res.json({ report: result.response.text() });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 2. Audit Endpoint
app.post('/api/audit', async (req, res) => {
  try {
    const { candidateData } = req.body;
    const result = await getProModel().generateContent(`
      Perform a Forensic Scrutiny Audit: "${candidateData}".
      Provide: ## [ANOMALY DETECTION], ## [CONFIDENCE SCORE], ## [FORENSIC VERDICT].
    `);
    res.json({ report: result.response.text() });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 3. Forensic Image Analysis
app.post('/api/forensic-analyze', async (req, res) => {
  try {
    const { base64Data, mimeType } = req.body;
    const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent([
      { inlineData: { data: base64Data, mimeType } },
      { text: "Detect pixel-level artifacts and document template violations." }
    ]);
    res.json({ report: result.response.text() });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 4. Global Search (Grounded) - Note: Grounding requires specific API permissions
app.post('/api/global-search', async (req, res) => {
  try {
    const { query } = req.body;
    const result = await getProModel().generateContent(`Search for shadow evidence for: ${query}`);
    res.json({ text: result.response.text(), sources: [] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 5. Generate Stakeholder Message
app.post('/api/generate-message', async (req, res) => {
    try {
      const { auditContext, updateType } = req.body;
      const result = await getProModel().generateContent(`Generate a professional ${updateType} message for: ${auditContext}`);
      res.json({ report: result.response.text() });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 6. Optimize Resources
app.post('/api/optimize-resources', async (req, res) => {
    try {
      const { resourcesJson } = req.body;
      const result = await getProModel().generateContent(`Analyze these resources and provide 3 efficiency improvements: ${resourcesJson}`);
      res.json({ report: result.response.text() });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = 5000;
app.listen(PORT, () => console.log(">>> NEURAL CORE EXPANDED: ALL ENDPOINTS ACTIVE ON PORT 5000"));