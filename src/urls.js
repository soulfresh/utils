import {
  blobToDataURI,
} from './binary';

/**
 * Download the contents of a URL and return the data
 * as a `Blob`.
 *
 * @param {string} url
 * @return {Promise<Blob>}
 */
export function urlToBlob(url) {
  return new Promise(function(resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onerror = e => reject(e);
      xhr.onload = () => {
        if (xhr.status === 200)
          resolve(xhr.response);
        else
          reject(new Error("Failed to download image:" + xhr.statusText));
      };
      xhr.open("GET", url);
      xhr.send();
    }
    catch(err) {
      reject(err);
    }
  });
}

/**
 * Get the base64 data for an object at a remote URL.
 * This requests the data from th remote URL and then
 * converts the resulting Blob into a base64 encoded
 * data URI.
 *
 * @param {string} url - The url of the object/image you want data for.
 * @return {Promise<string>} The base64 encoded data of the object at the URL.
 */
export function urlToBase64(url) {
  return urlToBlob(url).then(blob => blobToDataURI(blob));
}

