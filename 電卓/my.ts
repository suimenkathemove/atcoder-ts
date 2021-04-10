const main = (lines: string[]): void => {
  const [X, Y] = lines[0].split(" ").map(Number);

  if (Y === 0) {
    return console.log("ERROR");
  }

  let ans = X / Y;

  const dotIndex = String(ans).indexOf(".");

  if (dotIndex === -1) {
    return console.log(`${ans}.00`);
  }

  if (String(ans)[dotIndex + 2] == null) {
    return console.log(`${ans}0`);
  }

  console.log(Math.floor(ans * 10 ** 2) / 10 ** 2);
};

// const input = `100 3`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
