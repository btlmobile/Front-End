import React, { useCallback } from 'react';
import { View, Text, ImageBackground, StatusBar, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/WaitingScreen.style';
import { theme as appTheme } from '../themes/theme';
import { getRandomBottle } from '../services/api';

export default function WaitingScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Waiting'>) {
  const currentTheme = route.params?.theme || 'light';
  const isGuest = route.params?.isGuest || false;

  useFocusEffect(
    useCallback(() => {
      const fetchBottle = async () => {
        try {
          const response = await getRandomBottle();
          navigation.navigate('FoundBottle', {
            theme: currentTheme,
            bottle: response.data,
            isGuest: isGuest,
          });
        } catch (error) {
          Alert.alert('Lỗi', 'Không tìm thấy chai nào.', [
            { text: 'OK', onPress: () => navigation.navigate('Home') },
          ]);
        }
      };

      const timer = setTimeout(fetchBottle, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation, currentTheme, isGuest])
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