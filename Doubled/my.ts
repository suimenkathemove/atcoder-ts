import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `33`;

const N = input.length % 2 === 0 ? Number(input) : 10 ** (input.length - 1) - 1;
const strN = String(N);
const NLengthHalf = input.length / 2;

const beforeN = Number(strN.slice(0, NLengthHalf));
const afterN = Number(strN.slice(NLengthHalf));

const ans = beforeN - (afterN >= beforeN ? 0 : 1);

console.log(ans);
