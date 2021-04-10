function* range(
  ...args: [end: number] | [start: number, end: number, step?: number]
) {
  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

const round = (i: number, j: number): [number, number][] => {
  const arr: [number, number][] = [];
  for (const i2 of range(3)) {
    for (const j2 of range(3)) {
      arr.push([i + i2 - 1, j + j2 - 1]);
    }
  }
  return arr;
};

const main = (lines: string[]): void => {
  const [N, M] = lines.splice(0, 1)[0].split(" ").map(Number);
  const s = lines;

  const ans: number[][] = [];
  for (const i of range(N)) {
    ans.push([]);
    for (const _ of range(M)) {
      ans[i].push(0);
    }
  }

  for (const i of range(N)) {
    for (const j of range(M)) {
      for (const [i2, j2] of round(i, j)) {
        if (0 <= i2 && i2 < N && 0 <= j2 && j2 < M && s[i2][j2] === "#") {
          ans[i][j] += 1;
        }
      }
    }
  }

  ans.forEach((v) => {
    console.log(v.join(""));
  });
};

// const input = `10 12
// #.##..#...##
// #..#..##...#
// ##.#....##.#
// .#..###...#.
// #..#..#...##
// ###...#..###
// .###.#######
// .#..#....###
// .#.##..####.
// .###....#..#`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
