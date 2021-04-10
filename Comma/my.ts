import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = "27182818284590";

const N = Number(input);

const n3 = 10 ** 3;
const n6 = 10 ** 6;
const n9 = 10 ** 9;
const n12 = 10 ** 12;
const n15 = 10 ** 15;

let ans = 0;

if (N >= n15) {
  const diff = N - (n15 - 1);
  ans =
    1 * (n6 - 1 - (n3 - 1)) +
    2 * (n9 - 1 - (n6 - 1)) +
    3 * (n12 - 1 - (n9 - 1)) +
    4 * (n15 - 1 - (n12 - 1)) +
    5 * diff;
} else if (N >= n12) {
  const diff = N - (n12 - 1);
  ans =
    1 * (n6 - 1 - (n3 - 1)) +
    2 * (n9 - 1 - (n6 - 1)) +
    3 * (n12 - 1 - (n9 - 1)) +
    4 * diff;
} else if (N >= n9) {
  const diff = N - (n9 - 1);
  ans = 1 * (n6 - 1 - (n3 - 1)) + 2 * (n9 - 1 - (n6 - 1)) + 3 * diff;
} else if (N >= n6) {
  const diff = N - (n6 - 1);
  ans = 1 * (n6 - 1 - (n3 - 1)) + 2 * diff;
} else if (N >= n3) {
  const diff = N - (n3 - 1);
  ans = 1 * diff;
}

console.log(ans);
