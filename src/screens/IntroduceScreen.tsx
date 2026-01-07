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

type Props = NativeStackScreenProps<RootStackParamList, 'Introduce'>;

export default function IntroduceScreen({ route, navigation }: Props) {
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
              Hãy viết một lá thư về bất cứ điều gì đang chất chứa trong lòng.
              Đây là không gian an toàn để bạn trải lòng và sẻ chia.

              Khi viết xong, lá thư của bạn sẽ được đặt trong một chiếc chai và thả trôi ra đại dương số. Nó sẽ lênh đênh, mang theo những lời nhắn nhủ của bạn.

              Nghi thức viết rồi thả đi này có thể giúp bạn buông bỏ gánh nặng, lắng dịu cảm xúc, hay đơn giản là được sống thật với chính mình.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Trở về biển</Text>
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
    width: scale(922),
    height: verticalScale(1140),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  text: {
    fontSize: moderateScale(48),
    lineHeight: moderateScale(60),
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(112, 96, 255, 0.2)',
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(80),
    borderRadius: scale(45),
    marginTop: verticalScale(60),
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FDF9F2',
    fontSize: moderateScale(50),
    fontWeight: 'bold',
  },
});
