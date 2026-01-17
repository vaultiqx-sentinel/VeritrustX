const pptxgen = require("pptxgenjs");
let pres = new pptxgen();

const COLORS = { ONYX: "09090b", EMERALD: "10b981", INDIGO: "6366f1", SLATE: "71717a", WHITE: "FFFFFF" };

pres.defineSlideMaster({
    title: "INSTITUTIONAL_MASTER",
    background: { color: COLORS.ONYX },
    objects: [
        { rect: { x: 0, y: 0, w: "100%", h: 0.1, fill: { color: COLORS.EMERALD } } },
        { text: { text: "VeriTrustX Protocol | Confidential | 2026", options: { x: 0.5, y: 7.2, w: 5, fontSize: 8, color: COLORS.SLATE } } }
    ]
});

// --- SLIDE 1: TITLE ---
let s1 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s1.addText("VERITRUSTX", { x: 0.5, y: 2.5, w: 9, fontSize: 54, bold: true, color: COLORS.EMERALD, fontFace: "Arial Black", tracking: 10 });
s1.addText("Securing the Human Perimeter", { x: 0.5, y: 3.4, w: 9, fontSize: 24, color: COLORS.WHITE });
s1.addText("Founder: Challa Aditya", { x: 0.5, y: 5.0, w: 9, fontSize: 12, color: COLORS.SLATE });

// --- NEW SLIDE 2: ABOUT US (The Mission) ---
let s2 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s2.addText("About Us: The Architects of Truth", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });
s2.addText("VeriTrustX was engineered to solve the \$50B global crisis in identity hijacking and professional fraud.", { x: 0.5, y: 1.2, w: 9, fontSize: 16, color: COLORS.WHITE });
s2.addText([
    { text: "Our Founder:", options: { bold: true, color: COLORS.EMERALD } },
    { text: " Challa Aditya, a technologist driven by the philosophy of Zero Trust. After witnessing the collapse of traditional background checks in the AI era, he engineered the Neural Verification Mesh.\n\n", options: { color: COLORS.WHITE } },
    { text: "Our Philosophy:", options: { bold: true, color: COLORS.EMERALD } },
    { text: " We believe that professional identity should not be a 'claim'—it should be an immutable, non-repudiable code anchored in digital reality.", options: { color: COLORS.WHITE } }
], { x: 0.5, y: 2.5, w: 9, fontSize: 18 });

// --- NEW SLIDE 3: OUR SERVICES (Solution Suite) ---
let s3 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s3.addText("Institutional Service Suite", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });
const services = [
    { t: "Identity Grounding", d: "Real-time biometric & eye-tracking during technical evaluations." },
    { t: "Experience DNA Autopsy", d: "Pixel-level document forensic scans to catch forged certificates." },
    { t: "Entity Genuineness Audit", d: "Global verification of issuing companies to eliminate shell-firm fraud." },
    { t: "Institutional Vaulting", d: "Immutable audit trails for SOC2 and ISO compliance reporting." }
];
services.forEach((sv, i) => {
    s3.addText(sv.t, { x: 0.8, y: 1.8 + (i * 1.2), fontSize: 20, bold: true, color: COLORS.WHITE });
    s3.addText(sv.d, { x: 0.8, y: 2.2 + (i * 1.2), fontSize: 14, color: COLORS.SLATE });
});

// --- NEW SLIDE 4: OUR TESTING APPROACH (The Forensic Loop) ---
let s4 = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
s4.addText("Methodology: The 4-Vector Scrutiny", { x: 0.5, y: 0.5, fontSize: 28, bold: true, color: COLORS.EMERALD });
s4.addText("Our testing approach bypasses standard 'proctoring' to perform a behavioral autopsy.", { x: 0.5, y: 1.0, fontSize: 14, color: COLORS.SLATE });

const vectors = [
    { v: "Vector 01: Behavioral Latency", d: "Measuring the ms delay between question and response to detect AI-retrieval patterns." },
    { v: "Vector 02: Hardware-Software Sync", d: "Cross-referencing camera metadata and browser signatures to detect deepfake overlays." },
    { v: "Vector 03: Pixel Archeology", d: "Scanning document fibers for font mismatch, digital stamp artifacts, and template reuse." },
    { v: "Vector 04: Continuous Bio-Lock", d: "Real-time face-mesh tracking to ensure the person sitting the test is the one who joins Day 1." }
];
vectors.forEach((v, i) => {
    let xPos = i % 2 === 0 ? 0.5 : 5.0;
    let yPos = i < 2 ? 2.2 : 4.5;
    s4.addShape(pres.ShapeType.rect, { x: xPos, y: yPos, w: 4.2, h: 1.5, fill: { color: "1a1a1a" }, line: { color: COLORS.INDIGO, width: 1 } });
    s4.addText(v.v, { x: xPos + 0.2, y: yPos + 0.2, w: 3.8, fontSize: 14, bold: true, color: COLORS.EMERALD });
    s4.addText(v.d, { x: xPos + 0.2, y: yPos + 0.6, w: 3.8, fontSize: 11, color: COLORS.WHITE });
});

// --- REMAINING STRATEGIC SLIDES ---
// (Slide 5-10: Problem, Neural Mesh, Vault, ROI, Pilot)
// ... [Including previous logic here] ...
let sEnd = pres.addSlide({ masterName: "INSTITUTIONAL_MASTER" });
sEnd.addText("DEPLOY UPLINK: VERITRUSTX.COM", { x: 0.5, y: 3.5, w: 9, fontSize: 32, bold: true, color: COLORS.WHITE, align: "center", fill: { color: COLORS.INDIGO } });

pres.writeFile({ fileName: "VeriTrustX_Master_Institutional_Deck.pptx" })
    .then(fn => console.log(`>>> MASTER DECK GENERATED: ${fn}`));