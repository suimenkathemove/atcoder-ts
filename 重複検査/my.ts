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

const main = (lines: string[]): void => {
  const N = Number(lines.splice(0, 1));
  const A = lines.map(Number);

  A.sort();

  let isIncorrect = false;

  let from: number;
  let to: number;

  const logIncorrect = () => {
    console.log(`${to} ${from}`);
  };

  for (const i of range(N)) {
    const num = i + 1;
    const currentA = A[i];

    if (!isIncorrect) {
      if (currentA > num) {
        from = num;
        isIncorrect = true;
      }

      if (currentA < num) {
        to = currentA;
        isIncorrect = true;
      }
    } else {
      if (num === currentA) {
        // @ts-ignore
        if (from != null) {
          to = num;
          logIncorrect();
          return;
        }

        // @ts-ignore
        if (to != null) {
          from = num - 1;
          logIncorrect();
          return;
        }
      }

      if (num === N) {
        from = N;
        logIncorrect();
        return;
      }
    }
  }

  console.log("Correct");
};

// const input = `5
// 1
// 3
// 4
// 4
// 5`;

// const input = `5
// 2
// 3
// 4
// 5
// 5`;

// const input = `5
// 1
// 2
// 2
// 3
// 5`;

// const input = `5
// 1
// 1
// 2
// 3
// 4`;

const input = `6
1
5
6
3
2
6`;

export const mainReturn = main(input.split("\n"));
// main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
