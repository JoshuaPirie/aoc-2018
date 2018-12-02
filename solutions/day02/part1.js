const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const counts = input.split("\n")
    .map(x => x.split("").sort()
    .reduce((acc, curr, i, a) => {
        if (a[i - 1] && a[i - 1] === curr) {
            acc[acc.length - 1]++;
            return acc;
        }
        else {
            acc.push(1);
            return acc;
        }
    }, []));

console.log(counts.filter(x => x.includes(2)).length * counts.filter(x => x.includes(3)).length);
