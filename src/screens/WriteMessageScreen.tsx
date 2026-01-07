import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MessageLayout from '../components/MessageLayout';
import { styles } from './styles/WriteMessageScreen.style';
import { theme as appTheme } from '../themes/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'WriteMessage'>;

export default function WriteMessageScreen({ route, navigation }: Props) {
  const [message, setMessage] = useState('');
  const currentTheme = route.params?.theme || 'light';

  const handleSend = () => {
    console.log('Message sent:', message);
    navigation.navigate('LoadingSend', { theme: currentTheme });
  };

  const buttons = (
    <>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.backButton}
        labelStyle={styles.buttonLabel}
      >
        Quay lại
      </PaperButton>
      <PaperButton
        mode="contained"
        onPress={handleSend}
        style={styles.sendButton}
        labelStyle={styles.buttonLabel}
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
      />
    </MessageLayout>
  );
}