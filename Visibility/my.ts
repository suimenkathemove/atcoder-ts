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
  let [H, W, X, Y] = lines.splice(0, 1)[0].split(" ").map(Number);
  H--;
  W--;
  X--;
  Y--;
  const S = lines.map((str) => str.split(""));

  let ans = 1;

  for (const i of range(X - 1, 0 - 1)) {
    if (S[i][Y] === "#") {
      break;
    }

    ans++;
  }

  for (const i of range(X + 1, H + 1)) {
    if (S[i][Y] === "#") {
      break;
    }

    ans++;
  }

  for (const j of range(Y - 1, 0 - 1)) {
    if (S[X][j] === "#") {
      break;
    }

    ans++;
  }

  for (const j of range(Y + 1, W + 1)) {
    if (S[X][j] === "#") {
      break;
    }

    ans++;
  }

  console.log(ans);
};

// const input = `4 4 2 2
// ##..
// ...#
// #.#.
// .#.#`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
