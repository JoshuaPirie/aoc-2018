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
let minIters = 0;
let iters = 0;

while (true) {
    const bounding =
        (Math.max(...points.map(x => x.pos.x)) -
        Math.min(...points.map(x => x.pos.x)) + 1) *
        (Math.max(...points.map(x => x.pos.y)) -
        Math.min(...points.map(x => x.pos.y)) + 1);
    if (bounding < minBounding) {
        minBounding = bounding;
        minIters = iters;
    }
    if (bounding > startBounding)
        break;
    iterate(points);
    iters++;
}

console.log(minIters);
