import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";

const bgImage = require("../../asset/image/write_message_bg.png");

export default function WriteMessageScreen({ navigation }: any) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Message sent:", message);
    Alert.alert("Đã gửi", "Thông điệp của bạn đã được thả trôi theo biển.", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Hãy gửi thông điệp của bạn</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Viết điều bạn muốn nói..."
            placeholderTextColor="#777"
            onChangeText={setMessage}
            value={message}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  textInput: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(800),
    textAlignVertical: 'top',
    padding: verticalScale(10),
    color: '#3E2723',
    fontSize: moderateScale(32),
    lineHeight: moderateScale(48),
    marginTop: verticalScale(-350), // Pull it up even further
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: verticalScale(50),
  },
  sendButton: {
    backgroundColor: "#004D40",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(80),
  },
  backButton: {
    backgroundColor: "rgba(121, 85, 72, 0.7)",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(60),
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "bold",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "bold",
  },
});
