import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar, Alert } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/RegisterScreen.style';
import { theme } from '../themes/theme';
import { register } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Readonly<Props>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp.');
      return;
    }
    if (username.length < 6 || username.length > 12) {
      Alert.alert('Lỗi', 'Tên đăng nhập phải từ 6 đến 12 ký tự.');
      return;
    }
    if (password.length < 6 || password.length > 12) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 đến 12 ký tự.');
      return;
    }
    setLoading(true);
    try {
      await register({ username, password });
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Đăng ký tài khoản thất bại.');
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
          <View style={styles.registerBox}>
            <Text style={styles.title}>ĐĂNG KÝ</Text>
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
            <PaperTextInput
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
              disabled={loading}
            />
            <PaperButton
              mode="contained"
              onPress={handleRegister}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
              loading={loading}
              disabled={loading}
            >
              ĐĂNG KÝ
            </PaperButton>
            <PaperButton
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
              disabled={loading}
            >
              <Text style={styles.loginText}>Đăng nhập</Text>
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
