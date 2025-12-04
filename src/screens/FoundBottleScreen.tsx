import React from "react";
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
import { RootStackParamList } from "../navigation/types";
import { commonStyles } from "../styles/common";

const bgImage = require("../../asset/image/found_bottle_bg.png");
const bottleImage = require("../../asset/image/bottle-6016e4.png");

type Props = NativeStackScreenProps<RootStackParamList, 'FoundBottle'>;

export default function FoundBottleScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.messageBox}>
            <Image source={bottleImage} style={styles.bottleImage} />
            <Text style={styles.messageText}>
              Tôi tình cờ tìm thấy một chiếc chai trôi dạt vào bờ. Tôi tự hỏi nó
              chứa đựng những bí mật gì...
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Trở về</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => navigation.navigate("ReadMessage")}
            >
              <Text style={styles.buttonText}>Mở chai</Text>
            </TouchableOpacity>
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
    paddingHorizontal: scale(24),
  },
  messageBox: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: scale(60),
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(30),
    alignItems: "center",
    width: '90%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  bottleImage: {
    width: scale(393),
    height: verticalScale(262),
    marginBottom: verticalScale(40),
    borderRadius: scale(20),
  },
  messageText: {
    color: "#F0F4F8",
    fontSize: moderateScale(32),
    textAlign: "center",
    marginBottom: verticalScale(40),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '80%',
    marginTop: verticalScale(30),
  },
  returnButton: {
    backgroundColor: "#486273",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(30),
    borderRadius: scale(25),
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  openButton: {
    backgroundColor: "#0077B6",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(30),
    borderRadius: scale(25),
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(32),
    fontWeight: "bold",
  },
});