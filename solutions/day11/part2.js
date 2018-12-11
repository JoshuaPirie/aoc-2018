const serial = parseInt(require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8"));

const powerLevel = (x, y, serial) =>
    Math.floor((((x + 10) * y + serial) * (x + 10)) % 1000 / 100) - 5;

const pls = Array.from(Array(300), (_, y) =>
    Array.from(Array(300), (_, x) =>
        powerLevel(x, y, serial)));

const integralPls = Array.from(Array(pls.length + 1), () => Array(pls.length + 1));

for (let i = 0; i < integralPls.length; i++)
    integralPls[i][0] = integralPls[0][i] = 0;

for (let y = 1; y < integralPls.length; y++)
    for (let x = 1; x < integralPls.length; x++)
        integralPls[y][x] = integralPls[y - 1][x] + integralPls[y][x - 1] - integralPls[y - 1][x - 1] + pls[y - 1][x - 1];

let maxSum = 0;
let maxResults;
for (let size = 1; size <= integralPls.length; size++) {
    for (let y = 1; y <= integralPls.length - size; y++) {
        for (let x = 1; x <= integralPls.length - size; x++) {
            let plSum = integralPls[y + size - 1][x + size - 1] - integralPls[y + size - 1][x - 1] - integralPls[y - 1][x + size - 1] + integralPls[y - 1][x - 1];
            if (plSum > maxSum) {
                maxSum = plSum;
                maxResults = [x - 1, y - 1, size];
            }
        }
    }
}

console.log(maxResults.join(","));
