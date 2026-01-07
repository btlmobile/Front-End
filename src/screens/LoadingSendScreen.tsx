import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
} from "react-native";
import { verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types";
import { useFocusEffect } from '@react-navigation/native';
import { commonStyles } from "../styles/common";

const dayBgImage = require('../../asset/image/letter_background.png');
const nightBgImage = require('../../asset/image/letter_background_night.png');
const dayBottleImage = require('../../asset/image/bottle_at_the_sea_morning.png');
const nightBottleImage = require('../../asset/image/bottle_at_the_sea_night.png');

type Props = NativeStackScreenProps<RootStackParamList, 'LoadingSend'>;

export default function LoadingSendScreen({ route, navigation }: Props) {
  const theme = route.params?.theme || 'day';

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 3000); // Navigate after 3 seconds

      return () => clearTimeout(timer);
    }, [navigation])
  );

  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const bottleImage = theme === 'day' ? dayBottleImage : nightBottleImage;
  const textColor = theme === 'day' ? '#0500A0' : '#FFFFFF';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image source={bottleImage} style={styles.bottleImage} />
          <Text style={[styles.text, { color: textColor }]}>
            Chiếc chai đã rời xa bạn và thuộc về biển cả.
            Từ nay, bạn không còn phải mang nó theo nữa.
          </Text>
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
  bottleImage: {
    width: verticalScale(764),
    height: verticalScale(568),
    position: 'absolute',
    top: verticalScale(693),
  },
  text: {
    fontSize: moderateScale(48),
    fontWeight: "bold",
    textAlign: "center",
    position: 'absolute',
    top: verticalScale(1485),
  },
});
