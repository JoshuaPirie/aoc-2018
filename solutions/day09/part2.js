const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

const [numPlayers, maxMarbleScore] = input.match(/^(\d+) players; last marble is worth (\d+) points\n$/).slice(1, 3).map(x => parseInt(x));

const playerScores = Array(numPlayers).fill(0);
let currMarble = {score: 0, prev: null, next: null};
currMarble.next = currMarble.prev = currMarble;

for (let newMarbleScore = 1; newMarbleScore <= maxMarbleScore * 100; newMarbleScore++) {
    const currPlayerInd = (newMarbleScore - 1) % numPlayers;
    if (newMarbleScore % 23 === 0) {
        playerScores[currPlayerInd] += newMarbleScore;
        const remMarble = currMarble.prev.prev.prev.prev.prev.prev.prev;
        playerScores[currPlayerInd] += remMarble.score;
        remMarble.next.prev = remMarble.prev;
        currMarble = remMarble.prev.next = remMarble.next;
        delete remMarble;
    }
    else {
        const nextMarble = currMarble.next;
        const nextNextMarble = nextMarble.next;
        currMarble = {score: newMarbleScore, prev: nextMarble, next: nextNextMarble};
        nextMarble.next = nextNextMarble.prev = currMarble;
    }
}

console.log(Math.max(...playerScores));
