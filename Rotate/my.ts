const main = (lines: string[]): void => {
  const A = lines[0];

  console.log(A.slice(1) + A[0]);
};

// const input = `abc`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
