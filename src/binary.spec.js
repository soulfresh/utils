import {
  dataURIToBlob,
  blobToDataURI,
  blobToImage,
} from './binary';

// 10 x 10 pixel pink 50% transparent image
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z/C/noEIwDiqkL4KAbsHGO24p5ykAAAAAElFTkSuQmCC';

describe('binary', () => {
  describe('dataURIToBlob', () => {
    it('should be able to convert a data URI to a Blob object.', () => {
      const result = dataURIToBlob(image);
      expect(result).toEqual(expect.any(Blob));
      expect(result.size).toEqual(78);
      expect(result.type).toEqual('image/png');
    });
  });

  describe('blobToDataURI', () => {
    it('should be able to convert a blob into a base64 data uri.', async () => {
      const blob = dataURIToBlob(image);
      const result = await blobToDataURI(blob);
      expect(result).toEqual(expect.any(String));
      expect(result).toEqual(image);
    });

    it('should reject if the conversion fails.', () => {
      return expect(blobToDataURI('foobar')).rejects.toEqual(expect.anything());
    });
  });

  // Skipping these tests because jsDOM does not support URL.createObjectURL.
  describe('blobToImage', () => {
    xit('should return an image object.', async () => {
      const blob = dataURIToBlob(image);
      const result = await blobToImage(blob);
      expect(result).toEqual(expect.any(Image));
    });

    xit('should reject if the image cannot be created.', () => {});
    xit('should render even after the URL object is revoked.', () => {});
  });
});
