const main = (lines: string[]): void => {
  const [s, t] = lines;

  if (s === t) {
    console.log("same");
  } else if (s.toLowerCase() === t.toLowerCase()) {
    console.log("case-insensitive");
  } else {
    console.log("different");
  }
};

// const input = ``;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
