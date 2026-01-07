import React, { useCallback } from 'react';
import { View, Text, ImageBackground, StatusBar, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/LoadingSendScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LoadingSend'>;

export default function LoadingSendScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation])
  );

  const { letter_bg, bottle_at_the_sea, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground source={letter_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <Image source={bottle_at_the_sea} style={styles.bottleImage} />
          <Text style={[styles.text, { color: text }]}>
            Chiếc chai đã rời xa bạn và thuộc về biển cả. Từ nay, bạn không còn phải mang nó theo
            nữa.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

