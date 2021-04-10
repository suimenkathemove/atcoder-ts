import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `84939825309432908832902189.9092309409809091329`;

const dotIndex = input.indexOf(".");

const ans = input.slice(0, dotIndex);
console.log(ans);
