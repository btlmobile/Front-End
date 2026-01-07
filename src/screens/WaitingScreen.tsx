import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types";
import { useFocusEffect } from '@react-navigation/native';
import { commonStyles } from "../styles/common";

const dayBgImage = require("../../asset/image/image_7.png");
const nightBgImage = require("../../asset/image/beach_night.png");

export default function WaitingScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Waiting'>) {
  const theme = route.params?.theme || 'day';

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("FoundBottle", { theme: theme });
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation, theme])
  );

  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const titleColor = theme === 'day' ? '#F0F4F8' : '#FFFFFF';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={[styles.title, { color: titleColor }]}>Đi dạo quanh bãi biển</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(60),
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginTop: verticalScale(-100), // Adjust to lift it up slightly
  },
});