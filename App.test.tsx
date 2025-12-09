import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-screen-container')).toBeTruthy();
  });

  it('should render NavigationContainer', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });
});
