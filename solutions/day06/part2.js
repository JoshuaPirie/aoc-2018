const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const points = input.split("\n").slice(0, -1).map(x => x.split(", "));

const grid = Array.from(
    Array(Math.max(...points.map(x => x[1])) + 1),
    () => Array(Math.max(...points.map(x => x[0])) + 1));

const dist = (x0, y0, x1, y1) =>
    Math.abs(x1 - x0) + Math.abs(y1 - y0);

for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
        grid[y][x] = points.reduce((acc, curr) =>
            acc + dist(x, y, curr[0], curr[1]), 0);

console.log(grid.reduce((acc, curr) =>
    acc + curr.filter(x => x < 10000).length, 0));

// printing grid to file
points.forEach(x => grid[x[1]][x[0]] = -1);
require("fs")
    .writeFileSync(
        require("path").resolve(__dirname, "grid.txt"),
        grid.map(x =>
            x.map(x =>
                x === -1 ?
                    "+" :
                    x < 10000 ?
                        "#" :
                        ".")
            .join(""))
        .join("\n")
    , "utf8");
