import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  Switch,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { commonStyles } from "../styles/common";
import { RootStackParamList } from "../navigation/types";

const dayBgImage = require("../../asset/image/home_bg_day.png");
const nightBgImage = require("../../asset/image/home_bg_night.png");
const settingsIcon = require("../../asset/image/gear_icon.png");
const accountIcon = require("../../asset/image/account_icon.png");
const chatIcon = require("../../asset/image/chat_icon.png");
const baloIcon = require("../../asset/image/balo_icon.png");

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [theme, setTheme] = useState('day');
  const [modalVisible, setModalVisible] = useState(false);

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
          <TouchableOpacity style={styles.accountIconContainer} onPress={() => navigation.navigate('Account', { theme: theme })}>
            <Image source={accountIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsIconContainer} onPress={() => setModalVisible(true)}>
            <Image source={settingsIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatIconContainer} onPress={() => {}}>
            <Image source={chatIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.baloIconContainer} onPress={() => navigation.navigate('Balo', { theme: theme })}>
            <Image source={baloIcon} style={styles.icon} />
          </TouchableOpacity>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.modalOption}>
                  <Text style={styles.modalText}>Ngày/Đêm</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={theme === 'night' ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTheme}
                    value={theme === 'night'}
                  />
                </View>
                <TouchableOpacity style={styles.modalOption} onPress={() => {setModalVisible(false); navigation.navigate('Introduce', { theme: theme })}}>
                  <Text style={styles.modalText}>Giới thiệu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption}>
                  <Text style={styles.modalText}>Lộ trình phát triển</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={() => {setModalVisible(false); navigation.navigate('Support', { theme: theme })}}>
                  <Text style={styles.modalText}>Hỗ Trợ/Phản hồi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
  icon: {
    width: scale(80),
    height: verticalScale(80),
  },
  accountIconContainer: {
    position: 'absolute',
    top: verticalScale(50),
    left: scale(20),
  },
  settingsIconContainer: {
    position: 'absolute',
    top: verticalScale(50),
    right: scale(20),
  },
  chatIconContainer: {
    position: 'absolute',
    bottom: verticalScale(50),
    left: scale(20),
  },
  baloIconContainer: {
    position: 'absolute',
    bottom: verticalScale(50),
    right: scale(20),
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
  },
  modalText: {
    fontSize: 18,
  },
});