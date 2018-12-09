const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const bytes = input.split(" ").map(x => parseInt(x));

const sumArr = arr => arr.reduce((acc, curr) => acc + curr, 0);
const val = () => {
    const numChildren = bytes.shift();
    const numMetadata = bytes.shift();
    if (numChildren > 0) {
        const childVals = Array.from(Array(numChildren), () => val());
        return sumArr(Array.from(Array(numMetadata), () => bytes.shift() - 1)
            .filter(x => x >= 0 && x < childVals.length).map(x => childVals[x]));
    } else {
        return sumArr(Array.from(Array(numMetadata), () => bytes.shift()));
    }
}

console.log(val());
