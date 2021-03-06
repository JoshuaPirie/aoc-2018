const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const rects = input.split("\n").slice(0, -1).map(x => x.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/).slice(1).map(x => parseInt(x)));
const taken = Array.from(Array(1000), () => Array(1000).fill(0));

rects.forEach(x => {
    for (let i = x[1]; i < x[1] + x[3]; i++)
        for (let j = x[2]; j < x[2] + x[4]; j++)
            taken[i][j]++;
});

let count = 0;
for (let i = 0; i < taken.length; i++)
    for (let j = 0; j < taken[i].length; j++)
        if (taken[i][j] >= 2)
            count++;

console.log(count);
