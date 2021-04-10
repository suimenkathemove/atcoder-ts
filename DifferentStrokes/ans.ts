const main = (lines: string[]): void => {
  const N = Number(lines[0]);

  const arr: [number, number, number][] = [];
  for (let i = 0; i < N; i++) {
    const [a, b] = lines.slice(1)[i].split(" ").map(Number);
    arr.push([-a - b, a, b]);
  }

  arr.sort(([c1], [c2]) => c1 - c2);

  let ans = 0;

  for (let i = 0; i < N; i++) {
    const [c, a, b] = arr[i];

    if (i % 2 === 0) {
      ans += a;
    } else {
      ans -= b;
    }
  }

  console.log(ans);
};

// const input = `3
// 10 10
// 20 20
// 30 30`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
