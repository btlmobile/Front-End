import React, { useState, useEffect } from 'react';
import { TextInput, Alert, View, Switch, Text } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MessageLayout from '../components/MessageLayout';
import { styles } from './styles/WriteMessageScreen.style';
import { theme as appTheme } from '../themes/theme';
import { createBottle, createAnonymousBottle } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'WriteMessage'>;

export default function WriteMessageScreen({ route, navigation }: Readonly<Props>) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const currentTheme = route.params?.theme || 'light';
  const isGuest = route.params?.isGuest || false;

  useEffect(() => {
    if (isGuest) {
      setIsAnonymous(true);
    }
  }, [isGuest]);

  const handleSend = async () => {
    setLoading(true);
    try {
      if (isAnonymous || isGuest) {
        await createAnonymousBottle({ content: message, type: 'text' });
      } else {
        await createBottle({ content: message, type: 'text' });
      }
      navigation.navigate('LoadingSend', { theme: currentTheme });
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể gửi thông điệp.');
    } finally {
      setLoading(false);
    }
  };

  const buttons = (
    <>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('Home', { guest: isGuest })}
        style={styles.backButton}
        labelStyle={styles.buttonLabel}
        disabled={loading}
      >
        Quay lại
      </PaperButton>
      <PaperButton
        mode="contained"
        onPress={handleSend}
        style={styles.sendButton}
        labelStyle={styles.buttonLabel}
        loading={loading}
        disabled={loading}
      >
        Gửi
      </PaperButton>
    </>
  );

  const { text } = appTheme[currentTheme];

  return (
    <MessageLayout title="Hãy gửi thông điệp của bạn" buttons={buttons} theme={currentTheme}>
      <TextInput
        style={[styles.textInput, { color: text }]}
        multiline
        placeholder="Viết điều bạn muốn nói..."
        placeholderTextColor="#777"
        onChangeText={setMessage}
        value={message}
        editable={!loading}
      />
      <View style={styles.anonymousToggleContainer}>
        <Text style={[styles.anonymousToggleText, { color: text }]}>Gửi ẩn danh</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isAnonymous ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsAnonymous}
          value={isAnonymous}
          disabled={loading || isGuest}
        />
      </View>
    </MessageLayout>
  );
}
