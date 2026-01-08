import { commonStyles } from '../common';

describe('commonStyles', () => {
  it('should define shared layout styles', () => {
    expect(commonStyles.container).toMatchObject({ flex: 1 });
    expect(commonStyles.background).toMatchObject({ flex: 1 });
  });
});
