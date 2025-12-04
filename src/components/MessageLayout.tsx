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

const bgImage = require("../../asset/image/write_message_bg.png");

type MessageLayoutProps = {
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
};

export default function MessageLayout({ title, children, buttons }: MessageLayoutProps) {
  return (
    <View style={messageLayoutStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={messageLayoutStyles.background}
        resizeMode="cover"
      >
        <View style={messageLayoutStyles.overlay}>
          <Text style={messageLayoutStyles.title}>{title}</Text>
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
    color: "#5D4037",
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
