// scripts/flatten-icons.js
const sharp = require("sharp");
const path = require("path");

const BG = "#0e0c26";
const icons = [
    "icon-192.png",
    "icon-512.png",
    "icon-512-maskable.png",
];

(async () => {
    for (const icon of icons) {
        const filePath = path.join("public/pwa", icon);
        const buffer = await sharp(filePath)
            .flatten({ background: BG })
            .png()
            .toBuffer();
        await sharp(buffer).toFile(filePath);
        console.log(`Flattened ${icon} with ${BG}`);
    } ``
})();