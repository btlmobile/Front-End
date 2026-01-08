import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { Button as PaperButton, IconButton, Menu, Divider } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/HomeScreen.style';
import { theme } from '../themes/theme';
import AccountIcon from '../../asset/image/account_icon.svg';
import BaloIcon from '../../asset/image/balo_icon.svg';
import SettingIcon from '../../asset/image/setting_icon.svg';
import * as Sentry from '@sentry/react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ThemeMode = 'light' | 'dark';

export default function HomeScreen({ route, navigation }: Props) {
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

  const { home_bg, titleColor, subtitleColor } = theme[currentTheme];
  const iconSize = 34;

  return (
    <View style={styles.container} testID="home-screen-container">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.topLeftIcons}>
            <IconButton
              icon={() => <AccountIcon width={iconSize} height={iconSize} />}
              onPress={() =>
                isGuest
                  ? handleGuestAccess()
                  : navigation.navigate('Account', { theme: currentTheme, isGuest })
              }
            />
          </View>
          <View style={styles.topRightIcons}>
            <IconButton
              icon={() => <BaloIcon width={iconSize} height={iconSize} />}
              onPress={() =>
                isGuest
                  ? handleGuestAccess()
                  : navigation.navigate('Balo', { theme: currentTheme, isGuest })
              }
            />
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  icon={() => <SettingIcon width={iconSize} height={iconSize} />}
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  toggleTheme();
                  closeMenu();
                }}
                title="Ngày/Đêm"
              />
              <Menu.Item
                onPress={() => {
                  navigation.navigate('Introduce', { theme: currentTheme });
                  closeMenu();
                }}
                title="Giới thiệu"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  Sentry.showFeedbackWidget();
                  closeMenu();
                }}
                title="Hỗ Trợ/Phản hồi"
              />
              {!isGuest && (
                <Menu.Item
                  onPress={() => {
                    navigation.navigate('Login');
                    closeMenu();
                  }}
                  title="Đăng xuất"
                />
              )}
            </Menu>
          </View>

          <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: titleColor }]}>Thông Điệp Trong Chai</Text>
            <View style={styles.centerContent}>
              <Text style={[styles.subtitle, { color: subtitleColor }]}>
                Viết ra lời tâm sự, thả theo sóng biển
              </Text>
              <PaperButton
                mode="contained"
                onPress={() =>
                  navigation.navigate('WriteMessage', { theme: currentTheme, isGuest })
                }
                style={styles.primaryButton}
                labelStyle={styles.buttonLabel}
              >
                Viết thư
              </PaperButton>
              <PaperButton
                mode="contained"
                onPress={() => navigation.navigate('Waiting', { theme: currentTheme, isGuest })}
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
