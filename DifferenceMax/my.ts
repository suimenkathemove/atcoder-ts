import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `-100 100
// -100 100`;

const splitInput = input.split("\n");
const [[a, b], [c, d]] = splitInput.map((str) => str.split(" ").map(Number));

const ans = b - Math.min(c, d);

console.log(ans);
