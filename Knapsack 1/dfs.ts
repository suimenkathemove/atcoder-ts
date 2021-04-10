// TLE

const main = (inputRows: string[]): void => {
  const [N, W] = inputRows.splice(0, 1)[0].split(" ").map(Number);

  const items: { w: number; v: number }[] = [];
  inputRows.forEach((val) => {
    const [w, v] = val.split(" ").map(Number);

    items.push({ w, v });
  });

  const knapsacks: number[][] = [];

  function func(knapsack: number[], i: number) {
    if (i === N) {
      knapsacks.push(knapsack);

      return;
    }

    func([...knapsack, i], i + 1);
    func([...knapsack], i + 1);
  }

  func([], 0);

  const ranking = knapsacks
    .filter((val) => val.reduce((acc, cur) => acc + items[cur].w, 0) <= W)
    .map((val) => val.reduce((acc, cur) => acc + items[cur].v, 0));

  ranking.sort((a, b) => b - a);

  console.log(ranking[0]);
};

// const input = `6 15
// 6 5
// 5 6
// 6 4
// 6 6
// 3 5
// 7 2`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
