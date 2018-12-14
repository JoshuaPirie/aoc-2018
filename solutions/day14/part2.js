const searchRecipe = require("fs")
    .readFileSync(require("path")
        .resolve(__dirname, "input"), "utf8");

let elfPositions = [0, 1];
const recipes = [3, 7];

while (!recipes.slice(-searchRecipe.length).join("").includes(searchRecipe)) {
    recipes.push(...elfPositions.reduce((acc, curr) => acc + recipes[curr], 0)
        .toString().split("").map(x => parseInt(x)));
    elfPositions = elfPositions.map(x => (x + recipes[x] + 1) % recipes.length);
}

console.log(recipes.length - searchRecipe.length);
