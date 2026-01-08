import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BaloScreen from '../BaloScreen';
import { getStoredBottles, deleteStoredBottle } from '../../services/api';

jest.mock('../../services/api', () => ({
  getStoredBottles: jest.fn().mockResolvedValue({ data: [] }),
  deleteStoredBottle: jest.fn().mockResolvedValue({}),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

describe('BaloScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    const { getByText } = render(
      <BaloScreen navigation={mockNavigation} route={route} />
    );

    await waitFor(() => {
      expect(getByText('Hello')).toBeTruthy();
    });

    fireEvent.press(getByText('Xóa'));

    await waitFor(() => {
      expect(deleteStoredBottle).toHaveBeenCalledWith('1');
    });
  });
});
