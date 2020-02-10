export function escape(
  escapes: [RegExp, string | ((substring: string, ...args: any[]) => string)][],
  string: string
) {
  return escapes.reduce(function(accumulator, escape) {
    return accumulator.replace(escape[0], <string>escape[1]);
  }, string);
}
