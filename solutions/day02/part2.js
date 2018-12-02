const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const pairs = input.split("\n").map(x => x.split(""))
    .reduce((acc, curr, i, a) =>
        acc.concat(a.slice(i + 1)
            .map(x => [curr, x])), []);
const correctIds = pairs.find(x =>
    x[0].filter((_, i) =>
        x[0][i] !== x[1][i])
    .length === 1);
const commonId = correctIds[0].filter((_, i) =>
    correctIds[0][i] === correctIds[1][i]).join("");

console.log(commonId);
