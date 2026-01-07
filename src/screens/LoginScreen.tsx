import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scaling';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/common';

const bgImage = require('../../asset/image/letter_background.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.loginBox}>
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              placeholderTextColor="#777"
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="#777"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  background: {
    ...commonStyles.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: scale(821),
    height: verticalScale(1137),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: scale(64),
    alignItems: 'center',
    paddingTop: verticalScale(66),
  },
  title: {
    fontSize: moderateScale(80),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: verticalScale(100),
  },
  input: {
    width: scale(615),
    height: verticalScale(164),
    backgroundColor: 'rgba(220, 220, 220, 0.4)',
    borderRadius: scale(32),
    paddingHorizontal: scale(20),
    fontSize: moderateScale(48),
    marginBottom: verticalScale(60),
  },
  loginButton: {
    width: scale(475),
    height: verticalScale(164),
    backgroundColor: 'rgba(79, 1, 108, 0.66)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: moderateScale(48),
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: moderateScale(32),
    color: '#000',
    marginTop: verticalScale(40),
  },
});