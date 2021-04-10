const main = (lines: string[]): void => {
  const BA: [number, number][] = lines
    .slice(1)
    .map((str) => {
      const [a, b] = str.split(" ").map(Number);
      return [b, a] as [number, number];
    })
    .sort(([n], [m]) => n - m);

  let ans = 0;
  let last = 0;

  BA.forEach(([b, a]) => {
    if (last < a) {
      ans += 1;
      last = b;
    }
  });

  console.log(ans);
};

// const input = `3
// 1 5
// 4 6
// 6 8`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
