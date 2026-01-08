import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import WaitingScreen from '../WaitingScreen';
import { getRandomBottle } from '../../services/api';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useFocusEffect: (callback: () => void) => callback(),
  };
});

jest.mock('../../services/api', () => ({
  getRandomBottle: jest.fn().mockResolvedValue({
    data: { id: 'b1', type: 'text', content: 'Hello', creator: 'tester' },
  }),
}));

jest.spyOn(Alert, 'alert');

jest.useFakeTimers();

describe('WaitingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockNavigation = {
    navigate: jest.fn(),
  } as any;

  const baseRoute = {
    key: 'test',
    name: 'Waiting' as const,
    params: { theme: 'light' as const, isGuest: false },
  };

  it('should render without crashing', () => {
    render(<WaitingScreen navigation={mockNavigation} route={baseRoute} />);
    expect(screen.getByText('Đi dạo quanh bãi biển')).toBeTruthy();
  });

  it('should display title text', () => {
    render(<WaitingScreen navigation={mockNavigation} route={baseRoute} />);
    const title = screen.getByText('Đi dạo quanh bãi biển');
    expect(title).toBeTruthy();
  });

  it('should render container view', () => {
    const { root } = render(<WaitingScreen navigation={mockNavigation} route={baseRoute} />);
    expect(root).toBeTruthy();
  });

  it('should navigate to FoundBottle after fetching bottle', async () => {
    render(<WaitingScreen navigation={mockNavigation} route={baseRoute} />);

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(getRandomBottle).toHaveBeenCalled();
      expect(mockNavigation.navigate).toHaveBeenCalledWith('FoundBottle', {
        theme: 'light',
        bottle: { id: 'b1', type: 'text', content: 'Hello', creator: 'tester' },
        isGuest: false,
      });
    });
  });

  it('should show alert when fetching bottle fails', async () => {
    (getRandomBottle as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    render(<WaitingScreen navigation={mockNavigation} route={baseRoute} />);

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Không tìm thấy chai nào.', [
        { text: 'OK', onPress: expect.any(Function) },
      ]);
    });

    const alertArgs = (Alert.alert as jest.Mock).mock.calls[0];
    alertArgs[2][0].onPress();

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', { guest: false });
  });
});
