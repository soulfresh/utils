# @thesoulfresh/utils

Useful utility functions that I find myself using frequently.

<b>colors</b><ul><li><a href="#rgbToHex">rgbToHex</a></li></ul><b>dates</b><ul><li><a href="#isDateBetween">isDateBetween</a></li><li><a href="#formatDate">formatDate</a></li><li><a href="#formatTime">formatTime</a></li><li><a href="#formatCurrency">formatCurrency</a></li><li><a href="#formatNumber">formatNumber</a></li></ul><b>functions</b><ul><li><a href="#mergeCallbacks">mergeCallbacks</a></li></ul><b>promises</b><ul><li><a href="#separateSettledPromises">separateSettledPromises</a></li></ul><b>services</b><ul><li><a href="#loggerMixin">loggerMixin</a></li></ul><b>strings</b><ul><li><a href="#combineClasses">combineClasses</a></li></ul><b>urls</b><ul><li><a href="#dataURIToBlob">dataURIToBlob</a></li><li><a href="#blobToDataURI">blobToDataURI</a></li><li><a href="#blobToImage">blobToImage</a></li><li><a href="#urlToBlob">urlToBlob</a></li><li><a href="#urlToBase64">urlToBase64</a></li></ul>

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

<a name="mergeCallbacks"></a>

## mergeCallbacks(...callback) ⇒ <code>function</code>
Combines a list of functions into a single function
that forwards its parameters to all of the functions you passed.
The functions will be called in the order they are received.
This is usefull when you want to merge callbacks
from multiple sources into one.

Additionally, any undefined or null functions will
be filtered out allowing you to pass functions
that may or not be defined at run time.

```js
const parentOnFocus = (e) => console.log('PARENT', e);
const localOnFocus = (e) => console.log('LOCAL', e);

const onFocus = mergeCallbacks(parentOnFocus, localOnFocus, otherOnFocus);

onFocus('foo');
// The following will be output to the console.
// --> 'PARENT foo'
// --> 'LOCAL foo'
// 'otherOnFocus' was filtered because it is undefined
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...callback | <code>function</code> | Any callback functions you want to combine   into a single function. |

<a name="separateSettledPromises"></a>

## separateSettledPromises(results) ⇒ <code>Array</code>
Given the results from `Promise.allSettled`, generate
an array of resolved promises and an array of rejected
promises.

**Kind**: global function  
**Returns**: <code>Array</code> - An array of the form {resolved: Promise[], rejected: Promise[]}  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Array.&lt;object&gt;</code> | The return from `Promise.allSettled` |

<a name="loggerMixin"></a>

## loggerMixin(item, [prefix], [debug])
Give an object logging functionality with correct
source line numbers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>object</code> | The object to recieve logging functionality. |
| [prefix] | <code>string</code> | An optional prefix to append to   log statements. |
| [debug] | <code>boolean</code> | Turns on the debug (vebose) logging. |

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

<a name="dataURIToBlob"></a>

## dataURIToBlob(dataURI) ⇒ <code>Blob</code>
Convert a data url into a `Blob` object.
Taken from: https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataURI | <code>string</code> | The data URI string to convert. |

<a name="blobToDataURI"></a>

## blobToDataURI(blob) ⇒ <code>Promise.&lt;string&gt;</code>
Convert a `Blob` or `File` object into a data uri string.

This uses `FileReader` under the hood.

**Kind**: global function  

| Param | Type |
| --- | --- |
| blob | <code>Blob</code> | 

<a name="blobToImage"></a>

## blobToImage(blob) ⇒ <code>Promise.&lt;Image&gt;</code>
Create an `Image` object from a `Blob` or `File` object.
It returns the Image after the data has loaded and
rejects if there are any errors loading the image.

**Kind**: global function  

| Param | Type |
| --- | --- |
| blob | <code>Blob</code> | 

<a name="urlToBlob"></a>

## urlToBlob(url) ⇒ <code>Promise.&lt;Blob&gt;</code>
Download the contents of a URL and return the data
as a `Blob`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 

<a name="urlToBase64"></a>

## urlToBase64(url) ⇒ <code>Promise.&lt;string&gt;</code>
Get the base64 data for an object at a remote URL.
This requests the data from th remote URL and then
converts the resulting Blob into a base64 encoded
data URI.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The base64 encoded data of the object at the URL.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the object/image you want data for. |

