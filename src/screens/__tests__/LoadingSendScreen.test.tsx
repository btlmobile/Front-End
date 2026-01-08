import React from 'react';
import { render, act } from '@testing-library/react-native';
import LoadingSendScreen from '../LoadingSendScreen';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (cb: () => void) => cb(),
  };
});

const mockNavigation = {
  navigate: jest.fn(),
} as any;

const mockRoute = {
  key: 'test',
  name: 'LoadingSend' as const,
  params: { theme: 'light' as const },
};

describe('LoadingSendScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should navigate to Home after timeout', () => {
    render(<LoadingSendScreen navigation={mockNavigation} route={mockRoute} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });
});
