const serial = parseInt(require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8"));

const powerLevel = (x, y, serial) =>
    Math.floor((((x + 10) * y + serial) * (x + 10)) % 1000 / 100) - 5;

const pls = Array.from(Array(300), (_, y) =>
    Array.from(Array(300), (_, x) =>
        powerLevel(x, y, serial)));

let max3x3 = 0;
let maxXY;
for (let y = 0; y <= pls.length - 3; y++) {
    for (let x = 0; x <= pls.length - 3; x++) {
        let plSum = 0;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                plSum += pls[y + i][x + j];
        if (plSum > max3x3) {
            max3x3 = plSum;
            maxXY = [x, y];
        }
    }
}

console.log(maxXY.join(","));
