const main = (inputRows: string[]): void => {
  const S = inputRows[0];

  const result = S.match(/(.)\1\1/);

  if (result == null) {
    console.log("draw");
  } else {
    console.log(result[0][0]);
  }
};

// const input = `xooox`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
