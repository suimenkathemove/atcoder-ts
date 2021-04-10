import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `10
// 241 310 105 738 405 490 158 92 68 20
// 20
// 2 252
// 1 4 36
// 2 69
// 1 5 406
// 3 252
// 1 3 8
// 1 10 10
// 3 11
// 1 4 703
// 3 1
// 2 350
// 3 10
// 2 62
// 2 3
// 2 274
// 1 2 1
// 3 126
// 1 4 702
// 3 6
// 2 174`;

const splitInput = input.split("\n");

const C = splitInput[1].split(" ").map(Number);

const Ss = splitInput.slice(3);

let sell = 0;

let z = 0;

let s = 0;

let [min_s_C, min_z_C] = C.reduce(
  (acc, cur, index) =>
    (index + 1) % 2 === 1
      ? [Math.min(acc[0], cur), acc[1]]
      : [acc[0], Math.min(acc[1], cur)],
  [1000000000, 1000000000]
);

Ss.forEach((S) => {
  const splitS = S.split(" ").map(Number);

  switch (splitS[0] as 1 | 2 | 3) {
    case 1:
      {
        const [_, x, a] = splitS;
        const cardX = x % 2 === 1 ? C[x - 1] - z - s : C[x - 1] - z;

        if (cardX >= a) {
          C[x - 1] -= a;
          sell += a;

          if (x % 2 === 1) {
            min_s_C = Math.min(C[x - 1], min_s_C);
          } else {
            min_z_C = Math.min(C[x - 1], min_z_C);
          }
        }
      }
      break;
    case 2:
      {
        const a = splitS[1];

        if (min_s_C - s - z >= a) {
          s += a;
        }
      }
      break;
    case 3:
      {
        const a = splitS[1];

        if (Math.min(min_s_C - s - z, min_z_C - z) >= a) {
          z += a;
        }
      }
      break;
  }
});

C.forEach((_, index) => {
  if ((index + 1) % 2 === 1) {
    sell += s;
  }
});

sell += z * C.length;

console.log(sell);
