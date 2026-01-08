import React from 'react';
import { View, Text, ImageBackground, StatusBar } from 'react-native';
import { styles } from './styles/MessageLayout.style';
import { theme as appTheme } from '../themes/theme';

type MessageLayoutProps = {
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
  theme?: 'light' | 'dark';
};

export default function MessageLayout({
  title,
  children,
  buttons,
  theme = 'light',
}: Readonly<MessageLayoutProps>) {
  const { read_bg, text } = appTheme[theme];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground source={read_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: text }]}>{title}</Text>
          {children}
          <View style={styles.buttonContainer}>{buttons}</View>
        </View>
      </ImageBackground>
    </View>
  );
}
