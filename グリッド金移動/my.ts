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
    return this._data.shift()!;
  }
}

const main = (lines: string[]): void => {
  const OFFSET = 200 + 1;

  let [N, X, Y] = lines.splice(0, 1)[0].split(" ").map(Number);
  X += OFFSET;
  Y += OFFSET;
  const xys: [number, number][] = lines.map(
    (v) => v.split(" ").map((v) => Number(v) + OFFSET) as [number, number]
  );

  const I_MAX = OFFSET * 2 + 1;
  const J_MAX = OFFSET * 2 + 1;

  const S: ("." | "#")[][] = [];
  for (const i of range(I_MAX)) {
    S.push([]);

    for (const _ of range(J_MAX)) {
      S[i].push(".");
    }
  }
  for (const n of range(N)) {
    let [i, j] = xys[n];

    S[i][j] = "#";
  }

  const dist: number[][] = [];
  for (const i of range(I_MAX)) {
    dist.push([]);

    for (const _ of range(J_MAX)) {
      dist[i].push(-1);
    }
  }

  const Q = new Queue<[number, number]>();

  const [sx, sy] = [0 + OFFSET, 0 + OFFSET];
  Q.push([sx, sy]);
  dist[sx][sy] = 0;

  while (Q.data.length > 0) {
    const [i, j] = Q.pop()!;

    // TODO: dxdy
    for (const [i2, j2] of [
      [i + 1, j + 1],
      [i, j + 1],
      [i - 1, j + 1],
      [i + 1, j],
      [i - 1, j],
      [i, j - 1],
    ]) {
      if (!(0 <= i2 && i2 < I_MAX && 0 <= j2 && j2 < J_MAX)) {
        continue;
      }

      if (S[i2][j2] === "#") {
        continue;
      }

      if (dist[i2][j2] === -1) {
        dist[i2][j2] = dist[i][j] + 1;

        Q.push([i2, j2]);
      }
    }
  }

  console.log(dist[X][Y]);
};

// const input = `5 -2 3
// 1 1
// -1 1
// 0 1
// -2 1
// -3 1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
