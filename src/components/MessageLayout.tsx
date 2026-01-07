import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import { commonStyles } from "../styles/common";

const dayBgImage = require("../../asset/image/read_bg.png");
const nightBgImage = require("../../asset/image/read_bg_night.png");

type MessageLayoutProps = {
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
  theme?: 'day' | 'night';
};

export default function MessageLayout({ title, children, buttons, theme = 'day' }: MessageLayoutProps) {
  const bgImage = theme === 'day' ? dayBgImage : nightBgImage;
  const titleColor = theme === 'day' ? '#5D4037' : '#FFFFFF';

  return (
    <View style={messageLayoutStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={messageLayoutStyles.background}
        resizeMode="cover"
      >
        <View style={messageLayoutStyles.overlay}>
          <Text style={[messageLayoutStyles.title, { color: titleColor }]}>{title}</Text>
          {children}
          <View style={messageLayoutStyles.buttonContainer}>
            {buttons}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export const messageLayoutStyles = StyleSheet.create({
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
    paddingHorizontal: scale(24),
  },
  title: {
    fontSize: moderateScale(50),
    fontWeight: "bold",
    textAlign: "center",
    position: 'absolute',
    top: verticalScale(100),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: verticalScale(50),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "bold",
  },
});
