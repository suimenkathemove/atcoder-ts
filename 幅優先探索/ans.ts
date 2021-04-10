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

const main = (inputRows: string[]): void => {
  const [R, C] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  let [sy, sx] = inputRows
    .splice(0, 1)[0]
    .split(" ")
    .map((v) => Number(v) - 1);
  const [gy, gx] = inputRows
    .splice(0, 1)[0]
    .split(" ")
    .map((v) => Number(v) - 1);
  const S = inputRows.map((v) => v.split(""));

  const dist = S.map((v) => v.map(() => -1));

  const Q = new Queue<[number, number]>();
  Q.push([sy, sx]);
  dist[sy][sx] = 0;

  while (Q.data.length > 0) {
    const [i, j] = Q.pop()!;

    [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
    ].forEach(([i2, j2]) => {
      if (!(0 <= i2 && i2 < R && 0 <= j2 && j2 < C)) {
        return;
      }

      if (S[i2][j2] === "#") {
        return;
      }

      if (dist[i2][j2] === -1) {
        dist[i2][j2] = dist[i][j] + 1;
        Q.push([i2, j2]);
      }
    });
  }

  console.log(dist[gy][gx]);
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
