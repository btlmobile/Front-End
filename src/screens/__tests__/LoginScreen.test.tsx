import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import LoginScreen from '../LoginScreen';
import api, { login } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

jest.mock('../../services/api', () => ({
  __esModule: true,
  default: { defaults: { headers: { common: {} } } },
  login: jest.fn().mockResolvedValue({ data: { token: 'token-1' } }),
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login and navigate to Home', async () => {
    const { getAllByText, getByLabelText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByLabelText('Tên đăng nhập'), 'tester');
    fireEvent.changeText(getByLabelText('Mật khẩu'), '123456');

    const [_, loginButton] = getAllByText('ĐĂNG NHẬP');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({ username: 'tester', password: '123456' });
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', 'token-1');
      expect(api.defaults.headers.common['Authorization']).toBe('Bearer token-1');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', { guest: false });
    });
  });
});
