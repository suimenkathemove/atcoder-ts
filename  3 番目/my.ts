const main = (lines: string[]): void => {
  const arr = lines[0].split(" ").map(Number);

  arr.sort((a, b) => b - a);

  console.log(arr[2]);
};

// const input = `19 92 3 35 78 1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
