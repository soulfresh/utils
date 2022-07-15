import { ServiceBase } from './services'

class Example extends ServiceBase {
  constructor(debug) {
    super(null, debug)
  }
}

describe('ServiceBase', () => {
  it('should be able to extend ServiceBase.', () => {
    expect(new Example(true)).toBeTruthy();
    expect(new Example(false)).toBeTruthy();
    expect(new Example()).toBeTruthy();
  })
})
