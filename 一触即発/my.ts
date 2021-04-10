// WA

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

const main = (inputRows: string[]): void => {
  const [N, M] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  const ABCs = inputRows;

  const map: Record<number, number> = {};
  for (const i of range(M)) {
    const ABC = ABCs[i].split(" ").map(Number);

    for (const j of range(3)) {
      const [j1, j2, j3] = [j % 3, (j + 1) % 3, (j + 2) % 3];

      const set = (1 << ABC[j1]) | (1 << ABC[j2]);

      map[set] = (set in map ? map[set] : 0) | (1 << ABC[j3]);
    }
  }

  const arr: number[] = [];
  for (const p in map) {
    arr.push((map[p].toString(2).match(/1/g) || []).length);
  }

  arr.sort((a, b) => b - a);

  console.log(arr[0]);
};

// const input = `6 7
// 1 2 5
// 2 3 5
// 2 4 5
// 1 2 3
// 4 5 6
// 2 5 6
// 1 3 5`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
