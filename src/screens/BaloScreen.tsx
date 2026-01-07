import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { IconButton } from 'react-native-paper';
import { scale, verticalScale, moderateScale } from '../utils/scaling';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/BaloScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Balo'>;

export default function BaloScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';
  const { home_bg, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.title, { color: text }]}>Ba-Lô lưu trữ</Text>
            <Text style={[styles.emptyText, { color: text }]}>
              Ba-lô của bạn hiện đang trống.
            </Text>
          </View>
          <IconButton
            icon="arrow-left"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            color={text}
            size={moderateScale(50)}
          />
        </View>
      </ImageBackground>
    </View>
  );
}