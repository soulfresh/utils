import { rgbToHex } from './colors';

describe('colors', () => {
  describe('rgbToHex', () => {
    it('should be able to convert rgb values to hex.', () => {
      expect(rgbToHex(255, 0, 255)).toEqual('#ff00ff');
    });
  });
});
