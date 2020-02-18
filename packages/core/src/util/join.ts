var leadingNewLinesRegExp = /^\n*/;
var trailingNewLinesRegExp = /\n*$/;

function separatingNewlines(output: string, replacement: string) {
  var outputNewLines = output.match(trailingNewLinesRegExp);
  var replacementNewLines = replacement.match(leadingNewLinesRegExp);
  var newlines = [
    outputNewLines ? outputNewLines[0] : '',
    replacementNewLines ? replacementNewLines[0] : '',
  ].sort();
  var maxNewlines = newlines[newlines.length - 1];
  return maxNewlines.length < 2 ? maxNewlines : '\n\n';
}

/**
 * Determines the new lines between the current output and the replacement
 * @private
 * @param {String} output The current conversion output
 * @param {String} replacement The string to append to the output
 * @returns The whitespace to separate the current output and the replacement
 * @type String
 */

export default function join(string1: string, string2: string) {
  var separator = separatingNewlines(string1, string2);

  // Remove trailing/leading newlines and replace with separator
  string1 = string1.replace(trailingNewLinesRegExp, '');
  string2 = string2.replace(leadingNewLinesRegExp, '');

  return string1 + separator + string2;
}
