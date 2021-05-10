
/**
 * Convert a data url into a `Blob` object.
 * Taken from: https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
 * @param {string} dataURI - The data URI string to convert.
 * @return {Blob}
 */
export function dataURIToBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], {type: mimeString});
}

/**
 * Convert a `Blob` or `File` object into a data uri string.
 *
 * This uses `FileReader` under the hood.
 *
 * @param {Blob} blob
 * @return {Promise<string>}
 */
export function blobToDataURI(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(blob);
  });
}

/**
 * Create an `Image` object from a `Blob` or `File` object.
 * It returns the Image after the data has loaded and
 * rejects if there are any errors loading the image.
 *
 * @param {Blob} blob
 * @return {Promise<Image>}
 */
export function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();
      const url = typeof(blob) === 'object' ? URL.createObjectURL(blob) : blob;

      image.addEventListener('load', () => {
        // Release the file from memory.
        // TODO Does this mess with the image object?
        URL.revokeObjectURL(url);

        resolve(image);
      });
      image.addEventListener('error', e => reject(e));

      image.src = url;
    } catch(error) {
      reject(error);
    }
  });
}

