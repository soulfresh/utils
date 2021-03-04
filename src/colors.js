/**
 * Convert a color from [r, g, b] values into a HEX string.
 * @param {array|object|number} r - Either an array of 3 values, an object
 *   with 'r', 'g', and 'b' properties or a red value.
 * @param {number} [g]
 * @param {number} [b]
 * @return {string}
 */
export function rgbToHex(r, g, b) {
  const list = Array.isArray(r)
    ? r
    : typeof(r) === 'object'
    ? [r.r, r.g, r.b]
    : [r, g, b];

  return '#' + list.map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');
}
