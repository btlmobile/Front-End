import React, { useCallback } from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/WaitingScreen.style';
import { theme as appTheme } from '../themes/theme';

export default function WaitingScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Waiting'>) {
  const currentTheme = route.params?.theme || 'light';

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('FoundBottle', { theme: currentTheme });
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation, currentTheme])
  );

  const { home_bg, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: text }]}>Đi dạo quanh bãi biển</Text>
        </View>
      </ImageBackground>
    </View>
  );
}