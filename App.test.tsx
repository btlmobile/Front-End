import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

jest.useFakeTimers();

describe('App', () => {
  it('should render without crashing', () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText('ĐĂNG NHẬP').length).toBeGreaterThan(0);
  });

  it('should render NavigationContainer', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });
});
