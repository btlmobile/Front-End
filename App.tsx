import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import FoundBottleScreen from './src/screens/FoundBottleScreen';
import WaitingScreen from './src/screens/WaitingScreen';
import WriteMessageScreen from './src/screens/WriteMessageScreen';
import ReadMessageScreen from './src/screens/ReadMessageScreen';
import LoadingSendScreen from './src/screens/LoadingSendScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import IntroduceScreen from './src/screens/IntroduceScreen';
import SupportScreen from './src/screens/SupportScreen';
import AccountScreen from './src/screens/AccountScreen';
import BaloScreen from './src/screens/BaloScreen';
import StoredBottleDetailScreen from './src/screens/StoredBottleDetailScreen';
import { RootStackParamList } from './src/navigation/types';
import { paperTheme } from './src/themes/paperTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FoundBottle" component={FoundBottleScreen} />
          <Stack.Screen name="Waiting" component={WaitingScreen} />
          <Stack.Screen name="WriteMessage" component={WriteMessageScreen} />
          <Stack.Screen name="ReadMessage" component={ReadMessageScreen} />
          <Stack.Screen name="LoadingSend" component={LoadingSendScreen} />
          <Stack.Screen name="Introduce" component={IntroduceScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Balo" component={BaloScreen} />
          <Stack.Screen name="StoredBottleDetail" component={StoredBottleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
