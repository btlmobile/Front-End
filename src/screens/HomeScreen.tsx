import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  Modal,
  Switch,
} from 'react-native';
import { Button as PaperButton, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/HomeScreen.style';
import { theme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const { home_bg, titleColor, subtitleColor } = theme[currentTheme];
  const { settingsIcon, accountIcon, chatIcon, baloIcon } = theme.common;

  return (
    <View style={styles.container} testID="home-screen-container">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <IconButton
            icon={() => <Image source={accountIcon} style={styles.icon} />}
            style={styles.accountIconContainer}
            onPress={() => navigation.navigate('Account', { theme: currentTheme })}
          />
          <IconButton
            icon={() => <Image source={settingsIcon} style={styles.icon} />}
            style={styles.settingsIconContainer}
            onPress={() => setModalVisible(true)}
          />
          <IconButton
            icon={() => <Image source={chatIcon} style={styles.icon} />}
            style={styles.chatIconContainer}
            onPress={() => {console.log("Chat icon pressed");}}
          />
          <IconButton
            icon={() => <Image source={baloIcon} style={styles.icon} />}
            style={styles.baloIconContainer}
            onPress={() => navigation.navigate('Balo', { theme: currentTheme })}
          />

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
                <IconButton
                  icon="close"
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <View style={styles.modalOption}>
                  <Text style={styles.modalText}>Ngày/Đêm</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={currentTheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTheme}
                    value={currentTheme === 'dark'}
                  />
                </View>
                <PaperButton
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Introduce', { theme: currentTheme });
                  }}
                >
                  <Text style={styles.modalText}>Giới thiệu</Text>
                </PaperButton>
                <PaperButton style={styles.modalOption}>
                  <Text style={styles.modalText}>Lộ trình phát triển</Text>
                </PaperButton>
                <PaperButton
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Support', { theme: currentTheme });
                  }}
                >
                  <Text style={styles.modalText}>Hỗ Trợ/Phản hồi</Text>
                </PaperButton>
                <PaperButton
                  style={styles.modalOption}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.modalText}>Đăng xuất</Text>
                </PaperButton>
              </View>
            </View>
          </Modal>

          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: titleColor }]}>Thông Điệp Trong Chai</Text>

            <View style={styles.centerContent}>
              <Text style={[styles.subtitle, { color: subtitleColor }]}>
                Viết ra lời tâm sự, thả theo sóng biển
              </Text>

              <PaperButton
                mode="contained"
                onPress={() => navigation.navigate('WriteMessage', { theme: currentTheme })}
                style={styles.primaryButton}
                labelStyle={styles.buttonLabel}
              >
                Viết thư
              </PaperButton>

              <PaperButton
                mode="contained"
                onPress={() => navigation.navigate('Waiting', { theme: currentTheme })}
                style={styles.secondaryButton}
                labelStyle={styles.buttonLabel}
              >
                Dạo biển
              </PaperButton>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}