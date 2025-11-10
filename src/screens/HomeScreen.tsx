import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const bgImage = require("../../asset/image/homepage.jpg");
const icon1 = require("../../asset/icon/icon1.jpg");
const icon2 = require("../../asset/icon/icon2.jpg");

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={bgImage}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.topBar}>
          <View style={styles.leftIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation?.navigate ? navigation.navigate("Icon2Screen") : console.log("Icon 2")}
            >
              <Image source={icon2} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation?.navigate ? navigation.navigate("Icon1Screen") : console.log("Icon 1")}
            >
              <Image source={icon1} style={styles.iconImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation?.navigate ? navigation.navigate("Settings") : console.log("Settings")}
          >
            <Ionicons name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.title}>Thông Điệp Trong Chai</Text>
          <Text style={styles.subtitle}>
            Viết ra cảm xúc của bạn, thả theo sóng biển
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation?.navigate
                ? navigation.navigate("WriteLetter")
                : console.log("Viết thư")
            }
          >
            <Text style={styles.buttonText}>Viết thư</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation?.navigate
                ? navigation.navigate("WalkBeach")
                : console.log("Dạo biển")
            }
          >
            <Text style={styles.buttonText}>Dạo biển</Text>
          </TouchableOpacity>
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
  topBar: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight || 40 : 40,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcons: {
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-start",
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: "#4C3FF2",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 999,
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: "#6A4DFD",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 999,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
