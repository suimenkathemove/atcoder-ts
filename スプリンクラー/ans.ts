import * as fs from "fs";

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

// const input = `30 10 20
// 11 13
// 30 14
// 6 4
// 7 23
// 30 8
// 17 4
// 6 23
// 24 18
// 26 25
// 9 3
// 18 4 36 46 28 16 34 19 37 23 25 7 24 16 17 41 24 38 6 29 10 33 38 25 47 8 13 8 42 40
// 2 1 9
// 1 8
// 1 9
// 2 20 24
// 2 26 18
// 1 20
// 1 26
// 2 24 31
// 1 4
// 2 21 27
// 1 25
// 1 29
// 2 10 14
// 2 2 19
// 2 15 36
// 2 28 6
// 2 13 5
// 1 12
// 1 11
// 2 14 43`;
const input = fs.readFileSync("/dev/stdin", "utf8");

const splitInputs = input.split("\n");

const [N, M] = splitInputs[0].split(" ").map(Number);

const UV: [number, number][] = splitInputs
  .slice(1, M + 1)
  .map((s) => s.split(" ").map(Number) as [number, number]);

const graph = [...range(0, N)].map(() => [...range(0, N)].map(() => false));
UV.forEach(([u, v]) => {
  graph[u - 1][v - 1] = true;
  graph[v - 1][u - 1] = true;
});

const C = splitInputs[M + 1].split(" ").map(Number);

const S = splitInputs.slice(M + 1 + 1);

S.forEach((s) => {
  const splitS = s.split(" ").map(Number);
  const x = splitS[1];

  if (splitS[0] === 1) {
    console.log(C[x - 1]);

    graph[x - 1].forEach((g, index) => {
      if (g) {
        C[index] = C[x - 1];
      }
    });
  } else {
    console.log(C[x - 1]);

    C[x - 1] = splitS[2];
  }
});
