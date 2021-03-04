# @thesoulfresh/utils
[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

Useful utility functions that I find myself using frequently.

<b>colors</b><ul><li><a href="#rgbToHex">rgbToHex</a></li></ul><b>dates</b><ul><li><a href="#isDateBetween">isDateBetween</a></li><li><a href="#formatDate">formatDate</a></li><li><a href="#formatTime">formatTime</a></li><li><a href="#formatCurrency">formatCurrency</a></li><li><a href="#formatNumber">formatNumber</a></li></ul><b>strings</b><ul><li><a href="#combineClasses">combineClasses</a></li></ul><b>urls</b><ul><li><a href="#dataURItoBlob">dataURItoBlob</a></li></ul>


<a name="rgbToHex"></a>

## rgbToHex(r, [g], [b]) ⇒ <code>string</code>
Convert a color from [r, g, b] values into a HEX string.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>array</code> \| <code>object</code> \| <code>number</code> | Either an array of 3 values, an object   with 'r', 'g', and 'b' properties or a red value. |
| [g] | <code>number</code> |  |
| [b] | <code>number</code> |  |

<a name="isDateBetween"></a>

## isDateBetween(date, minDate, maxDate) ⇒ <code>boolean</code>
Determines if a date is between two dates inclusively.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> \| <code>Date</code> | The date string to check. |
| minDate | <code>string</code> | The start of the date range. |
| maxDate | <code>string</code> | The end of the date range. |

<a name="formatDate"></a>

## formatDate(date, [dateStyle], [locale]) ⇒
Format a date string for display in the user's locale.

**Kind**: global function  
**Returns**: The formatted date string or else an empty string if the date is falsy.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | The date string to parse and format. |
| [dateStyle] | <code>string</code> | The dateStyle value as described by the    [`Intl` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat) |
| [locale] | <code>string</code> | A specific locale to use. This default's   to the browser default locale. |

<a name="formatTime"></a>

## formatTime(date, [timeZone], [locale]) ⇒ <code>string</code>
Format a date string for display in the user's locale using the time value only.

**Kind**: global function  
**Returns**: <code>string</code> - The fromatted date string or else an empty string if the date is falsy.  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>string</code> \| <code>Date</code> | The date string to parse and format. |
| [timeZone] | <code>string</code> | A specific timezone to set. |
| [locale] | <code>string</code> | A specific locale to use. This default's   to the browser default locale. |

<a name="formatCurrency"></a>

## formatCurrency(pennies, currency, [locale]) ⇒ <code>string</code>
Format a currency value for display in the user's locale.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pennies | <code>number</code> | The value in pennies to parse into a currency. |
| currency | <code>string</code> | The currency to use (ex. USD, GBP). |
| [locale] | <code>string</code> | A specific locale to use. This default's   to the browser default locale. |

<a name="formatNumber"></a>

## formatNumber(value, [locale]) ⇒ <code>string</code>
Format a number for display in the user's locale (ex 1,000.00)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The number to format. |
| [locale] | <code>string</code> | A specific locale to use. This default's   to the browser default locale. |

<a name="combineClasses"></a>

## combineClasses(...classes) ⇒ <code>string</code>
Combine an arbitrary number of class strings into a single
class string, removing duplicates and handling
empty/null/undefined strings.

**Kind**: global function  
**Returns**: <code>string</code> - A deduped class string.  

| Param | Type | Description |
| --- | --- | --- |
| ...classes | <code>string</code> | The list of class names to merge. |

<a name="dataURItoBlob"></a>

## dataURItoBlob(dataURI) ⇒ <code>Blob</code>
Convert a data url into a `Blob` object.
Taken from: https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataURI | <code>string</code> | The data URI string to convert. |

