import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/SupportScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Support'>;

export default function SupportScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';
  const { home_bg, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, { color: text }]}>
              Nếu bạn có muốn phản hồi về lỗi hay tính năng nào chưa vừa ý và muốn đóng góp thêm có thể liên hệ qua email: toan01224551919@gmail.com
            </Text>
          </View>
          <PaperButton
            mode="contained"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            labelStyle={styles.buttonText}
          >
            Trở về biển
          </PaperButton>
        </View>
      </ImageBackground>
    </View>
  );
}
