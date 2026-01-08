import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FoundBottleScreen from '../FoundBottleScreen';

const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getId: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
} as any;

const mockRoute = {
  key: 'test',
  name: 'FoundBottle' as const,
  params: undefined,
};

describe('FoundBottleScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText(/Tôi tình cờ tìm thấy/)).toBeTruthy();
  });

  it('should display message text', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(
      getByText(/Tôi tình cờ tìm thấy một chiếc chai trôi dạt vào bờ/)
    ).toBeTruthy();
  });

  it('should render "Trở về" button', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Trở về')).toBeTruthy();
  });

  it('should render "Mở chai" button', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Mở chai')).toBeTruthy();
  });

  it('should navigate to Home when "Trở về" button is pressed', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );

    const returnButton = getByText('Trở về');
    fireEvent.press(returnButton);

    expect(mockNavigate).toHaveBeenCalledWith('Home', { guest: false });
  });

  it('should navigate to ReadMessage when "Mở chai" button is pressed', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );

    const openButton = getByText('Mở chai');
    fireEvent.press(openButton);

    expect(mockNavigate).toHaveBeenCalledWith('ReadMessage', {
      theme: 'light',
      bottle: undefined,
      isGuest: false,
    });
  });

  it('should render container view', () => {
    const { root } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(root).toBeTruthy();
  });

  it('should have correct message in message box', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );

    const messageText = getByText(/chứa đựng những bí mật gì/);
    expect(messageText).toBeTruthy();
  });

  it('should have button container with both buttons', () => {
    const { getByText } = render(
      <FoundBottleScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByText('Trở về')).toBeTruthy();
    expect(getByText('Mở chai')).toBeTruthy();
  });
});
