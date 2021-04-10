const main = (lines: string[]): void => {
  const [S, T] = lines[0].split(" ");

  const floors = [
    ..."B1,B2,B3,B4,B5,B6,B7,B8,B9".split(",").reverse(),
    ..."1F,2F,3F,4F,5F,6F,7F,8F,9F".split(","),
  ];

  const sIndex = floors.indexOf(S);
  const tIndex = floors.indexOf(T);

  console.log(Math.abs(sIndex - tIndex));
};

// const input = `1F B1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
