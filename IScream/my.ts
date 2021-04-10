import * as fs from "fs";

const [A, B] = fs.readFileSync("/dev/stdin", "utf8").split(" ").map(Number);

// const A = 1;
// const B = 2;

const C = A + B;

if (C >= 15 && B >= 8) {
  console.log(1);
} else if (C >= 10 && B >= 3) {
  console.log(2);
} else if (C >= 3) {
  console.log(3);
} else {
  console.log(4);
}
