import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import BaloScreen from '../BaloScreen';
import { getStoredBottles, deleteStoredBottle } from '../../services/api';

jest.mock('../../services/api', () => ({
  getStoredBottles: jest.fn().mockResolvedValue({ data: [] }),
  deleteStoredBottle: jest.fn().mockResolvedValue({}),
}));

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

describe('BaloScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

  it('should show empty state for guest', async () => {
    const route = {
      key: 'test',
      name: 'Balo' as const,
      params: { theme: 'light' as const, isGuest: true },
    };

    const { getByText } = render(
      <BaloScreen navigation={mockNavigation} route={route} />
    );

    expect(getByText(/Ba-lô của bạn hiện đang trống/)).toBeTruthy();
    expect(getStoredBottles).not.toHaveBeenCalled();
  });

  it('should render bottles and delete one', async () => {
    (getStoredBottles as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          id: '1',
          bottle: { content: 'Hello', creator: 'test', id: 'b1', type: 'text' },
          bottle_id: 'b1',
        },
      ],
    });

    const route = {
      key: 'test',
      name: 'Balo' as const,
      params: { theme: 'light' as const, isGuest: false },
    };

    const renderResult = render(<BaloScreen navigation={mockNavigation} route={route} />);
    await act(async () => {
      await flushPromises();
    });
    const { getByText } = renderResult;

    await waitFor(() => {
      expect(getByText('Hello')).toBeTruthy();
    });

    fireEvent.press(getByText('Xóa'));

    await waitFor(() => {
      expect(deleteStoredBottle).toHaveBeenCalledWith('1');
    });
  });

  it('should alert when loading bottles fails', async () => {
    (getStoredBottles as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const route = {
      key: 'test',
      name: 'Balo' as const,
      params: { theme: 'light' as const, isGuest: false },
    };

    render(<BaloScreen navigation={mockNavigation} route={route} />);
    await act(async () => {
      await flushPromises();
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Lỗi',
        'Không thể tải danh sách chai đã lưu.'
      );
    });
  });

  it('should go back when back button is pressed', async () => {
    const route = {
      key: 'test',
      name: 'Balo' as const,
      params: { theme: 'light' as const, isGuest: false },
    };

    const renderResult = render(<BaloScreen navigation={mockNavigation} route={route} />);
    await act(async () => {
      await flushPromises();
    });
    const { UNSAFE_getByType } = renderResult;

    fireEvent.press(UNSAFE_getByType('IconButton'));

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
