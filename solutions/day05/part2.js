const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8")
    .slice(0, -1);

let minLength = Infinity;
for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    const polymer = input.replace(new RegExp(`
        ${String.fromCharCode(i)}|${String.fromCharCode(i).toUpperCase()}`, "gi"), "").split("");
    let reacted;
    do {
        reacted = false;
        for (let j = polymer.length - 1; j >= 0; j--) {
            if (polymer[j + 1] && polymer[j].toUpperCase() === polymer[j + 1].toUpperCase() && polymer[j] !== polymer[j + 1]) {
                polymer.splice(j, 2);
                reacted = true;
            }
        }
    }
    while (reacted);
    if (polymer.length < minLength)
        minLength = polymer.length;
}

console.log(minLength);
