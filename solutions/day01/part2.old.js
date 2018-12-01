const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const freqChanges = input.split("\n")
    .map(x => parseInt(x)).slice(0, -1);
const freqs = [0];
console.log(freqChanges.length)
while (true) {
    const newFreq = freqs[freqs.length - 1] +
        freqChanges[(freqs.length - 1) % freqChanges.length];
    if (freqs.includes(newFreq)) {
        console.log(newFreq);
        break;
    }
    freqs.push(newFreq);
}
console.log(freqs.length);
