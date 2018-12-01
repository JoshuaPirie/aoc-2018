const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const freqChanges = input.split("\n")
    .map(x => parseInt(x)).slice(0, -1);

const baseFreqs = freqChanges.reduce((acc, curr) => {
    const newFreq = acc[acc.length - 1] + curr;
    acc.push(newFreq);
    return acc;
}, [0]);

const baseOffset = baseFreqs.pop();

let minOffset = Infinity;
let minIndex = Infinity;
let minRepeat = null;
for (let i = 0; i < baseFreqs.length; i++) {
    const freqA = baseFreqs[i];
    for (let j = i + 1; j < baseFreqs.length; j++) {
        const freqB = baseFreqs[j];
        if ((freqA % baseOffset + baseOffset) % baseOffset ===
            (freqB % baseOffset + baseOffset) % baseOffset) {
            const offset = Math.abs(freqA - freqB);
            if (offset <= minOffset) {
                const index = baseOffset > 0 ? (freqA > freqB ? j : i) : (freqA > freqB ? i : j)
                if (offset < minOffset || index < minIndex) {
                    minOffset = offset;
                    minIndex = index;
                    minRepeat = baseOffset > 0 ? Math.max(freqA, freqB) : Math.min(freqA, freqB);
                }
            }
        }
    }
}

console.log(minRepeat);
