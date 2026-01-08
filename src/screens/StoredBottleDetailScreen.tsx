import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, Alert, ScrollView } from 'react-native';
import { Button as PaperButton, ActivityIndicator } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/StoredBottleDetailScreen.style';
import { theme as appTheme } from '../themes/theme';
import { getStoredBottle, deleteStoredBottle, StoredBottleResponseSchema } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'StoredBottleDetail'>;

export default function StoredBottleDetailScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const storedBottleId = route.params?.stored_bottle_id;
  const isGuest = route.params?.isGuest || false;
  const { home_bg, text } = appTheme[currentTheme];
  const [storedBottle, setStoredBottle] = useState<StoredBottleResponseSchema | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isGuest) {
      return;
    }
    const fetchStoredBottle = async () => {
      if (!storedBottleId) {
        Alert.alert('Lỗi', 'Không tìm thấy ID chai đã lưu.');
        navigation.goBack();
        return;
      }
      setLoading(true);
      try {
        const response = await getStoredBottle(storedBottleId);
        setStoredBottle(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Lỗi', 'Không thể tải chi tiết chai đã lưu.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchStoredBottle();
  }, [storedBottleId, isGuest]);

  const handleDelete = async () => {
    if (!storedBottleId) return;
    try {
      await deleteStoredBottle(storedBottleId);
      Alert.alert('Thành công', 'Đã xóa chai đã lưu.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể xóa chai đã lưu.');
    }
  };

  let content: React.ReactNode;

  if (loading) {
    content = <ActivityIndicator />;
  } else if (isGuest) {
    content = (
      <>
        <Text style={[styles.messageText, { color: text }]}>
          Bạn cần đăng nhập để xem chi tiết chai đã lưu.
        </Text>
        <PaperButton
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.backButton}
          labelStyle={styles.buttonLabel}
        >
          Đăng nhập
        </PaperButton>
      </>
    );
  } else if (storedBottle) {
    content = (
      <ScrollView style={styles.messageScrollView}>
        <Text style={[styles.messageText, { color: text }]}>
          {storedBottle.bottle.content}
        </Text>
        <Text style={[styles.creatorText, { color: text }]}>
          - Creator: {storedBottle.bottle.creator || 'Anonymous'}
        </Text>
      </ScrollView>
    );
  } else {
    content = <Text style={[styles.messageText, { color: text }]}>Không tìm thấy chai.</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            {content}
            {!isGuest && (
              <View style={styles.buttonContainer}>
                <PaperButton
                  mode="contained"
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                  labelStyle={styles.buttonLabel}
                >
                  Quay lại
                </PaperButton>
                <PaperButton
                  mode="contained"
                  onPress={handleDelete}
                  style={styles.deleteButton}
                  labelStyle={styles.buttonLabel}
                  buttonColor="red"
                >
                  Xóa
                </PaperButton>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
