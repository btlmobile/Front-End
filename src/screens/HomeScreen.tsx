import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { Button as PaperButton, IconButton, Menu, Divider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/HomeScreen.style';
import { theme } from '../themes/theme';
import { scale, verticalScale, moderateScale } from '../utils/scaling';
import AccountIcon from '../../asset/image/account_icon.svg';
import BaloIcon from '../../asset/image/balo_icon.svg';
import SettingIcon from '../../asset/image/setting_icon.svg';
import * as Sentry from '@sentry/react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ThemeMode = 'light' | 'dark';

type SvgIconProps = { size: number };

const AccountSvgIcon = ({ size }: SvgIconProps) => (
  <AccountIcon width={size} height={size} />
);
const BaloSvgIcon = ({ size }: SvgIconProps) => <BaloIcon width={size} height={size} />;
const SettingSvgIcon = ({ size }: SvgIconProps) => (
  <SettingIcon width={size} height={size} />
);

export default function HomeScreen({ route, navigation }: Readonly<Props>) {
  const isGuest = route.params?.guest ?? false;
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleGuestAccess = () => {
    Alert.alert(
      'Yêu cầu đăng nhập',
      'Bạn cần đăng nhập để sử dụng chức năng này.',
      [
        { text: 'Đăng nhập', onPress: () => navigation.navigate('Login') },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  const handleAccountPress = () => {
    if (isGuest) {
      navigation.navigate('Login');
      return;
    }
    navigation.navigate('Account', { theme: currentTheme, isGuest });
  };

  const handleBaloPress = () => {
    if (isGuest) {
      handleGuestAccess();
      return;
    }
    navigation.navigate('Balo', { theme: currentTheme, isGuest });
  };

  const { home_bg, titleColor, subtitleColor } = theme[currentTheme];
  const iconSize = 42;

  return (
    <View style={styles.container} testID="home-screen-container">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          {/* Left Column: Account + Balo (vertical) */}
          <View style={styles.topLeftIcons}>
            <View style={[styles.iconContainer, { backgroundColor: currentTheme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' }]}>
              <IconButton
                icon={AccountSvgIcon}
                size={iconSize}
                onPress={handleAccountPress}
                testID="home-account-button"
              />
            </View>
            <View style={[styles.iconContainer, { backgroundColor: currentTheme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' }]}>
              <IconButton
                icon={BaloSvgIcon}
                size={iconSize}
                onPress={handleBaloPress}
                testID="home-balo-button"
              />
            </View>
          </View>

          {/* Right Column: Settings + Chat (vertical) */}
          <View style={[styles.topRightIcons, { zIndex: 1000 }]}>
            <View style={[styles.iconContainer, { backgroundColor: currentTheme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' }]}>
              <Pressable onPress={openMenu} testID="home-settings-button">
                <SettingSvgIcon size={iconSize} />
              </Pressable>
            </View>

            <Modal
              visible={menuVisible}
              transparent
              animationType="fade"
              onRequestClose={closeMenu}
            >
              <Pressable
                style={{ flex: 1 }}
                onPress={closeMenu}
              >
                <Pressable onPress={(e) => e.stopPropagation()}>
                  <View style={{
                    position: 'absolute',
                    top: verticalScale(140),
                    right: scale(20),
                    backgroundColor: 'white',
                    borderRadius: 8,
                    padding: 8,
                    minWidth: 200,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleTheme();
                        closeMenu();
                      }}
                      style={{ padding: 12 }}
                    >
                      <Text style={{ fontSize: 16 }}>Ngày/Đêm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Introduce', { theme: currentTheme });
                        closeMenu();
                      }}
                      style={{ padding: 12 }}
                    >
                      <Text style={{ fontSize: 16 }}>Giới thiệu</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: '#e0e0e0', marginVertical: 4 }} />

                    <TouchableOpacity
                      onPress={() => {
                        Sentry.showFeedbackWidget();
                        closeMenu();
                      }}
                      style={{ padding: 12 }}
                    >
                      <Text style={{ fontSize: 16 }}>Hỗ Trợ/Phản hồi</Text>
                    </TouchableOpacity>

                    {!isGuest && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Login');
                          closeMenu();
                        }}
                        style={{ padding: 12 }}
                      >
                        <Text style={{ fontSize: 16 }}>Đăng xuất</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </Pressable>
              </Pressable>
            </Modal>

            {/* Chat Icon - NEW */}
            <View style={[styles.iconContainer, { backgroundColor: currentTheme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' }]}>
              <IconButton
                icon={() => (
                  <Image
                    source={require('../../asset/image/chat_icon.png')}
                    style={{ width: iconSize, height: iconSize }}
                  />
                )}
                size={iconSize}
                onPress={() => {
                  navigation.navigate('Chat', { theme: currentTheme, isGuest });
                }}
                testID="home-chat-button"
              />
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: titleColor }]}>Thông Điệp Trong Chai</Text>
            <View style={styles.centerContent}>
              <Text style={[styles.subtitle, { color: subtitleColor }]}>
                Viết ra lời tâm sự, thả theo sóng biển
              </Text>
              <LinearGradient
                colors={theme.common.buttonGradients.primary as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
              >
                <PaperButton
                  mode="text"
                  onPress={() =>
                    navigation.navigate('WriteMessage', { theme: currentTheme, isGuest })
                  }
                  style={styles.gradientButtonInner}
                  labelStyle={styles.buttonLabel}
                >
                  Viết thư
                </PaperButton>
              </LinearGradient>
              <LinearGradient
                colors={theme.common.buttonGradients.secondary as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.secondaryButton}
              >
                <PaperButton
                  mode="text"
                  onPress={() => navigation.navigate('Waiting', { theme: currentTheme, isGuest })}
                  style={styles.gradientButtonInner}
                  labelStyle={styles.buttonLabel}
                >
                  Dạo biển
                </PaperButton>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ImageBackground >
    </View >
  );
}
