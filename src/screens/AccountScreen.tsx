import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, Alert } from 'react-native';
import { Button as PaperButton, ActivityIndicator } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/AccountScreen.style';
import { theme as appTheme } from '../themes/theme';
import { getUserInfo, UserResponseSchema } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const isGuest = route.params?.isGuest || false;
  const { home_bg, text } = appTheme[currentTheme];
  const [user, setUser] = useState<UserResponseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isGuest) {
      return;
    }
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUserInfo();
        setUser(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [isGuest]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token');
    navigation.navigate('Login');
  };

  let content: React.ReactNode;

  if (loading) {
    content = <ActivityIndicator />;
  } else if (isGuest) {
    content = (
      <>
        <Text style={[styles.text, { color: text }]}>
          Bạn cần đăng nhập để xem thông tin tài khoản.
        </Text>
        <PaperButton
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutButton}
          labelStyle={styles.buttonText}
        >
          Đăng nhập
        </PaperButton>
      </>
    );
  } else {
    content = (
      <>
        <Text style={[styles.text, { color: text }]}>Xin chào, {user?.username}!</Text>
        <PaperButton
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.buttonText}
          buttonColor="red"
        >
          Đăng xuất
        </PaperButton>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>{content}</View>
        </View>
      </ImageBackground>
    </View>
  );
}
