const tracks = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8").split("\n").map(x => x.split(""));

const carts = [];

const DIR_LEFT = 0;
const DIR_UP = 1;
const DIR_RIGHT = 2;
const DIR_DOWN = 3;


for (let y = 0; y < tracks.length; y++) {
    for (let x = 0; x < tracks[y].length; x++) {
        if (tracks[y][x] === "^") {
            carts.push({
                x: x,
                y: y,
                dir: DIR_UP,
                nextTurnDir: DIR_LEFT
            });
            tracks[y][x] = "|";
        }
        else if (tracks[y][x] === "v") {
            carts.push({
                x: x,
                y: y,
                dir: DIR_DOWN,
                nextTurnDir: DIR_LEFT
            });
            tracks[y][x] = "|";
        }
        else if (tracks[y][x] === "<") {
            carts.push({
                x: x,
                y: y,
                dir: DIR_LEFT,
                nextTurnDir: DIR_LEFT
            });
            tracks[y][x] = "-";
        }
        else if (tracks[y][x] === ">") {
            carts.push({
                x: x,
                y: y,
                dir: DIR_RIGHT,
                nextTurnDir: DIR_LEFT
            });
            tracks[y][x] = "-";
        }
    }
}

while (true) {
    carts.sort((a, b) => (a.y - b.y) || (a.x - b.x));
    for (let i = 0; i < carts.length; i++) {
        const cart = carts[i];
        cart.x += cart.dir === DIR_LEFT ? -1 : cart.dir === DIR_RIGHT ? 1 : 0
        cart.y += cart.dir === DIR_UP ? -1 : cart.dir === DIR_DOWN ? 1 : 0
        if (carts.some(x => x !== cart && x.x === cart.x && x.y === cart.y)) {
            console.log(cart.x + "," + cart.y);
            return;
        }
        if (tracks[cart.y][cart.x] === "\\")
            cart.dir = cart.dir === DIR_UP ? DIR_LEFT : cart.dir === DIR_DOWN ? DIR_RIGHT : cart.dir === DIR_LEFT ? DIR_UP : DIR_DOWN;
        if (tracks[cart.y][cart.x] === "/")
            cart.dir = cart.dir === DIR_UP ? DIR_RIGHT : cart.dir === DIR_DOWN ? DIR_LEFT : cart.dir === DIR_LEFT ? DIR_DOWN : DIR_UP;
        if (tracks[cart.y][cart.x] === "+") {
            if (cart.nextTurnDir === DIR_LEFT)
                cart.dir = (cart.dir - 1 + 4) % 4;
            else if (cart.nextTurnDir === DIR_RIGHT)
                cart.dir = (cart.dir + 1) % 4;
            cart.nextTurnDir = (cart.nextTurnDir + 1) % 3;
        }
    }
}
