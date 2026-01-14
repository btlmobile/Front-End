import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/ChatScreen.style';
import { theme as appTheme } from '../themes/theme';
import api, { getGlobalChat, sendGlobalChat, GlobalChatMessage } from '../services/api';
import storage from '../utils/storage';
import AccountIcon from '../../asset/image/account_icon.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const DEFAULT_LIMIT = 50;

const resolveMessageText = (message: GlobalChatMessage) =>
  message.content ?? (message as { message?: string }).message ?? '';

const resolveSender = (message: GlobalChatMessage) =>
  message.creator ??
  message.username ??
  message.user?.username ??
  'Anonymous';

const resolveTimestamp = (message: GlobalChatMessage) =>
  message.created_at ?? message.createdAt ?? message.time ?? '';

const formatTime = (value?: string | number) => {
  if (!value) return '';

  let parsed: Date;

  // Handle number or numeric string (Unix timestamp)
  const numericValue = Number(value);
  if (!Number.isNaN(numericValue)) {
    // Check if it's seconds (10 digits) or milliseconds (13 digits)
    // Current seconds (2026) is ~1.7e9, milliseconds is ~1.7e12
    // If less than 1e11, assume seconds
    if (numericValue < 100000000000) {
      parsed = new Date(numericValue * 1000);
    } else {
      parsed = new Date(numericValue);
    }
  } else {
    // Handle ISO strings
    let dateStr = String(value);
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateStr)) {
      dateStr = dateStr.replace(' ', 'T');
    }
    if (!/Z|[+-]\d{2}:?\d{2}$/.test(dateStr) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateStr)) {
      dateStr += 'Z';
    }
    parsed = new Date(dateStr);
  }

  if (Number.isNaN(parsed.getTime())) return String(value);

  const now = new Date();
  const isToday = parsed.getDate() === now.getDate() &&
    parsed.getMonth() === now.getMonth() &&
    parsed.getFullYear() === now.getFullYear();

  const timeString = parsed.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  const dateString = parsed.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
  });

  return `${dateString} ${timeString}`;
};

export default function ChatScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const isGuest = route.params?.isGuest || false;
  const { home_bg } = appTheme[currentTheme];
  const [messages, setMessages] = useState<GlobalChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [draft, setDraft] = useState('');

  const ensureAuthHeader = useCallback(async () => {
    if (api.defaults.headers.common['Authorization']) return;
    const token = await storage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const fetchMessages = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      await ensureAuthHeader();
      const response = await getGlobalChat(DEFAULT_LIMIT);
      const payload = response.data as unknown;
      const list = Array.isArray(payload)
        ? payload
        : (payload as { messages?: GlobalChatMessage[]; data?: GlobalChatMessage[] })
          ?.messages ??
        (payload as { messages?: GlobalChatMessage[]; data?: GlobalChatMessage[] })
          ?.data ??
        [];
      setMessages(list);
    } catch (error: any) {
      console.log('Error loading chat:', error);
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMessages();
      const intervalId = setInterval(() => {
        fetchMessages(true);
      }, 3000); // Auto refresh every 3 seconds

      return () => clearInterval(intervalId);
    }, [fetchMessages])
  );

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (isGuest) {
      Alert.alert('Yêu cầu đăng nhập', 'Bạn cần đăng nhập để gửi tin nhắn.');
      return;
    }
    setSending(true);
    try {
      await ensureAuthHeader();
      await sendGlobalChat(trimmed);
      setDraft('');
      fetchMessages();
    } catch (error: any) {
      console.log('Error sending chat:', error);
      if (error.response) {
        console.log('Error sending data:', error.response.data);
        Alert.alert('Lỗi', `Không thể gửi tin nhắn: ${JSON.stringify(error.response.data)}`);
      } else {
        Alert.alert('Lỗi', 'Không thể gửi tin nhắn.');
      }
    } finally {
      setSending(false);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: GlobalChatMessage }) => {
      const sender = resolveSender(item);
      const messageText = resolveMessageText(item);
      const timeText = formatTime(resolveTimestamp(item));
      return (
        <View style={styles.messageItem}>
          <View style={styles.messageHeader}>
            <View style={styles.senderBadge}>
              <Text style={styles.senderText}>{sender}</Text>
            </View>
            {timeText ? <Text style={styles.timeText}>{timeText}</Text> : null}
          </View>
          <Text style={styles.messageText}>{messageText}</Text>
        </View>
      );
    },
    []
  );

  const isSendingDisabled = useMemo(() => sending || !draft.trim(), [draft, sending]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >


          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <View style={styles.chatCard}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Nhóm trò chuyện</Text>
            </View>


            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id ?? index}`}
              style={styles.messageListContainer}
              contentContainerStyle={styles.messageList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                loading ? (
                  <View style={styles.loadingState}>
                    <ActivityIndicator size="small" color="#4A4A4A" />
                  </View>
                ) : null
              }
            />

            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Gõ tin nhắn..."
                placeholderTextColor="#9A9A9A"
                value={draft}
                onChangeText={setDraft}
                editable={!sending}
              />
              <TouchableOpacity
                style={[styles.sendButton, isSendingDisabled && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={isSendingDisabled}
              >
                <Text style={styles.sendButtonText}>{sending ? '...' : 'Gửi'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
