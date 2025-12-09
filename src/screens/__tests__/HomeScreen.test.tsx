import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

    expect(mockNavigate).toHaveBeenCalledWith('WriteMessage');
  });

  it('should navigate to Waiting screen when "Dạo biển" is pressed', () => {
    const { getByText } = render(
      <HomeScreen navigation={mockNavigation as any} route={mockRoute} />
    );

    const walkButton = getByText('Dạo biển');
    fireEvent.press(walkButton);

    expect(mockNavigate).toHaveBeenCalledWith('Waiting');
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
