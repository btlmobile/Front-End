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
import AccountScreen from './src/screens/AccountScreen';
import BaloScreen from './src/screens/BaloScreen';
import StoredBottleDetailScreen from './src/screens/StoredBottleDetailScreen';
import { RootStackParamList } from './src/navigation/types';
import { paperTheme } from './src/themes/paperTheme';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://d9f580b4edd55a922a8d3cbde5e7c7bb@o4510502309134336.ingest.us.sentry.io/4510502314770432',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Sentry in development for Expo
  enableInExpoDevelopment: true,

  environment: __DEV__ ? 'development' : 'production',

  // Enable Logs
  enableLogs: true,
  integrations: [Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default Sentry.wrap(function App() {
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
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Balo" component={BaloScreen} />
          <Stack.Screen name="StoredBottleDetail" component={StoredBottleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
});
