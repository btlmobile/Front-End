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
import { commonStyles } from "../styles/common";
import { RootStackParamList } from "../navigation/types";

const bgImage = require("../../asset/image/home_bg.png");
const image2 = require("../../asset/image/image2.png");
const image4 = require("../../asset/image/image4.png");
const image5 = require("../../asset/image/image5.png");

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Image source={image2} style={styles.image2} />
          <Image source={image4} style={styles.image4} />
          <Image source={image5} style={styles.image5} />
          
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Thông Điệp Trong Chai</Text>
            
            <View style={styles.centerContent}>
              <Text style={styles.subtitle}>
                Viết ra lời tâm sự, thả theo sóng biển
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("WriteMessage")}
              >
                <Text style={styles.buttonText}>Viết thư</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Waiting")}
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
  image2: {
    position: 'absolute',
    top: verticalScale(109),
    left: scale(55),
    width: scale(81),
    height: verticalScale(92),
  },
  image4: {
    position: 'absolute',
    top: verticalScale(108),
    right: scale(67),
    width: scale(73),
    height: verticalScale(93),
  },
  image5: {
    position: 'absolute',
    top: verticalScale(260),
    right: scale(67),
    width: scale(73),
    height: verticalScale(75),
  },
  title: {
    fontSize: moderateScale(60),
    fontWeight: "bold",
    color: "#F0F4F8",
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
    color: "#F0F4F8",
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