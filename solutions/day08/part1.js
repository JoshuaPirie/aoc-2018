const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const bytes = input.split(" ").map(x => parseInt(x));

const sumArr = arr => arr.reduce((acc, curr) => acc + curr, 0);
const sum = () => {
    const numChildren = bytes.shift();
    const numMetadata = bytes.shift();
    return sumArr(Array.from(Array(numChildren), () => sum()        )) +
           sumArr(Array.from(Array(numMetadata), () => bytes.shift()));
}

console.log(sum());
