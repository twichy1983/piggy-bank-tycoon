// Packs the pictures in img/ into art.js, so the game works when you just
// double-click index.html (browsers won't let a page read the pixels of
// separate image files opened that way). Run after changing a picture:
//   node tools/build-art.js
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const pics = { lawn: "lawn.webp", roomClean: "room-clean.webp", roomMessy: "room-messy.webp", paper: "paper-route.webp" };
let out = "// Made by tools/build-art.js from the pictures in img/. Don't edit by hand.\nconst ART = {\n";
for (const [key, file] of Object.entries(pics)) {
  const b64 = fs.readFileSync(path.join(root, "img", file)).toString("base64");
  out += `  ${key}: "data:image/webp;base64,${b64}",\n`;
}
fs.writeFileSync(path.join(root, "art.js"), out + "};\n");
console.log("wrote art.js");
