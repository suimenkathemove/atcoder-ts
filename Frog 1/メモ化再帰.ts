import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `6
// 30 10 60 10 60 50`;

const splitInput = input.split("\n");

const N = Number(splitInput[0]);
const h = splitInput[1].split(" ").map(Number);

const cost: number[] = (() => {
  const arr = [];
  for (let i = 0; i < N; i++) {
    arr.push(0);
  }
  return arr;
})();

const done: boolean[] = (() => {
  const arr = [];
  for (let i = 0; i < N; i++) {
    arr.push(false);
  }
  return arr;
})();

const rec = (i: number) => {
  if (done[i]) {
    return cost[i];
  }

  switch (i) {
    case 0:
      cost[i] = 0;
    case 1:
      cost[i] = rec(0) + Math.abs(h[0] - h[1]);
    default:
      cost[i] = Math.min(
        rec(i - 1) + Math.abs(h[i - 1] - h[i]),
        rec(i - 2) + Math.abs(h[i - 2] - h[i])
      );
  }

  done[i] = true;

  return cost[i];
};

console.log(rec(N - 1));
