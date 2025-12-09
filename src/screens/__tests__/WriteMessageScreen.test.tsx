import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import WriteMessageScreen from '../WriteMessageScreen';

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
  name: 'WriteMessage' as const,
  params: undefined,
};

describe('WriteMessageScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const { getByText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Hãy gửi thông điệp của bạn')).toBeTruthy();
  });

  it('should render text input with placeholder', () => {
    const { getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByPlaceholderText('Viết điều bạn muốn nói...')).toBeTruthy();
  });

  it('should render "Quay lại" button', () => {
    const { getByText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Quay lại')).toBeTruthy();
  });

  it('should render "Gửi" button', () => {
    const { getByText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByText('Gửi')).toBeTruthy();
  });

  it('should update message state when text input changes', () => {
    const { getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    fireEvent.changeText(textInput, 'Test message');

    expect(textInput.props.value).toBe('Test message');
  });

  it('should navigate to Home when "Quay lại" button is pressed', () => {
    const { getByText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const backButton = getByText('Quay lại');
    fireEvent.press(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('should show alert when "Gửi" button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Enter message
    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    fireEvent.changeText(textInput, 'My test message');

    // Press send
    const sendButton = getByText('Gửi');
    fireEvent.press(sendButton);

    // Check alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      'Đã gửi',
      'Thông điệp của bạn đã được thả trôi theo biển.',
      expect.any(Array)
    );
  });

  it('should navigate to Home after confirming alert', () => {
    const { getByText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const sendButton = getByText('Gửi');
    fireEvent.press(sendButton);

    // Get the alert callback and execute it
    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const okButton = alertCall[2][0]; // First button in array
    okButton.onPress();

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('should allow multiline text input', () => {
    const { getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    expect(textInput.props.multiline).toBe(true);
  });

  it('should have correct placeholder color', () => {
    const { getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    expect(textInput.props.placeholderTextColor).toBe('#777');
  });
});
