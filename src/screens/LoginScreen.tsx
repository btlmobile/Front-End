import React, { useState } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/LoginScreen.style';
import { theme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            />
            <PaperTextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              mode="outlined"
            />
            <PaperButton
              mode="contained"
              onPress={() => navigation.navigate('Home')}
              style={styles.loginButton}
              labelStyle={styles.loginButtonLabel}
            >
              ĐĂNG NHẬP
            </PaperButton>
            <PaperButton
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
            >
              <Text style={styles.registerText}>Đăng ký</Text>
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}