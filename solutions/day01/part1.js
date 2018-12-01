const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

console.log(input.split("\n")
    .map(x => parseInt(x)).slice(0, -1)
    .reduce((acc, curr) => acc + curr, 0));
