import React from 'react';
import { View, Text, ImageBackground, StatusBar, ScrollView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/IntroduceScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Introduce'>;

export default function IntroduceScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const { home_bg, text } = appTheme[currentTheme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentScroll}
            >
              <Text style={[styles.text, { color: text }]}>
                Hãy viết một lá thư về bất cứ điều gì đang chất chứa trong lòng. Đây là không gian
                an toàn để bạn trải lòng và sẻ chia.
                {'\n\n'}
                Khi viết xong, lá thư của bạn sẽ được đặt trong một chiếc chai và thả trôi ra đại
                dương số. Nó sẽ lênh đênh, mang theo những lời nhắn nhủ của bạn.
                {'\n\n'}
                Nghi thức viết rồi thả đi này có thể giúp bạn buông bỏ gánh nặng, lắng dịu cảm xúc,
                hay đơn giản là được sống thật với chính mình.
              </Text>
            </ScrollView>
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
