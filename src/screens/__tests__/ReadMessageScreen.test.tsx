import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ReadMessageScreen from '../ReadMessageScreen';

// Mock Alert
jest.spyOn(Alert, 'alert');

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
  name: 'ReadMessage' as const,
  params: undefined,
};

describe('ReadMessageScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Một thông điệp từ biển cả')).toBeTruthy();
  });

  it('should display title text', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Một thông điệp từ biển cả')).toBeTruthy();
  });

  it('should render "Dạo biển" button', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Dạo biển')).toBeTruthy();
  });

  it('should render "Lưu giữ" button', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Lưu giữ')).toBeTruthy();
  });

  it('should display message text', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    // Check for part of the dummy message
    expect(getByText(/Lorem ipsum dolor sit amet/)).toBeTruthy();
  });

  it('should navigate to Waiting when "Dạo biển" button is pressed', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const walkButton = getByText('Dạo biển');
    fireEvent.press(walkButton);

    expect(mockNavigate).toHaveBeenCalledWith('Waiting');
  });

  it('should show alert when "Lưu giữ" button is pressed', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const keepButton = getByText('Lưu giữ');
    fireEvent.press(keepButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Đã lưu',
      'Thông điệp đã được lưu vào bộ sưu tập của bạn.'
    );
  });

  it('should render message container', () => {
    const { root } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(root).toBeTruthy();
  });

  it('should display repeated message content', () => {
    const { getByText } = render(
      <ReadMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    // The message is repeated 5 times
    const messageText = getByText(/Lorem ipsum dolor sit amet/);
    expect(messageText).toBeTruthy();
  });
});
