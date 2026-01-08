import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Alert } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/LoginScreen.style';
import { theme } from '../themes/theme';
import api, { login } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Readonly<Props>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login({ username, password });
      const { token } = response.data;
      await SecureStore.setItemAsync('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigation.navigate('Home', { guest: false });
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={theme.light.letter_bg}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.loginBox}>
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            <PaperTextInput
              label="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />
            <PaperTextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
              disabled={loading}
            />
            <PaperButton
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              labelStyle={styles.loginButtonLabel}
              loading={loading}
              disabled={loading}
            >
              ĐĂNG NHẬP
            </PaperButton>
            <PaperButton
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
              disabled={loading}
            >
              <Text style={styles.registerText}>Đăng ký</Text>
            </PaperButton>
            <PaperButton
              onPress={() => navigation.navigate('Home', { guest: true })}
              style={styles.guestButton}
              disabled={loading}
            >
              <Text style={styles.guestText}>Tiếp tục không cần đăng nhập</Text>
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
