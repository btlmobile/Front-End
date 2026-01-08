import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WriteMessageScreen from '../WriteMessageScreen';
import { Alert } from 'react-native';
import { createBottle, createAnonymousBottle } from '../../services/api';

jest.mock('../../services/api', () => ({
  createBottle: jest.fn().mockResolvedValue({}),
  createAnonymousBottle: jest.fn().mockResolvedValue({}),
}));

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
  params: { theme: 'light', isGuest: false },
};

const mockedCreateBottle = createBottle as jest.Mock;
const mockedCreateAnonymousBottle = createAnonymousBottle as jest.Mock;

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

    expect(mockNavigate).toHaveBeenCalledWith('Home', { guest: false });
  });

  it('should navigate to LoadingSend when "Gửi" button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    // Enter message
    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    fireEvent.changeText(textInput, 'My test message');

    // Press send
    const sendButton = getByText('Gửi');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(mockedCreateBottle).toHaveBeenCalledWith({ content: 'My test message', type: 'text' });
      expect(mockNavigate).toHaveBeenCalledWith('LoadingSend', { theme: 'light' });
    });
  });

  it('should send anonymously when guest mode is enabled', async () => {
    const guestRoute = {
      key: 'test',
      name: 'WriteMessage' as const,
      params: { theme: 'light', isGuest: true },
    };

    const { getByText, getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={guestRoute} />
    );

    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    fireEvent.changeText(textInput, 'My test message');

    const sendButton = getByText('Gửi');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(mockedCreateAnonymousBottle).toHaveBeenCalledWith({
        content: 'My test message',
        type: 'text',
      });
      expect(mockNavigate).toHaveBeenCalledWith('LoadingSend', { theme: 'light' });
    });
  });

  it('should send anonymously when toggle is enabled', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    const textInput = getByPlaceholderText('Viết điều bạn muốn nói...');
    fireEvent.changeText(textInput, 'Anonymous message');

    fireEvent(getByRole('switch'), 'valueChange', true);

    fireEvent.press(getByText('Gửi'));

    await waitFor(() => {
      expect(mockedCreateAnonymousBottle).toHaveBeenCalledWith({
        content: 'Anonymous message',
        type: 'text',
      });
    });
  });

  it('should show alert when send fails', async () => {
    mockedCreateBottle.mockRejectedValueOnce(new Error('fail'));

    const { getByText, getByPlaceholderText } = render(
      <WriteMessageScreen navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.changeText(getByPlaceholderText('Viết điều bạn muốn nói...'), 'Fail');
    fireEvent.press(getByText('Gửi'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Không thể gửi thông điệp.');
    });
  });

  it('should enable anonymous mode for guest users', () => {
    const guestRoute = {
      key: 'test',
      name: 'WriteMessage' as const,
      params: { theme: 'light', isGuest: true },
    };

    const { getByRole } = render(
      <WriteMessageScreen navigation={mockNavigation} route={guestRoute} />
    );

    expect(getByRole('switch').props.value).toBe(true);
    expect(getByRole('switch').props.disabled).toBe(true);
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
