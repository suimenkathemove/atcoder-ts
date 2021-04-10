import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");

const inputRow = input.split("\n");

const N = Number(inputRow[0]);

const As = [];
const Bs = [];

for (let i = 1; i <= N; i++) {
  const [A, B] = inputRow[i].split(" ").map(Number);
  As.push(A);
  Bs.push(B);
}

// const As = [8, 4, 7];
// const Bs = [5, 4, 9];

const minA = As.reduce((acc, cur) => Math.min(acc, cur));
const minAIndex = As.indexOf(minA);

const minB = Bs.reduce((acc, cur) => Math.min(acc, cur));
const minBIndex = Bs.indexOf(minB);

if (minAIndex !== minBIndex) {
  console.log(Math.max(minA, minB));
} else {
  As.splice(minAIndex, 1);
  const minA2 = As.reduce((acc, cur) => Math.min(acc, cur));

  Bs.splice(minBIndex, 1);
  const minB2 = Bs.reduce((acc, cur) => Math.min(acc, cur));

  const pattern1 = Math.max(minA, minB2);
  const pattern2 = Math.max(minB, minA2);
  const pattern3 = minA + minB;

  console.log(Math.min(pattern1, pattern2, pattern3));
}
