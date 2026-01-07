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

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.registerBox}>
            <Text style={styles.title}>ĐĂNG KÝ</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#777"
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.registerButtonText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Đăng nhập</Text>
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
  registerBox: {
    width: scale(821),
    height: verticalScale(1431),
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
  registerButton: {
    width: scale(475),
    height: verticalScale(164),
    backgroundColor: 'rgba(79, 1, 108, 0.66)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: moderateScale(48),
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: moderateScale(32),
    color: '#000',
    marginTop: verticalScale(40),
  },
});