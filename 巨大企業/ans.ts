function* range(
  ...args: [end: number] | [start: number, end: number, step?: number]
) {
  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

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
  const N = Number(lines.splice(0, 1));
  const ps = lines.splice(0, N);
  const Q = Number(lines.splice(0, 1));
  const qs = lines.splice(0, Q);

  let root = -1;

  const graph: number[][] = (() => {
    const arr: number[][] = [];
    for (const _ of range(N)) {
      arr.push([]);
    }

    for (const i of range(N)) {
      const p = Number(ps[i]);

      if (p === -1) {
        root = i;
      } else {
        arr[p - 1].push(i);
      }
    }

    return arr;
  })();

  const queries: [number, number][][] = (() => {
    const arr: [number, number][][] = [];
    for (const _ of range(N)) {
      arr.push([]);
    }

    for (const i of range(Q)) {
      const [a, b] = qs[i].split(" ").map(Number);

      arr[a - 1].push([i, b - 1]);
    }

    return arr;
  })();

  const ans: boolean[] = (() => {
    const arr: boolean[] = [];

    for (const _ of range(Q)) {
      arr.push(false);
    }

    return arr;
  })();

  const boss: boolean[] = (() => {
    const arr: boolean[] = [];

    for (const _ of range(N)) {
      arr.push(false);
    }

    return arr;
  })();

  function* dfs(i: number) {
    for (const [q, b] of queries[i]) {
      ans[q] = boss[b];
    }

    boss[i] = true;

    for (const j of graph[i]) {
      yield [j];
    }

    boss[i] = false;
  }

  runRecursive(dfs, root);

  for (const i of range(Q)) {
    console.log(ans[i] ? "Yes" : "No");
  }
};

// const input = `7
// -1
// 1
// 1
// 2
// 2
// 3
// 3
// 6
// 7 1
// 4 1
// 2 3
// 5 1
// 5 2
// 2 5`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
