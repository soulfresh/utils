import {
  separateSettledPromises,
} from './promises';

describe('promises', () => {
  describe('separateSettledPromises', () => {
    it('should be able to separate settled promises into two lists.', () => {
      const expectedGood = [true, 'foo', 8];
      const expectedBad = [false, 'bar', 0];
      const resolved = expectedGood.map(value => Promise.resolve(value));
      const rejected = expectedBad.map(value => Promise.reject(value));
      const all = resolved.concat(rejected);

      return Promise.allSettled(all)
        .then(separateSettledPromises)
        .then(([good, bad]) => {
          expect(good).toEqual(expectedGood);
          expect(bad).toEqual(expectedBad);
        });
    });
  });
});

