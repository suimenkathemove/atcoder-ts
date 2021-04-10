const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
): number[] => {
  const arr: number[] = [];

  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

class Queue<T> {
  private _data: T[] = [];

  // @ts-ignore
  get data(): Readonly<T[]> {
    return this._data;
  }

  push(item: T) {
    this._data.push(item);
  }

  pop() {
    return this._data.shift();
  }
}

const main = (splitInput: string[]): void => {
  const [R, C] = splitInput[0].split(" ").map(Number);
  const [sy, sx] = splitInput[1].split(" ").map((str) => Number(str) - 1);
  const [gy, gx] = splitInput[2].split(" ").map((str) => Number(str) - 1);
  const maze: (number | "#")[][] = splitInput
    .slice(3)
    .map((str) => str.split("").map((v) => (v !== "#" ? -1 : v)));

  const Q = new Queue<[number, number]>();

  Q.push([sy, sx]);
  maze[sy][sx] = 0;

  while (Q.data.length > 0) {
    const [i, j] = Q.pop()!;

    const allSides: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ] = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ];
    for (const [i2, j2] of allSides) {
      if (!(0 <= i2 && i2 < R && 0 <= j2 && j2 < C)) {
        continue;
      }

      if (maze[i2][j2] === "#") {
        continue;
      }

      if (maze[i2][j2] === -1) {
        maze[i2][j2] = (maze[i][j] as number) + 1;

        if (i2 === gy && j2 === gx) {
          return console.log(maze[i2][j2]);
        }

        Q.push([i2, j2]);
      }
    }
  }
};

// const input = `7 8
// 2 2
// 4 5
// ########
// #......#
// #.######
// #..#...#
// #..##..#
// ##.....#
// ########`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
