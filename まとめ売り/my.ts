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

const S = splitInput.slice(3);

let ans = 0;

S.forEach((s) => {
  const splitS = s.split(" ").map(Number);

  switch (splitS[0] as 1 | 2 | 3) {
    case 1:
      {
        const [_, x, a] = splitS;

        if (C[x - 1] >= a) {
          C[x - 1] -= a;
          ans += a;
        }
      }
      break;
    case 2:
      {
        const a = splitS[1];

        if (C.every((c, index) => (index + 1) % 2 === 0 || c >= a)) {
          C.forEach((_, index) => {
            if ((index + 1) % 2 === 1) {
              C[index] -= a;
              ans += a;
            }
          });
        }
      }
      break;
    case 3:
      {
        const a = splitS[1];

        if (C.every((c) => c >= a)) {
          C.forEach((_, index) => {
            C[index] -= a;
            ans += a;
          });
        }
      }
      break;
  }
});

console.log(ans);
