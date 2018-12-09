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

const order = [];
let currAvailable = Object.keys(prereqs).filter(x => prereqs[x].length === 0);
while (currAvailable.length > 0) {
    currAvailable.sort();
    const key = currAvailable.shift();
    order.push(key);
    delete prereqs[key];
    Object.keys(prereqs).forEach(x => prereqs[x] = prereqs[x].filter(x => x !== key));
    currAvailable = Object.keys(prereqs).filter(x => prereqs[x].length === 0);
}

console.log(order.join(""));
