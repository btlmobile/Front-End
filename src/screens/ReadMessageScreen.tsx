import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types";

const bgImage = require("../../asset/image/write_message_bg.png");

const dummyMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin sed quam. Integer interdum lectus ac quam. Ut magna. Suspendisse eleifend, ligula eu fringilla PICTOGRAM, felis justo CONVallis nus, et ultrices diam lacus ac Un.";

type Props = NativeStackScreenProps<RootStackParamList, 'ReadMessage'>;

export default function ReadMessageScreen({ navigation }: Props) {

  const handleKeep = () => {
    Alert.alert("Đã lưu", "Thông điệp đã được lưu vào bộ sưu tập của bạn.");
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
          <Text style={styles.title}>Một thông điệp từ biển cả</Text>
          <View style={styles.messageContainer}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={styles.messageText}>{dummyMessage.repeat(5)}</Text>
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.walkButton}
              onPress={() => navigation.navigate("Waiting")}
            >
              <Text style={styles.buttonText}>Dạo biển</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keepButton} onPress={handleKeep}>
              <Text style={styles.buttonText}>Lưu giữ</Text>
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
  messageContainer: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1200),
    padding: verticalScale(10),
    marginTop: 0,
  },
  messageText: {
    color: '#3E2723',
    fontSize: moderateScale(32),
    lineHeight: moderateScale(48),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: verticalScale(50),
  },
  keepButton: {
    backgroundColor: "rgba(85, 107, 47, 0.8)",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(80),
  },
  walkButton: {
    backgroundColor: "rgba(141, 110, 99, 0.8)",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(60),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(40),
    fontWeight: "bold",
  },
});
