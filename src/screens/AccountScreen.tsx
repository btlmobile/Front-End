import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/AccountScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';
  const { home_bg, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, { color: text }]}>
              Bạn muốn thay đổi tài khoản?
            </Text>
            <PaperButton
              mode="contained"
              onPress={() => navigation.navigate('Login')}
              style={styles.logoutButton}
              labelStyle={styles.buttonText}
              color="red"
            >
              Đăng xuất
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}