import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
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
import ChatScreen from './src/screens/ChatScreen';
import { RootStackParamList } from './src/navigation/types';
import { paperTheme } from './src/themes/paperTheme';
import * as Sentry from '@sentry/react-native';
import storage from './src/utils/storage';
import api from './src/services/api';

Sentry.init({
  dsn: 'https://d9f580b4edd55a922a8d3cbde5e7c7bb@o4510502309134336.ingest.us.sentry.io/4510502314770432',
  sendDefaultPii: true,
  enableInExpoDevelopment: true,
  environment: __DEV__ ? 'development' : 'production',
  enableLogs: true,
  integrations: [Sentry.feedbackIntegration()],
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await storage.getItem('token');
        if (token) {
          // Restore token to API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setInitialRoute('Home');
        }
      } catch (error) {
        console.log('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
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
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Sentry.wrap(App);
