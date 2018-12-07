const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const points = input.split("\n").slice(0, -1).map(x => x.split(", "));

console.log(points);
