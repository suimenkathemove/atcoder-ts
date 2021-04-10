import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `4 4
// ...s
// ....
// ....
// .g..`;

const splitInput = input.split("\n");

const [H, W] = splitInput[0].split(" ").map(Number);

const S = splitInput.slice(1).map((v) => v.split(""));

const [[sy, sx], [gy, gx]] = (() => {
  let sysx: [number, number] = [0, 0];
  let gygx: [number, number] = [0, 0];
  S.forEach((sRow, y) => {
    sRow.forEach((s, x) => {
      switch (s) {
        case "s":
          sysx = [y, x];
          break;
        case "g":
          gygx = [y, x];
          break;
      }
    });
  });
  return [sysx, gygx];
})();

const visited = S.map((sRow) => sRow.map(() => false));

const dfs = (y: number, x: number) => {
  visited[y][x] = true;

  [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ].forEach(([y2, x2]) => {
    if (!(0 <= y2 && y2 < H && 0 <= x2 && x2 < W)) {
      return;
    }

    if (S[y2][x2] === "#") {
      return;
    }

    if (!visited[y2][x2]) {
      dfs(y2, x2);
    }
  });
};

dfs(sy, sx);

console.log(visited[gy][gx] ? "Yes" : "No");
