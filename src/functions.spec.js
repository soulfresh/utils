import {
  mergeCallbacks,
} from './functions';

describe('functions', () => {
  describe('mergeCallbacks', () => {
    it('should call the callbacks in order.', () => {
      let callOrder = '';
      const spy1 = jest.fn(() => callOrder += '1');
      const spy2 = jest.fn(() => callOrder += '2');
      const spy3 = jest.fn(() => callOrder += '3');

      const result = mergeCallbacks(spy1, spy2, spy3);
      expect(result).toEqual(expect.any(Function));

      result('foo');
      [spy1, spy2, spy3].forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('foo');
      });

      expect(callOrder).toEqual('123');
    });

    it('should skip non-function arguments.', () => {
      const spy1 = jest.fn();
      const result = mergeCallbacks(null, undefined, 0, 1, true, false, 'foo', {}, spy1);

      expect(() => result('bar')).not.toThrow();
      expect(spy1).toHaveBeenCalledTimes(1);
      expect(spy1).toHaveBeenCalledWith('bar');
    });
  });
});
