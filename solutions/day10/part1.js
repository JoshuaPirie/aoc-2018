const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const points = input.split("\n").slice(0, -1).map(x =>
    x.match(/^position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>$/)
        .slice(1, 5).map(x => parseInt(x)))
        .map(x => ({
            pos:{
                x: x[0],
                y: x[1]
            },
            vel:{
                x: x[2],
                y: x[3]
            }
        }));

const iterate = points => points.forEach(x => {
    x.pos.x += x.vel.x;
    x.pos.y += x.vel.y;
});

const startBounding =
    (Math.max(...points.map(x => x.pos.x)) -
    Math.min(...points.map(x => x.pos.x)) + 1) *
    (Math.max(...points.map(x => x.pos.y)) -
    Math.min(...points.map(x => x.pos.y)) + 1);
let minBounding = Infinity;
let minPoints = JSON.parse(JSON.stringify(points));

while (true) {
    const bounding =
        (Math.max(...points.map(x => x.pos.x)) -
        Math.min(...points.map(x => x.pos.x)) + 1) *
        (Math.max(...points.map(x => x.pos.y)) -
        Math.min(...points.map(x => x.pos.y)) + 1);
    if (bounding < minBounding) {
        minBounding = bounding;
        minPoints = JSON.parse(JSON.stringify(points));
    }
    if (bounding > startBounding)
        break;
    iterate(points);
}

const minX = Math.min(...minPoints.map(x => x.pos.x));
const maxX = Math.max(...minPoints.map(x => x.pos.x));
const minY = Math.min(...minPoints.map(x => x.pos.y));
const maxY = Math.max(...minPoints.map(x => x.pos.y));
const grid = Array.from(Array(maxY - minY + 1), () => Array(maxX - minX + 1).fill(false));
minPoints.forEach(x => grid[x.pos.y - minY][x.pos.x - minX] = true);
console.log(grid.map(x => x.map(x => x ? "#" : ".").join("")).join("\n"));
