const fs = require('fs');
const fileName = process.argv[2] || 'case_1.json';

console.log("\x1b[36m%s\x1b[0m", `>>> INITIALIZING UPLINK FOR ${fileName}...`);

setTimeout(() => {
    try {
        const data = fs.readFileSync(`./${fileName}`, 'utf8');
        const ledger = JSON.parse(data);
        console.log("---------------------------------------------------------");
        console.dir(ledger, { depth: null, colors: true });
        console.log("---------------------------------------------------------");
        if(ledger.status === 'TERMINATED') {
            console.log("\x1b[31m%s\x1b[0m", ">>> ALERT: FRAUD DETECTED. DO NOT PROCEED WITH PLACEMENT.");
        } else {
            console.log("\x1b[32m%s\x1b[0m", ">>> INTEGRITY VERIFIED. PLACEMENT SECURED.");
        }
    } catch (err) {
        console.error(">>> ERROR: LEDGER NOT FOUND.");
    }
}, 1500);