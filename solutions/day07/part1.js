const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const orderings = input.split("\n").slice(0, -1).map(x => x.match(/^Step (.) must be finished before step (.) can begin.$/).slice(1));

const steps = Array.from(orderings.reduce((acc, [a, b]) => {
    acc.add(a);
    acc.add(b);
    return acc;
}, new Set()));

const tree = {};
const treeFind = (tree, val) =>
    val in tree ?
        tree[val] :
        Object.values(tree)
            .map(x => treeFind(x, val))
            .find(x => x);
const treeRemove = (tree, val) =>
    val in tree ?
        delete tree[val] :
        Object.values(tree)
            .forEach(x => treeRemove(x, val));

orderings.forEach(([a, b]) => {
    const treeA = treeFind(tree, a);
    const treeB = treeFind(tree, b) || {};
    treeRemove(tree, b);
    if (treeA)
        treeA[b] = treeB;
    else
        tree[a] = {[b]: treeB};
});

const order = [];
const currAvailable = Object.keys(tree);
while (currAvailable.length > 0) {
    currAvailable.sort().reverse();
    const key = currAvailable.pop();
    order.push(key);
    currAvailable.push(...Object.keys(treeFind(tree, key)))
}


console.log(order.join(""));
