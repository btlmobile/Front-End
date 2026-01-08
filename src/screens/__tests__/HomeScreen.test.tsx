import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import * as Sentry from '@sentry/react-native';

jest.mock('../../../asset/image/account_icon.svg', () => {
  const React = require('react');
  return () => React.createElement('MockSvg');
});
jest.mock('../../../asset/image/balo_icon.svg', () => {
  const React = require('react');
  return () => React.createElement('MockSvg');
});
jest.mock('../../../asset/image/setting_icon.svg', () => {
  const React = require('react');
  return () => React.createElement('MockSvg');
});

const Stack = createNativeStackNavigator();

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => false),
  getId: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
};

const mockRoute = {
  key: 'test',
  name: 'Home' as const,
  params: undefined,
};

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = () => {
    return render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  it('should render without crashing', () => {
    renderWithNavigation();
    expect(screen.getByText('Thông Điệp Trong Chai')).toBeTruthy();
  });

  it('should display title correctly', () => {
    renderWithNavigation();
    const title = screen.getByText('Thông Điệp Trong Chai');
    expect(title).toBeTruthy();
  });

  it('should display subtitle correctly', () => {
    renderWithNavigation();
    const subtitle = screen.getByText('Viết ra lời tâm sự, thả theo sóng biển');
    expect(subtitle).toBeTruthy();
  });

  it('should render "Viết thư" button', () => {
    renderWithNavigation();
    const writeButton = screen.getByText('Viết thư');
    expect(writeButton).toBeTruthy();
  });

  it('should render "Dạo biển" button', () => {
    renderWithNavigation();
    const walkButton = screen.getByText('Dạo biển');
    expect(walkButton).toBeTruthy();
  });

  it('should navigate to WriteMessage screen when "Viết thư" is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    const writeButton = getByText('Viết thư');
    fireEvent.press(writeButton);

    expect(mockNavigate).toHaveBeenCalledWith('WriteMessage', { theme: 'light', isGuest: false });
  });

  it('should navigate to Waiting screen when "Dạo biển" is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    const walkButton = getByText('Dạo biển');
    fireEvent.press(walkButton);

    expect(mockNavigate).toHaveBeenCalledWith('Waiting', { theme: 'light', isGuest: false });
  });

  it('should navigate to Account when account icon is pressed', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    fireEvent.press(getByTestId('home-account-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Account', { theme: 'light', isGuest: false });
  });

  it('should navigate to Balo when balo icon is pressed', () => {
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    fireEvent.press(getByTestId('home-balo-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Balo', { theme: 'light', isGuest: false });
  });

  it('should prompt login when guest taps account icon', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const guestRoute = { ...mockRoute, params: { guest: true } };
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={guestRoute as any} />
    );

    fireEvent.press(getByTestId('home-account-button'));

    expect(alertSpy).toHaveBeenCalledWith(
      'Yêu cầu đăng nhập',
      'Bạn cần đăng nhập để sử dụng chức năng này.',
      expect.any(Array)
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('should prompt login when guest taps balo icon', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const guestRoute = { ...mockRoute, params: { guest: true } };
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={guestRoute as any} />
    );

    fireEvent.press(getByTestId('home-balo-button'));

    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });

  it('should navigate to Login from guest alert action', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const guestRoute = { ...mockRoute, params: { guest: true } };
    const { getByTestId } = render(
      <HomeScreen navigation={mockNavigation as any} route={guestRoute as any} />
    );

    fireEvent.press(getByTestId('home-account-button'));

    const alertArgs = alertSpy.mock.calls[0];
    const actions = alertArgs[2];
    actions?.[0]?.onPress?.();

    expect(mockNavigate).toHaveBeenCalledWith('Login');
    alertSpy.mockRestore();
  });

  it('should open Sentry feedback widget from menu', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    fireEvent.press(getByText('Hỗ Trợ/Phản hồi'));

    expect(Sentry.showFeedbackWidget).toHaveBeenCalled();
  });

  it('should toggle theme and open introduce screen', async () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    fireEvent.press(getByText('Ngày/Đêm'));
    fireEvent.press(getByText('Giới thiệu'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Introduce', { theme: 'dark' });
    });
  });

  it('should navigate to Login when "Đăng xuất" is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    fireEvent.press(getByText('Đăng xuất'));

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should render background image', () => {
    renderWithNavigation();
    const container = screen.getByTestId('home-screen-container');
    expect(container).toBeTruthy();
  });

  it('should have correct button styles', () => {
    renderWithNavigation();
    const writeButton = screen.getByText('Viết thư');
    const walkButton = screen.getByText('Dạo biển');

    expect(writeButton).toBeTruthy();
    expect(walkButton).toBeTruthy();
  });
});
