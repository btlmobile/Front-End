import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AccountScreen from '../AccountScreen';
import { getUserInfo } from '../../services/api';
import * as SecureStore from 'expo-secure-store';

jest.mock('../../services/api', () => ({
  getUserInfo: jest.fn().mockResolvedValue({ data: { username: 'tester' } }),
}));

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.spyOn(Alert, 'alert');

const baseRoute = {
  key: 'test',
  name: 'Account' as const,
  params: { theme: 'light' as const, isGuest: false },
};

const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('AccountScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render guest message', () => {
    const guestRoute = {
      ...baseRoute,
      params: { theme: 'light' as const, isGuest: true },
    };

    const { getByText } = render(
      <AccountScreen navigation={mockNavigation} route={guestRoute} />
    );

    expect(getByText(/Bạn cần đăng nhập/)).toBeTruthy();
  });

  it('should load user info and allow logout', async () => {
    const { getByText } = render(
      <AccountScreen navigation={mockNavigation} route={baseRoute} />
    );

    await waitFor(() => {
      expect(getUserInfo).toHaveBeenCalled();
      expect(getByText(/Xin chào/)).toBeTruthy();
    });

    fireEvent.press(getByText('Đăng xuất'));

    await waitFor(() => {
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('token');
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });
  });
});
