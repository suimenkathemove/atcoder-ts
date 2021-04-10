// import * as fs from "fs";

// const input = fs.readFileSync("/dev/stdin", "utf8");
const input = `84 97 66
79 89 11
61 59 7
7
89
7
87
79
24
84
30`;

const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
) => {
  const arr = [];

  const [start = 0, end, step = 1] =
    args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

const main = () => {
  const [A, ...N] = input
    .split(`\n`)
    .reduce<[number[][], ...number[]]>(
      (acc, cur, idx) =>
        idx <= 2
          ? [[...acc[0], cur.split(" ").map(Number)]]
          : [...acc, Number(cur)],
      [[]]
    );

  const LENGTH = 3;
  const rows = range(LENGTH);
  const columns = range(LENGTH);
  const M = rows.map(() => columns.map(() => false));

  N.forEach((n) => {
    A.forEach((aRow, i) => {
      aRow.forEach((a, j) => {
        if (a === n) {
          M[i][j] = true;
        }
      });
    });
  });

  if (
    rows.some((r) => columns.every((c) => M[r][c])) ||
    columns.some((c) => rows.every((r) => M[r][c])) ||
    rows.every((r) => columns.every((c) => r !== c || M[r][c])) ||
    rows.every((r) => columns.every((c) => r + c !== LENGTH - 1 || M[r][c]))
  ) {
    console.log("Yes");
  } else {
    console.log("No");
  }
};

export const ans = main();
