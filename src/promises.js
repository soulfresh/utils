
/**
 * Given the results from `Promise.allSettled`, generate
 * an array of resolved promises and an array of rejected
 * promises.
 * @param {object[]} results - The return from `Promise.allSettled`
 * @return {Array} An array of the form {resolved: Promise[], rejected: Promise[]}
 */
export function separateSettledPromises(results) {
  // Break into a list of failed and a list of successes
  return results.reduce((acc, curr) => {
    if (curr.status === 'fulfilled')
      acc[0].push(curr.value);
    else
      acc[1].push(curr.reason);
    return acc;
  }, [[], []]);
}

