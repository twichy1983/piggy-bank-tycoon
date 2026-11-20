// Builds test.html: a copy of index.html where everything costs $0.
// It uses its own save, so playing it never touches the real game's save.
// Run again after changing index.html:   node tools/build-test.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
let s = fs.readFileSync(path.join(root, "index.html"), "utf8");

function rep(from, to){
  if (s.split(from).length !== 2) throw new Error("Couldn't find exactly one of: " + from);
  s = s.replace(from, () => to);
}

rep(`<title>Piggy Bank Tycoon</title>`, `<title>Piggy Bank Tycoon (TEST: everything free)</title>`);
rep(`<body>`, `<body>
<div style="position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:9999;background:#ff3b6b;color:#fff;font-weight:900;padding:4px 14px;border-radius:0 0 10px 10px;box-shadow:0 3px 0 #000;pointer-events:none">🧪 TEST VERSION: everything costs $0</div>`);

// Separate save, and don't pull in the real game's saves (or the older ones) either.
// (Keeps reading the test save from before the rename, so your test progress stays.)
rep(`const SAVE_KEY = "piggyBankTycoon.v1";`, `const SAVE_KEY = "piggyBankTycoon.test";`);
rep(`const COIN_SAVE_KEY = "coinClicker.v2";`, `const COIN_SAVE_KEY = "coinClicker.test";`);
rep(`const OLD_SAVE_KEY = "coinClicker";`, `const OLD_SAVE_KEY = "piggyBankTycoon.test.none";`);

// Properties, helpers and firing are free
rep(`function buildingCost(i, n){`, `function buildingCost(i, n){ return 0;`);
rep(`const timerHelpCost = () =>`, `const timerHelpCost = () => 0 * `);
rep(`const nerdHelpCost  = () =>`, `const nerdHelpCost  = () => 0 * `);
rep(`const timerFireCost = () =>`, `const timerFireCost = () => 0 * `);
rep(`const nerdFireCost  = () =>`, `const nerdFireCost  = () => 0 * `);

// Upgrades and glow-ups are free, and click upgrades show up right away
rep(`const UPG_BY_ID =`, `UPGRADES.forEach(u => { u.cost = 0; if (u.type === "click") u.unlockAt = 0; });
const UPG_BY_ID =`);

fs.writeFileSync(path.join(root, "test.html"), s);
console.log("Wrote test.html");
