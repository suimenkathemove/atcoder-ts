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

const alphabets = (() => {
  const arr: string[] = [];
  for (const i of range(26)) {
    arr.push(String.fromCharCode("a".charCodeAt(0) + i));
  }
  return arr;
})();
