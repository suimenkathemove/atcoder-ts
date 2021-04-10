function* range(...args: [start: number] | [start: number, end: number]) {
  const [start, end] = args.length === 1 ? [0, ...args] : args;

  for (let i = start; i < end; i++) {
    yield i;
  }
}

import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `3 2
// 1 2
// 2 3`;

const splitInput = input.split("\n");

const [N] = splitInput[0].split(" ").map(Number);

const G: number[][] = (() => {
  const arr: number[][] = [...range(N)].map(() => []);

  splitInput.slice(1).forEach((s) => {
    let [ai, bi] = s.split(" ").map(Number);

    ai -= 1;
    bi -= 1;

    arr[ai].push(bi);
    arr[bi].push(ai);
  });

  return arr;
})();

const dist = [...range(0, N)].map(() => -1);

const Q: number[] = [];

Q.push(0);

dist[0] = 0;

while (Q.length > 0) {
  const i = Q.shift() as number;

  G[i].forEach((j) => {
    if (dist[j] === -1) {
      dist[j] = dist[i] + 1;
      Q.push(j);
    }
  });
}

console.log(dist[N - 1] === 2 ? "POSSIBLE" : "IMPOSSIBLE");
