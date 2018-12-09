const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const orderings = input.split("\n").slice(0, -1).map(x => x.match(/^Step (.) must be finished before step (.) can begin.$/).slice(1));

const prereqs = orderings.reduce((acc, [a, b]) => {
    if (!(a in acc))
        acc[a] = [];
    if (!(b in acc))
        acc[b] = [];
    acc[b].push(a);
    return acc;
}, {});

let time = 0;
const currAvailable = [];
const workingSet = [];

do {
    currAvailable.push(...Object.keys(prereqs).filter(x =>
        !currAvailable.includes(x) &&
        !workingSet.map(x => x.key).includes(x) &&
        prereqs[x].length === 0));
    currAvailable.sort();
    workingSet.push(...currAvailable.splice(0, 5 - workingSet.length).map(x => ({
        key: x,
        remaining: 61 + x.charCodeAt(0) - "A".charCodeAt(0)
    })));
    workingSet.sort((a, b) =>
        a.remaining - b.remaining);
    const done = workingSet.shift();
    time += done.remaining;
    workingSet.forEach(x => x.remaining -= done.remaining);
    delete prereqs[done.key];
    Object.keys(prereqs).forEach(x => prereqs[x] = prereqs[x].filter(x => x !== done.key));
}
while (Object.keys(prereqs).length > 0);

console.log(time);
