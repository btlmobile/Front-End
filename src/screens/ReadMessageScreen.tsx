import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button as PaperButton, IconButton, ActivityIndicator } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MessageLayout from '../components/MessageLayout';
import { styles } from './styles/ReadMessageScreen.style';
import { theme as appTheme } from '../themes/theme';
import { storeBottle, reportBottle } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadMessage'>;

export default function ReadMessageScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const bottle = route.params?.bottle;
  const isGuest = route.params?.isGuest || false;
  const [reportVisible, setReportVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleKeep = async () => {
    if (isGuest) {
      Alert.alert('Yêu cầu đăng nhập', 'Bạn cần đăng nhập để sử dụng chức năng này.');
      return;
    }
    if (!bottle) return;
    try {
      await storeBottle({ bottle_id: bottle.id });
      Alert.alert(
        'Đã lưu',
        'Thông điệp đã được lưu vào bộ sưu tập của bạn.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Waiting', { theme: currentTheme, isGuest }),
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể lưu thông điệp.');
    }
  };

  const handleReportPress = () => {
    if (isGuest) {
      Alert.alert('Yêu cầu đăng nhập', 'Bạn cần đăng nhập để sử dụng chức năng này.');
      return;
    }
    setReportVisible(true);
    setErrorText(null);
  };

  const submitReport = async () => {
    if (!reason.trim()) {
      setErrorText('Vui lòng nhập lý do báo cáo.');
      return;
    }
    if (reason.trim().length < 5) {
      setErrorText('Lý do phải có ít nhất 5 ký tự.');
      return;
    }
    setLoading(true);
    setErrorText(null);
    try {
      if (bottle?.id) {
        console.log('Reporting bottle:', { bottle_id: bottle.id, reason: reason });
        await reportBottle({ bottle_id: bottle.id, reason: reason });
        Alert.alert('Thành công', 'Đã gửi báo cáo thành công.');
        setReportVisible(false);
        setReason('');
      } else {
        console.log('Bottle ID missing:', bottle);
        Alert.alert('Lỗi', 'Không tìm thấy ID của chai.');
      }
    } catch (error: any) {
      console.log('Report error:', error);
      if (error.response) {
        console.log('Report error data:', error.response.data);
        Alert.alert('Lỗi', `Gửi báo cáo thất bại: ${JSON.stringify(error.response.data)}`);
      } else {
        Alert.alert('Lỗi', 'Gửi báo cáo thất bại.');
      }
    } finally {
      setLoading(false);
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

  // Report Icon Button
  const reportButton = (
    <View style={{ backgroundColor: 'red', borderRadius: 20 }}>
      <IconButton
        icon="flag"
        iconColor="white"
        size={24}
        onPress={handleReportPress}
      />
    </View>
  );

  return (
    <MessageLayout
      title="Một thông điệp từ biển cả"
      buttons={buttons}
      theme={currentTheme}
      headerRight={reportButton}
    >
      <View style={styles.messageContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={[styles.messageText, { color: text }]}>{bottle?.content}</Text>
        </ScrollView>
      </View>

      <Modal
        visible={reportVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setReportVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '85%', backgroundColor: 'white', borderRadius: 12, padding: 20, elevation: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: 'black' }}>Báo xấu nội dung</Text>
              <Text style={{ marginBottom: 12, color: '#666' }}>Hãy cho chúng tôi biết lý do bạn báo cáo nội dung này:</Text>

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  padding: 10,
                  height: 100,
                  textAlignVertical: 'top',
                  marginBottom: errorText ? 5 : 20,
                  color: 'black'
                }}
                placeholder="Nhập lý do..."
                multiline
                value={reason}
                onChangeText={(text) => {
                  setReason(text);
                  if (text.length >= 5) setErrorText(null);
                }}
              />

              {errorText && (
                <Text style={{ color: 'red', marginBottom: 15, fontSize: 14 }}>{errorText}</Text>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                <PaperButton onPress={() => setReportVisible(false)}>Hủy</PaperButton>
                <PaperButton mode="contained" onPress={submitReport} loading={loading} disabled={loading}>
                  Gửi
                </PaperButton>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </MessageLayout>
  );
}
