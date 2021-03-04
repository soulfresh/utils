

/**
 * Determines if a date is between two dates inclusively.
 *
 * @param {string|Date} date The date string to check.
 * @param {string} minDate The start of the date range.
 * @param {string} maxDate The end of the date range.
 * @return {boolean}
 */
export function isDateBetween(date, minDate, maxDate) {
  const time = new Date(date).getTime();
  const minTime = new Date(minDate).getTime();
  const maxTime = new Date(maxDate).getTime();
  if (minTime > maxTime) {
    console.warn("The minDate should be before the maxDate");
    return false;
  }
  return minTime <= time && time <= maxTime;
}

//// LOCALIZATION

// Firefox throws an error when using dateStyle and year/month/day together
// so test for support here.
function supportsDateStyle() {
  try {
    return !!(new Intl.DateTimeFormat(undefined, {dateStyle: 'short', year: '2-digit'}));
  } catch(e) {
    return false;
  }
}

// TODO Figure out if this breaks tree shaking for everything
// const supportsDateStyle = (function() {
//   try {
//     return !!(new Intl.DateTimeFormat(undefined, {dateStyle: 'short', year: '2-digit'}));
//   } catch(e) {
//     return false;
//   }
// })();


/**
 * Format a date string for display in the user's locale.
 *
 * @param {string} date The date string to parse and format.
 * @param {string} [dateStyle] - The dateStyle value as described by the 
 *   [`Intl` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
 * @param {string} [locale] A specific locale to use. This default's
 *   to the browser default locale.
 * @return The formatted date string or else an empty string if the date is falsy.
 */
export function formatDate(date, dateStyle="short", locale) {
  if (!date) {
    return '';
  }
  const fallbackOptions = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC', // This should prevent converting the date to local time.
  }

  if (dateStyle === 'long') {
    fallbackOptions.year = 'numeric';
    fallbackOptions.weekday = 'short';
    fallbackOptions.month = 'long';
  }

  const options = supportsDateStyle()
    ? { dateStyle, ...fallbackOptions }
    : fallbackOptions;

  const formatter = new Intl.DateTimeFormat(locale || undefined, options);
  return formatter.format(new Date(date));
}

/**
 * Format a date string for display in the user's locale using the time value only.
 *
 * @param {string|Date} date The date string to parse and format.
 * @param {string} [timeZone] A specific timezone to set.
 * @param {string} [locale] A specific locale to use. This default's
 *   to the browser default locale.
 * @return {string} The fromatted date string or else an empty string if the date is falsy.
 */
export function formatTime(date, timeZone, locale) {
  const options = {
    timeStyle: 'short'
  };
  if (timeZone) {
    options.timeZone = timeZone;
  }
  const formatter = new Intl.DateTimeFormat(locale || undefined, options);
  return formatter.format(new Date(date));
}

/**
 * Format a currency value for display in the user's locale.
 *
 * @param {number} pennies - The value in pennies to parse into a currency.
 * @param {string} currency - The currency to use (ex. USD, GBP).
 * @param {string} [locale] A specific locale to use. This default's
 *   to the browser default locale.
 * @return {string}
 */
export function formatCurrency(pennies, currency='USD', locale) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
  }).format(pennies / 100);
}

/**
 * Format a number for display in the user's locale (ex 1,000.00)
 * @param {number} value - The number to format.
 * @param {string} [locale] A specific locale to use. This default's
 *   to the browser default locale.
 * @return {string}
 */
export function formatNumber(value, locale) {
  const num = new Intl.NumberFormat(locale);
  return num.format(value);
}

