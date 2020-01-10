export function escape(escapes: [RegExp, string][], string: string) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
}

export function repeat(character: string, count: number) {
  return Array(count + 1).join(character);
}
