import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';
import TestScreen from '../TestScreen';

describe('TestScreen', () => {
  it('should render the background image', () => {
    const { UNSAFE_getByType } = render(<TestScreen />);

    expect(UNSAFE_getByType(Image)).toBeTruthy();
  });
});
