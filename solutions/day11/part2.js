const serial = parseInt(require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8"));

const powerLevel = (x, y, serial) =>
    Math.floor((((x + 10) * y + serial) * (x + 10)) % 1000 / 100) - 5;

const pls = Array.from(Array(300), (_, y) =>
    Array.from(Array(300), (_, x) =>
        powerLevel(x, y, serial)));

const integralPls = Array.from(Array(300), () => Array(300));

for (let y = 0; y < pls.length; y++) {
    for (let x = 0; x < pls[y].length; x++) {
        integralPls[y][x] = y === 0 && x === 0 ?
            pls[y][x] :
            y === 0 ?
                integralPls[y][x - 1] + pls[y][x] :
                x === 0 ?
                    integralPls[y - 1][x] + pls[y][x] :
                    integralPls[y - 1][x] + integralPls[y][x - 1] - integralPls[y - 1][x - 1] + pls[y][x];
    }
}

let maxSum = 0;
let maxResults;
for (let size = 1; size <= 300; size++) {
    for (let x = 0; x <= 300 - size; x++) {
        for (let y = 0; y <= 300 - size; y++) {
            let plSum = y === 0 && x === 0 ?
                integralPls[y + size - 1][x + size - 1] :
                y === 0 ?
                    integralPls[y + size - 1][x + size - 1] - integralPls[y + size - 1][x - 1] :
                    x === 0 ?
                        integralPls[y + size - 1][x + size - 1] - integralPls[y - 1][x + size - 1] :
                        integralPls[y + size - 1][x + size - 1] - integralPls[y + size - 1][x - 1] - integralPls[y - 1][x + size - 1] + integralPls[y - 1][x - 1];
            if (plSum > maxSum) {
                maxSum = plSum;
                maxResults = [x, y, size];
            }
        }
    }
}

console.log(maxResults.join(","));
