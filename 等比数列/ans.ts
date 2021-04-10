import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");

const [A, R, N] = input.split(" ").map(Number);

const solve = (A: number, R: number, N: number): number | "large" => {
  if (R === 1) {
    return A;
  }

  for (let i = 0; i < N - 1; i++) {
    A *= R;

    if (A > 10 ** 9) {
      return "large";
    }
  }

  return A;
};

const ans = solve(A, R, N);

console.log(ans);
