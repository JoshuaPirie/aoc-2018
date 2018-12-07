const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const points = input.split("\n").slice(0, -1).map(x => x.split(", "));

const grid = Array.from(
    Array(Math.max(...points.map(x => x[1])) + 1),
    () => Array(Math.max(...points.map(x => x[0])) + 1));

const dist = (x0, y0, x1, y1) =>
    Math.abs(x1 - x0) + Math.abs(y1 - y0);

const edgeInds = new Set();

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let minDst = Infinity;
        let closestInd = -1;
        for (let i = 0; i < points.length; i++) {
            const dst = dist(x, y, points[i][0], points[i][1]);
            if (dst < minDst) {
                minDst = dst;
                closestInd = i;
            }
            else if (dst === minDst)
                closestInd = -1;
        }
        grid[y][x] = closestInd;
        if (y === 0 || y === grid.length - 1 || x === 0 || x === grid[y].length - 1)
            edgeInds.add(closestInd);
    }
}

const finiteAreaInds = points.map((_, i) => i).filter(x => !edgeInds.has(x));

const finiteAreas = finiteAreaInds.map(x =>
    grid.reduce((acc, curr) =>
        acc + curr.reduce((acc, curr) =>
            curr === x ? acc + 1 : acc, 0), 0));

console.log(Math.max(...finiteAreas));

// printing grid to file
points.forEach(x => grid[x[1]][x[0]] = -2);
require("fs")
    .writeFileSync(
        require("path").resolve(__dirname, "grid.txt"),
        grid.map(x =>
            x.map(x =>
                x === -2 ?
                    "+" :
                    x === -1 ?
                        "." :
                        x < 26 ?
                            String.fromCharCode("a".charCodeAt(0) + x) :
                            String.fromCharCode("A".charCodeAt(0) + x - 26))
            .join(""))
        .join("\n")
    , "utf8");
