import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/scaling';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/common';

const dayBgImage = require('../../asset/image/home_bg_day.png');
const nightBgImage = require('../../asset/image/home_bg_night.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({ route, navigation }: Props) {
  const theme = route.params?.theme || 'day';

  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const textColor = theme === 'day' ? '#003878' : '#FFFFFF';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, { color: textColor }]}>
              Bạn muốn thay đổi tài khoản?
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Đăng xuất</Text>
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
  contentBox: {
    width: scale(922),
    height: verticalScale(699),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  text: {
    fontSize: moderateScale(80),
    lineHeight: moderateScale(100),
    textAlign: 'center',
    marginBottom: verticalScale(100),
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 0, 4, 0.71)',
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(80),
    borderRadius: scale(45),
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FDF9F2',
    fontSize: moderateScale(50),
    fontWeight: 'bold',
  },
});