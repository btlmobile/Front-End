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

type Props = NativeStackScreenProps<RootStackParamList, 'Balo'>;

export default function BaloScreen({ route, navigation }: Props) {
  const theme = route.params?.theme || 'day';

  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const textColor = theme === 'day' ? '#000' : '#FFF';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={bgImage} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.title, { color: textColor }]}>Ba-Lô lưu trữ</Text>
            <Text style={[styles.emptyText, { color: textColor }]}>
              Ba-lô của bạn hiện đang trống.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
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
    width: scale(774),
    height: verticalScale(1687),
    backgroundColor: 'rgba(228, 228, 228, 0.8)',
    borderRadius: scale(32),
    alignItems: 'center',
    padding: scale(40),
  },
  title: {
    fontSize: moderateScale(80),
    fontWeight: 'bold',
    marginTop: verticalScale(50),
    marginBottom: verticalScale(100),
  },
  emptyText: {
    fontSize: moderateScale(48),
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(234),
    right: scale(100),
    width: scale(138),
    height: verticalScale(138),
    backgroundColor: 'rgba(255, 255, 255, 0.93)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: moderateScale(80),
  },
});