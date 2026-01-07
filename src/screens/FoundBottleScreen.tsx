import React from 'react';
import { View, Text, ImageBackground, StatusBar, Image } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/FoundBottleScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'FoundBottle'>;

export default function FoundBottleScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';
  const { home_bg, bottle_at_the_sea, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.messageBox}>
            <Image source={bottle_at_the_sea} style={styles.bottleImage} />
            <Text style={[styles.messageText, { color: text }]}>
              Tôi tình cờ tìm thấy một chiếc chai trôi dạt vào bờ. Tôi tự hỏi nó chứa đựng những bí
              mật gì...
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PaperButton
              mode="contained"
              onPress={() => navigation.navigate('Home')}
              style={styles.returnButton}
              labelStyle={styles.buttonLabel}
            >
              Trở về
            </PaperButton>
            <PaperButton
              mode="contained"
              onPress={() => navigation.navigate('ReadMessage', { theme: currentTheme })}
              style={styles.openButton}
              labelStyle={styles.buttonLabel}
            >
              Mở chai
            </PaperButton>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}