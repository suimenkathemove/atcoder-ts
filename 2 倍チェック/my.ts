const main = (lines: string[]): void => {
  const S = lines[0];

  if (S.split("").some((v) => isNaN(Number(v)))) {
    console.log("error");

    return;
  }

  console.log(Number(S) * 2);
};

// const input = `0x8`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
