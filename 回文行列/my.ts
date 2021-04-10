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
  const N = Number(lines.splice(0, 1)[0]);
  const a = lines;

  const centerN = Math.floor(N / 2);

  let left = "";
  let center = N % 2 === 1 ? a[centerN][0] : "";

  for (const i of range(centerN)) {
    const str = a[i]
      .split("")
      .find((val) => a[N - 1 - i].split("").indexOf(val) !== -1);

    if (str != null) {
      left += str;
    } else {
      console.log("-1");

      return;
    }
  }

  console.log(left + center + left.split("").reverse().join(""));
};

// const input = `5
// ycabc
// yssac
// fasdg
// sssss
// bddxc`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
