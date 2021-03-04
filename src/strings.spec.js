import {
  combineClasses,
} from './strings';

describe('strings', function() {
  describe('combineClasses', function() {
    it('should be able to combine class lists correctly.', () => {
      debugger;
      expect(combineClasses('foo bar', 'baz')).toEqual('foo bar baz');
      expect(combineClasses('foo', 'baz')).toEqual('foo baz');
      expect(combineClasses('foo bar', 'baz bar bar')).toEqual('foo bar baz');
      expect(combineClasses('foo', 'foo')).toEqual('foo');
      expect(combineClasses('', 'foo')).toEqual('foo');
      expect(combineClasses('foo', '')).toEqual('foo');
      expect(combineClasses(undefined, 'foo')).toEqual('foo');
      expect(combineClasses('foo', undefined)).toEqual('foo');
      expect(combineClasses(undefined, undefined)).not.toBeDefined();
      expect(combineClasses('foo', 'bar', 'baz', 'boz')).toEqual('foo bar baz boz');
      expect(combineClasses('foo bar', 'baz', 'boz')).toEqual('foo bar baz boz');
      expect(combineClasses('foo bar', 'baz', null)).toEqual('foo bar baz');
    });
  });
});
