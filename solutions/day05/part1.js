const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8")
    .slice(0, -1).split("");

let reacted;
do {
    reacted = false;
    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i + 1] && input[i].toUpperCase() === input[i + 1].toUpperCase() && input[i] !== input[i + 1]) {
            input.splice(i, 2);
            reacted = true;
        }
    }
}
while (reacted);

console.log(input.length);
