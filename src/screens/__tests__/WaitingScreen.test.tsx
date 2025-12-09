import React from 'react';
import { render, screen } from '@testing-library/react-native';
import WaitingScreen from '../WaitingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

jest.useFakeTimers();

describe('WaitingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithNavigation = () => {
    return render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Waiting">
            {(props) => <WaitingScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  it('should render without crashing', () => {
    renderWithNavigation();
    expect(screen.getByText('Đi dạo quanh bãi biển')).toBeTruthy();
  });

  it('should display title text', () => {
    renderWithNavigation();
    const title = screen.getByText('Đi dạo quanh bãi biển');
    expect(title).toBeTruthy();
  });

  it('should render container view', () => {
    const { root } = renderWithNavigation();
    expect(root).toBeTruthy();
  });
});
