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

const main = (inputRows: string[]): void => {
  const [N, M] = inputRows.splice(0, 1)[0].split(" ").map(Number);

  const graph: number[][] = [...range(N)].map(() => []);
  const indegree: number[] = [...range(N)].map(() => 0);
  for (const _ of range(M)) {
    let [i, j] = inputRows
      .splice(0, 1)[0]
      .split(" ")
      .map((v) => Number(v) - 1);

    graph[i].push(j);

    indegree[j]++;
  }

  const length = [...range(N)].map(() => 0);

  const done: boolean[] = [...range(N)].map(() => false);

  function* func(i: number) {
    if (done[i]) {
      return length[i];
    }

    for (const j of graph[i]) {
      length[i] = Math.max(length[i], (yield [j]) + 1);
    }

    done[i] = true;

    return length[i];
  }

  for (const i of range(N)) {
    if (indegree[i] === 0) {
      runRecursive(func, i);
    }
  }

  console.log(Math.max(...length));
};

// const input = `4 5
// 1 2
// 1 3
// 3 2
// 2 4
// 3 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
