import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types";
import MessageLayout, { messageLayoutStyles } from "../components/MessageLayout";

type Props = NativeStackScreenProps<RootStackParamList, 'WriteMessage'>;

export default function WriteMessageScreen({ route, navigation }: Props) {
  const [message, setMessage] = useState("");
  const theme = route.params?.theme || 'day';

  const handleSend = () => {
    console.log("Message sent:", message);
    navigation.navigate("LoadingSend", { theme: theme });
  };

  const buttons = (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={messageLayoutStyles.buttonText}>Quay lại</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={messageLayoutStyles.buttonText}>Gửi</Text>
      </TouchableOpacity>
    </>
  );

  const textColor = theme === 'day' ? '#3E2723' : '#FFFFFF';

  return (
    <MessageLayout title="Hãy gửi thông điệp của bạn" buttons={buttons} theme={theme}>
      <TextInput
        style={[styles.textInput, { color: textColor }]}
        multiline
        placeholder="Viết điều bạn muốn nói..."
        placeholderTextColor="#777"
        onChangeText={setMessage}
        value={message}
      />
    </MessageLayout>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1200),
    textAlignVertical: 'top',
    padding: verticalScale(10),
    fontSize: moderateScale(32),
    lineHeight: moderateScale(48),
    marginTop: 0,
  },
  sendButton: {
    backgroundColor: "#0077B6",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(80),
  },
  backButton: {
    backgroundColor: "#486273",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(60),
  },
});