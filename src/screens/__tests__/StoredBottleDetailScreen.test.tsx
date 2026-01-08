import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import StoredBottleDetailScreen from '../StoredBottleDetailScreen';
import { getStoredBottle, deleteStoredBottle } from '../../services/api';

jest.mock('../../services/api', () => ({
  getStoredBottle: jest.fn().mockResolvedValue({
    data: {
      id: '1',
      bottle_id: 'b1',
      bottle: { id: 'b1', type: 'text', content: 'Hello detail', creator: 'tester' },
    },
  }),
  deleteStoredBottle: jest.fn().mockResolvedValue({}),
}));

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

describe('StoredBottleDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show guest prompt', () => {
    const route = {
      key: 'test',
      name: 'StoredBottleDetail' as const,
      params: { theme: 'light' as const, stored_bottle_id: '1', isGuest: true },
    };

    const { getByText } = render(
      <StoredBottleDetailScreen navigation={mockNavigation} route={route} />
    );

    expect(getByText(/Bạn cần đăng nhập/)).toBeTruthy();
  });

  it('should alert and go back when ID is missing', async () => {
    const route = {
      key: 'test',
      name: 'StoredBottleDetail' as const,
      params: { theme: 'light' as const, stored_bottle_id: undefined, isGuest: false },
    };

    render(<StoredBottleDetailScreen navigation={mockNavigation} route={route} />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Không tìm thấy ID chai đã lưu.');
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it('should alert when loading bottle fails', async () => {
    (getStoredBottle as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const route = {
      key: 'test',
      name: 'StoredBottleDetail' as const,
      params: { theme: 'light' as const, stored_bottle_id: '1', isGuest: false },
    };

    render(<StoredBottleDetailScreen navigation={mockNavigation} route={route} />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Lỗi',
        'Không thể tải chi tiết chai đã lưu.'
      );
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it('should load bottle and allow delete', async () => {
    const route = {
      key: 'test',
      name: 'StoredBottleDetail' as const,
      params: { theme: 'light' as const, stored_bottle_id: '1', isGuest: false },
    };

    const { getByText } = render(
      <StoredBottleDetailScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      expect(getByText('Hello detail')).toBeTruthy();
    });

    fireEvent.press(getByText('Xóa'));

    await waitFor(() => {
      expect(deleteStoredBottle).toHaveBeenCalledWith('1');
      expect(Alert.alert).toHaveBeenCalled();
    });
  });

  it('should alert when delete fails', async () => {
    (deleteStoredBottle as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const route = {
      key: 'test',
      name: 'StoredBottleDetail' as const,
      params: { theme: 'light' as const, stored_bottle_id: '1', isGuest: false },
    };

    const { getByText } = render(
      <StoredBottleDetailScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      expect(getByText('Hello detail')).toBeTruthy();
    });

    fireEvent.press(getByText('Xóa'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Không thể xóa chai đã lưu.');
    });
  });
});
