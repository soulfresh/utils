/**
 * Combine an arbitrary number of class strings into a single
 * class string, removing duplicates and handling
 * empty/null/undefined strings.
 * @param {...string} classes - The list of class names to merge.
 * @return {string} A deduped class string.
 */
export function combineClasses(...classes) {
  // If we recieved 0 or 1 arguments, return immediately.
  if (arguments.length <= 1) return arguments[0];

  const list = classes.reduce(
    (acc, arg) => {
      if (typeof arg === 'string') {
        const c = arg.trim().split(' ');
        if (c.length > 0) acc = acc.concat(c);
      }
      return acc;
    }
    , []
  );

  if (list.length > 0) {
    return [...new Set(list)].join(' ').trim();
  }
}
