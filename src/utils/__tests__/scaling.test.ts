describe('scaling utilities', () => {
  it('should scale based on screen dimensions', () => {
    jest.resetModules();
    jest.doMock('react-native', () => ({
      Dimensions: {
        get: () => ({ width: 2160, height: 4670 }),
      },
    }));
    jest.unmock('../scaling');

    const { scale, verticalScale, moderateScale, fontScale } = require('../scaling');
    const { Dimensions } = require('react-native');

    expect(Dimensions.get('window').width).toBe(2160);
    expect(scale(10)).toBe(20);
    expect(verticalScale(10)).toBe(20);
    expect(moderateScale(10)).toBe(15);
    expect(fontScale(10)).toBe(10);
    expect(fontScale(10, 0.25, 0.6, 2)).toBe(12.5);
  });
});
