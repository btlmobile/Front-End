import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MessageLayout from '../components/MessageLayout';
import { styles } from './styles/ReadMessageScreen.style';
import { theme as appTheme } from '../themes/theme';
import { storeBottle } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadMessage'>;

export default function ReadMessageScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';
  const bottle = route.params?.bottle;
  const isGuest = route.params?.isGuest || false;

  const handleKeep = async () => {
    if (isGuest) {
      Alert.alert('Yêu cầu đăng nhập', 'Bạn cần đăng nhập để sử dụng chức năng này.');
      return;
    }
    if (!bottle) return;
    try {
      await storeBottle({ bottle_id: bottle.id });
      Alert.alert('Đã lưu', 'Thông điệp đã được lưu vào bộ sưu tập của bạn.');
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể lưu thông điệp.');
    }
  };

  const buttons = (
    <>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('Waiting', { theme: currentTheme, isGuest })}
        style={styles.walkButton}
        labelStyle={styles.buttonLabel}
      >
        Dạo biển
      </PaperButton>
      <PaperButton
        mode="contained"
        onPress={handleKeep}
        style={styles.keepButton}
        labelStyle={styles.buttonLabel}
        disabled={isGuest}
      >
        Lưu giữ
      </PaperButton>
    </>
  );

  const { text } = appTheme[currentTheme];

  return (
    <MessageLayout title="Một thông điệp từ biển cả" buttons={buttons} theme={currentTheme}>
      <View style={styles.messageContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={[styles.messageText, { color: text }]}>{bottle?.content}</Text>
        </ScrollView>
      </View>
    </MessageLayout>
  );
}
