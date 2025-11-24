import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import FoundBottleScreen from './src/screens/FoundBottleScreen';
import WaitingScreen from './src/screens/WaitingScreen';
import WriteMessageScreen from './src/screens/WriteMessageScreen';
import ReadMessageScreen from './src/screens/ReadMessageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FoundBottle" component={FoundBottleScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="WriteMessage" component={WriteMessageScreen} />
        <Stack.Screen name="ReadMessage" component={ReadMessageScreen} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
