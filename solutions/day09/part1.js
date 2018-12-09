const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const [numPlayers, maxMarble] = input.match(/^(\d+) players; last marble is worth (\d+) points\n$/).slice(1, 3).map(x => parseInt(x));

const playerScores = Array(numPlayers).fill(0);
const circle = [0];
let currMarbleInd = 0;

for (let newMarble = 1; newMarble <= maxMarble; newMarble++) {
    const currPlayerInd = (newMarble - 1) % numPlayers;
    if (newMarble % 23 === 0) {
        playerScores[currPlayerInd] += newMarble;
        currMarbleInd = (currMarbleInd - 7 + circle.length) % circle.length;
        playerScores[currPlayerInd] += circle.splice(currMarbleInd, 1)[0];
    }
    else {
        currMarbleInd = (currMarbleInd + 1) % circle.length + 1;
        circle.splice(currMarbleInd, 0, newMarble);
    }
}

console.log(Math.max(...playerScores));
