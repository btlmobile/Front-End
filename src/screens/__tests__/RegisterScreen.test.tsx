import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import RegisterScreen from '../RegisterScreen';
import { register } from '../../services/api';

jest.mock('../../services/api', () => ({
  register: jest.fn().mockResolvedValue({}),
}));

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show alert when passwords do not match', () => {
    const { getAllByText, getByLabelText } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByLabelText('Tên đăng nhập'), 'tester1');
    fireEvent.changeText(getByLabelText('Mật khẩu'), '123456');
    fireEvent.changeText(getByLabelText('Nhập lại mật khẩu'), '123457');

    const [_, registerButton] = getAllByText('ĐĂNG KÝ');
    fireEvent.press(registerButton);

    expect(Alert.alert).toHaveBeenCalledWith('Lỗi', 'Mật khẩu không khớp.');
  });

  it('should register with valid inputs', async () => {
    const { getAllByText, getByLabelText } = render(
      <RegisterScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByLabelText('Tên đăng nhập'), 'tester1');
    fireEvent.changeText(getByLabelText('Mật khẩu'), '123456');
    fireEvent.changeText(getByLabelText('Nhập lại mật khẩu'), '123456');

    const [_, registerButton] = getAllByText('ĐĂNG KÝ');
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({ username: 'tester1', password: '123456' });
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
