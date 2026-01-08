import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IntroduceScreen from '../IntroduceScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const mockRoute = {
  key: 'test',
  name: 'Introduce' as const,
  params: { theme: 'light' as const },
};

describe('IntroduceScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render intro text', () => {
    const { getByText } = render(
      <IntroduceScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText(/Hãy viết một lá thư/)).toBeTruthy();
  });

  it('should go back when pressing button', () => {
    const { getByText } = render(
      <IntroduceScreen navigation={mockNavigation} route={mockRoute} />
    );
    fireEvent.press(getByText('Trở về biển'));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
