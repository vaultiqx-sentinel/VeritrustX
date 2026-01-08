const pptxgen = require("pptxgenjs");

let pres = new pptxgen();

// --- BRAND CONFIGURATION ---
const COLORS = {
    ONYX: "09090b",    // Background
    EMERALD: "10b981", // Accent Green
    INDIGO: "6366f1",  // Accent Blue
    SLATE: "71717a",   // Subtext
    WHITE: "FFFFFF"    // Primary Text
};

// Define Master Slide Layouts
pres.defineSlideMaster({
    title: "INSTITUTIONAL_MASTER",
    background: { color: COLORS.ONYX },
    objects: [
        { rect: { x: 0, y: 0, w: "100%", h: 0.1, fill: { color: COLORS.EMERALD } } },
        { text: { text: "VeriTrustX Protocol | Confidential | 2026", options: { x: 0.5, y: 7.2, w: 5, fontSize: 8, color: COLORS.SLATE } } }
    ]
});

// --- SLIDE 1: THE HERO (Institutional Title) ---
let s1 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s1.addText("VERITRUSTX", { x: 0.5, y: 2.5, w: 9, fontSize: 54, bold: true, color: COLORS.EMERALD, fontFace: "Arial Black", tracking: 10 });
s1.addText("Securing the Human Perimeter", { x: 0.5, y: 3.4, w: 9, fontSize: 24, color: COLORS.WHITE });
s1.addShape(pres.ShapeType.rect, { x: 0.5, y: 4.2, w: 1.5, h: 0.05, fill: { color: COLORS.EMERALD } });
s1.addText("Professional Identity Grounding for High-Stakes Environments\nFounder: Challa Aditya", { x: 0.5, y: 5.0, w: 9, fontSize: 12, color: COLORS.SLATE });

// --- SLIDE 2: THE INF0SEC CHALLENGE ---
let s2 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s2.addText("The $1B Crisis: Identity Hijacking", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });
s2.addText("The point of recruitment is the most vulnerable entry point in the modern firewall.", { x: 0.5, y: 1.0, fontSize: 14, color: COLORS.WHITE, italic: true });

let crisisBox = [
    { text: "AI-Voice Overlays & Deepfakes: Standard proctoring is now obsolete.", options: { bullet: true, fontSize: 18, color: COLORS.WHITE, margin: [10, 0, 0, 0] } },
    { text: "Ghost Hires: Unverified access granted to shell-identities at intake.", options: { bullet: true, fontSize: 18, color: COLORS.WHITE } },
    { text: "Commission Risk: Billions lost to bad-faith placement liabilities.", options: { bullet: true, fontSize: 18, color: COLORS.WHITE } }
];
s2.addText(crisisBox, { x: 0.5, y: 2.2, w: 9, h: 3 });
s2.addShape(pres.ShapeType.rect, { x: 0.5, y: 5.5, w: 9, h: 1.2, fill: { color: "1a1a1a" }, line: { color: "333333", width: 1 } });
s2.addText("CISO ALERT: An unverified hire is a Zero-Day vulnerability inside your perimeter.", { x: 0.7, y: 5.8, w: 8.5, fontSize: 16, bold: true, color: "FF3B30", align: "center" });

// --- SLIDE 3: THE TRINITY OF TRUST ---
let s3 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s3.addText("The Trinity of Trust Model", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });

const trinity = [
    { name: "CANDIDATE GENUINENESS", desc: "Real-time Biometric & Behavioral Tracking (Proxy Guard)" },
    { name: "DOCUMENT GENUINENESS", desc: "Pixel DNA Autopsy of Experience Credentials (Forensic Lab)" },
    { name: "ENTITY GENUINENESS", desc: "Verification of Issuing Authorities & Shell Firms (Anti-Fraud)" }
];

trinity.forEach((item, idx) => {
    let posY = 1.8 + (idx * 1.5);
    s3.addShape(pres.ShapeType.rect, { x: 0.5, y: posY, w: 0.1, h: 1.0, fill: { color: COLORS.INDIGO } });
    s3.addText(item.name, { x: 0.7, y: posY, fontSize: 18, bold: true, color: COLORS.WHITE });
    s3.addText(item.desc, { x: 0.7, y: posY + 0.4, fontSize: 14, color: COLORS.SLATE });
});

// --- SLIDE 4: THE NEURAL VERIFICATION MESH ---
let s4 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s4.addText("Forensic Logic: Neural Mesh Architecture", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });

s4.addText([
    { text: "Behavioral Latency:", options: { bold: true, color: COLORS.WHITE } },
    { text: " Measuring retrieval vs. thinking gaps to catch AI-aided candidates.\n", options: { color: COLORS.SLATE } },
    { text: "Keystroke Biometry:", options: { bold: true, color: COLORS.WHITE } },
    { text: " Analyzing 'Typing DNA' to detect mechanical input signatures.\n", options: { color: COLORS.SLATE } },
    { text: "Focal Drift Analysis:", options: { bold: true, color: COLORS.WHITE } },
    { text: " Detecting secondary device usage through gaze tracking.", options: { color: COLORS.SLATE } }
], { x: 0.5, y: 1.8, w: 8, fontSize: 18 });

// --- SLIDE 5: COMPLIANCE & THE VAULT ---
let s5 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s5.addText("The BGV Vault: Immutable Proof", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });
s5.addText("Every audit is metadata-tagged and anchored in a non-repudiable ledger.", { x: 0.5, y: 1.0, fontSize: 14, color: COLORS.SLATE });

s5.addText([
    { text: "• SOC2 & GDPR Compliant biometric processing.\n", options: { bullet: true, fontSize: 18, color: COLORS.WHITE } },
    { text: "• Exportable Forensic Dossiers for client-side assurance.\n", options: { bullet: true, fontSize: 18, color: COLORS.WHITE } },
    { text: "• Instant API Uplink for firm-wide integration (IAM/ATS).", options: { bullet: true, fontSize: 18, color: COLORS.WHITE } }
], { x: 0.5, y: 2.5, w: 9 });

// --- SLIDE 6: THE SUCCESS-BASED PILOT ---
let s6 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s6.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: "111113" } });
s6.addText("Institutional Uplink: The Pilot", { x: 0.5, y: 1.5, w: 9, fontSize: 36, bold: true, color: COLORS.EMERALD, align: "center" });
s6.addText("0% Financial Risk. 100% Truth.", { x: 0.5, y: 2.3, w: 9, fontSize: 20, color: COLORS.WHITE, align: "center" });
s6.addText("Identify one high-stakes senior role. Let us ground the identity.\nCompare VeriTrustX results against any traditional BGV provider.", { x: 0.5, y: 3.5, w: 9, fontSize: 16, color: COLORS.SLATE, align: "center" });

s6.addText("DEPLOY UPLINK: VERITRUSTX.COM", { x: 0.5, y: 5.5, w: 9, fontSize: 24, bold: true, color: COLORS.WHITE, align: "center", fill: { color: COLORS.INDIGO } });

// Save the Presentation
pres.writeFile({ fileName: "VeriTrustX_Strategic_Deck_2026.pptx" })
    .then(fileName => console.log(`\n\x1b[32m>>> INSTITUTIONAL DECK GENERATED: ${fileName}\x1b[0m\n`))
    .catch(err => console.error("Generation Fault:", err));