const input = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

let [initialState, _, ...rules] = input.split("\n").slice(0, -1);

initialState = initialState.split(": ")[1].split("").map(x => x === "#");
rules = rules.filter(x => x[x.length - 1] === "#")
    .map(x => x.split(" => ")[0].split("").map(x => x === "#"))
    .map(x => ({
        rule: x,
        leftPadding: x.indexOf(true),
        rightPadding: x.length - x.lastIndexOf(true) - 1
    }));

let currState = {
    minPlant: initialState.indexOf(true),
    maxPlant: initialState.lastIndexOf(true),
    potPlants: initialState.reduce((acc, curr, i) => {
        if (curr)
            acc.add(i);
        return acc;
    }, new Set())
};

const iterate = () => {
    const newState = {
        minPlant: Infinity,
        maxPlant: 0,
        potPlants: new Set()
    };
    rules.forEach(x => {
        for (let i = currState.minPlant - x.leftPadding; i <= currState.maxPlant + x.rightPadding - x.rule.length + 1; i++) {
            let match = true;
            for (let j = 0; j < x.rule.length; j++) {
                if (currState.potPlants.has(i + j) !== x.rule[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                const ind = i + 2;
                newState.potPlants.add(ind);
                if (ind < newState.minPlant)
                newState.minPlant = ind;
                if (ind > newState.maxPlant)
                newState.maxPlant = ind;
            }
        }
    });
    currState = newState;
};

for (let i = 0; i < 20; i++)
    iterate();

console.log(Array.from(currState.potPlants.values()).reduce((acc, curr) => acc + curr, 0));
