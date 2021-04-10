// @ts-nocheck
const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
): number[] => {
  const arr: number[] = [];

  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

function runRecursive<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) {
  // 最終結果を受け取るオブジェクトを用意
  const rootCaller = {
    lastReturnValue: null,
  };
  // 自前のコールスタックを用意
  const callStack: any[] = [];
  // 最初の関数呼び出しを追加
  callStack.push({
    iterator: func(...args),
    lastReturnValue: null,
    caller: rootCaller,
  });
  while (callStack.length > 0) {
    const stackFrame = callStack[callStack.length - 1];
    const { iterator, lastReturnValue, caller } = stackFrame;
    // 関数の実行を再開
    const { value, done } = iterator.next(lastReturnValue);
    if (done) {
      // 関数がreturnしたので親に返り値を記録
      caller.lastReturnValue = value;
      callStack.pop();
    } else {
      // 関数がyieldした（valueは再帰呼び出しの引数リスト）
      callStack.push({
        iterator: func(...value),
        lastReturnValue: null,
        caller: stackFrame,
      });
    }
  }
  return rootCaller.lastReturnValue;
}

const main = (lines: string[]): void => {
  const [H, W] = lines[0].split(" ").map(Number);
  const S = lines.slice(1).map((str) => str.split(""));
  const [[sy, sx], [gy, gx]] = (() => {
    let sysx = [0, 0];
    let gygx = [0, 0];
    S.forEach((sRow, y) => {
      sRow.forEach((s, x) => {
        switch (s) {
          case "s":
            sysx = [y, x];
            break;
          case "g":
            gygx = [y, x];
            break;
        }
      });
    });
    return [sysx, gygx];
  })();

  const visited = range(H).map(() => range(W).map(() => false));

  function* dfs(y: number, x: number) {
    visited[y][x] = true;

    const allSides: [
      [number, number],
      [number, number],
      [number, number],
      [number, number]
    ] = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];
    for (const [y2, x2] of allSides) {
      if (!(0 <= y2 && y2 < H && 0 <= x2 && x2 < W)) {
        continue;
      }

      if (S[y2][x2] === "#") {
        continue;
      }

      if (!visited[y2][x2]) {
        yield [y2, x2];
      }
    }
  }

  runRecursive(dfs, sy, sx);

  console.log(visited[gy][gx] ? "Yes" : "No");
};

// const input = `4 4
// ...s
// ....
// ....
// .g..`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
