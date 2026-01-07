import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { commonStyles } from "../styles/common";
import { RootStackParamList } from "../navigation/types";

const dayBgImage = require("../../asset/image/home_bg_day.png");
const nightBgImage = require("../../asset/image/home_bg_night.png");
const gearIcon = require("../../asset/image/gear_icon.png");

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [theme, setTheme] = useState('day');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'day' ? 'night' : 'day');
  };

  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const titleColor = theme === 'day' ? '#4E4330' : '#FFFFFF';
  const subtitleColor = theme === 'day' ? '#D500A7' : '#FFC2F2';

  return (
    <View style={styles.container} testID="home-screen-container">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.gearIconContainer} onPress={toggleTheme}>
            <Image source={gearIcon} style={styles.gearIcon} />
          </TouchableOpacity>
          
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: titleColor }]}>Thông Điệp Trong Chai</Text>
            
            <View style={styles.centerContent}>
              <Text style={[styles.subtitle, { color: subtitleColor }]}>
                Viết ra lời tâm sự, thả theo sóng biển
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("WriteMessage", { theme: theme })}
              >
                <Text style={styles.buttonText}>Viết thư</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Waiting", { theme: theme })}
              >
                <Text style={styles.buttonText}>Dạo biển</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  gearIconContainer: {
    position: 'absolute',
    top: verticalScale(50),
    right: scale(20),
  },
  gearIcon: {
    width: scale(50),
    height: verticalScale(50),
  },
  title: {
    fontSize: moderateScale(60),
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginTop: verticalScale(200),
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(150)
  },
  subtitle: {
    fontSize: moderateScale(35),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(100),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: "#0077B6",
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(55),
    borderRadius: scale(45),
    marginBottom: verticalScale(60),
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1
  },
  secondaryButton: {
    backgroundColor: "#486273",
    paddingVertical: verticalScale(24),
    paddingHorizontal: scale(80),
    borderRadius: scale(45),
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: moderateScale(50),
  },
});