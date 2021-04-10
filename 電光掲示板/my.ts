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
  const s = lines;

  const zero = `###
#.#
#.#
#.#
###`;

  const one = `.#.
##.
.#.
.#.
###`;

  const two = `###
..#
###
#..
###`;

  const three = `###
..#
###
..#
###`;

  const four = `#.#
#.#
###
..#
..#`;

  const five = `###
#..
###
..#
###`;

  const six = `###
#..
###
#.#
###`;

  const seven = `###
..#
..#
..#
..#`;

  const eight = `###
#.#
###
#.#
###`;

  const nine = `###
#.#
###
..#
###`;

  const numberStrArr = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ];

  const anss: number[] = [];

  for (const i of range(N)) {
    const currentS = s.map((v) => v.slice(4 * i + 1, 4 * i + 3 + 1));

    let ans: number;

    numberStrArr.forEach((numberStr, numberStrIdx) => {
      if (numberStr.split("\n").every((v, i) => v === currentS[i])) {
        ans = numberStrIdx;
      }
    });

    anss.push(ans!);
  }

  console.log(anss.join(""));
};

// const input = `10
// .###..#..###.###.#.#.###.###.###.###.###.
// .#.#.##....#...#.#.#.#...#.....#.#.#.#.#.
// .#.#..#..###.###.###.###.###...#.###.###.
// .#.#..#..#.....#...#...#.#.#...#.#.#...#.
// .###.###.###.###...#.###.###...#.###.###.`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
