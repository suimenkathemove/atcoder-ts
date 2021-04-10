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

const main = (lines: string[]): void => {
  const N = Number(lines.splice(0, 1));
  const Q = Number(lines.splice(0, 1));
  const Querys = lines;

  let rowNums = [...range(N)];
  let columnNums = [...range(N)];

  let transFlag = false;

  for (const i of range(Q)) {
    const query = Querys[i];
    let [queryType, A, B] = query.split(" ").map(Number);
    A--;
    B--;

    switch (queryType) {
      case 1:
        [rowNums[A], rowNums[B]] = [rowNums[B], rowNums[A]];
        break;
      case 2:
        [columnNums[A], columnNums[B]] = [columnNums[B], columnNums[A]];
        break;
      case 3:
        [rowNums, columnNums] = [columnNums, rowNums];

        transFlag = !transFlag;
        break;
      case 4:
        if (transFlag) {
          console.log(columnNums[B] * N + rowNums[A]);
        } else {
          console.log(rowNums[A] * N + columnNums[B]);
        }
        break;
    }
  }
};

// const input = `3
// 9
// 2 2 3
// 3
// 1 2 1
// 2 3 2
// 1 1 3
// 3
// 4 1 1
// 4 2 2
// 4 2 3`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
