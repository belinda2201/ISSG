const crypto = require("crypto");
const https = require("https");

const target = "578ed5a4eecf5a15803abdc49f6152d6";
const url = "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt";

function dictionaryAttack() {
  https.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const passwords = data.split("\n");

      for (let password of passwords) {
        const trimmedPassword = password.trim(); 
        const hash = crypto.createHash("md5").update(trimmedPassword).digest("hex"); 

        if (hash === target) {
          console.log(`Password found: ${trimmedPassword}`);
          return;
        }
      }
      console.log("Password not found in the list.");
    });
  }).on("error", (err) => {
    console.error(`Error fetching password list: ${err.message}`);
  });
}

dictionaryAttack();
