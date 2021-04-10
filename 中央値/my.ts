const main = (lines: string[]): void => {
  const arr = lines[0].split(" ").map(Number);

  const map = { A: arr[0], B: arr[1], C: arr[2] };

  arr.sort((a, b) => b - a);

  (Object.keys(map) as (keyof typeof map)[]).forEach((v) => {
    if (map[v] === arr[1]) {
      console.log(v);
    }
  });
};

// const input = `15 49 7`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
