const main = (inputRows: string[]): void => {
  const S = inputRows.slice(1);

  S.sort((a, b) => {
    const numberA = BigInt(a);
    const numberB = BigInt(b);

    if (numberA === numberB) {
      return b.length - a.length;
    }

    if (numberA < numberB) {
      return -1;
    }

    if (numberA > numberB) {
      return 1;
    }

    return 0;
  });

  S.forEach((v) => {
    console.log(v);
  });
};

// const input = `6
// 1111111111111111111111
// 00011111111111111111111
// 000000111111111111111111
// 0000000001111111111111111
// 00000000000011111111111111
// 000000000000000111111111111`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
