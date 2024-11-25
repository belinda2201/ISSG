const crypto = require("crypto");
const target = "5531a5834816222280f20d1ef9e95f69";

function decryptPin() {
    for (let pin = 0; pin <= 9999; pin++) {
        const targetPIN = String(pin).padStart(4, "0");
        const hash = crypto.createHash("md5").update(targetPIN).digest("hex");

        if (hash === target) {
            console.log(`PIN Alice: ${targetPIN}`);
            return targetPIN;
        }
    }
}

decryptPin();