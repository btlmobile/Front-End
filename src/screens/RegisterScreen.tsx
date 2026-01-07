import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/RegisterScreen.style';
import { theme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
            />
            <PaperTextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
            />
            <PaperTextInput
              label="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
            />
            <PaperButton
              mode="contained"
              onPress={() => navigation.navigate('Home')}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
            >
              ĐĂNG KÝ
            </PaperButton>
            <PaperButton
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              <Text style={styles.loginText}>Đăng nhập</Text>
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}