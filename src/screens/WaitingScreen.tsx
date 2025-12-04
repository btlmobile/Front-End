import React, { useCallback } from "react";
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

const waittingImageLayer = require("../../asset/image/found_bottle_bg.png");

export default function WaitingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Waiting'>) {

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("FoundBottle");
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={waittingImageLayer}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Đi dạo quanh bãi biển</Text>
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
    color: "#F0F4F8",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginTop: verticalScale(-100), // Adjust to lift it up slightly
  },
});