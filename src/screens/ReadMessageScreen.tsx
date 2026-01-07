import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MessageLayout from '../components/MessageLayout';
import { styles } from './styles/ReadMessageScreen.style';
import { theme as appTheme } from '../themes/theme';

const dummyMessage =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin sed quam. Integer interdum lectus ac quam. Ut magna. Suspendisse eleifend, ligula eu fringilla PICTOGRAM, felis justo CONVallis nus, et ultrices diam lacus ac Un.';

type Props = NativeStackScreenProps<RootStackParamList, 'ReadMessage'>;

export default function ReadMessageScreen({ route, navigation }: Props) {
  const currentTheme = route.params?.theme || 'light';

  const handleKeep = () => {
    Alert.alert('Đã lưu', 'Thông điệp đã được lưu vào bộ sưu tập của bạn.');
  };

  const buttons = (
    <>
      <PaperButton
        mode="contained"
        onPress={() => navigation.navigate('Waiting', { theme: currentTheme })}
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
          <Text style={[styles.messageText, { color: text }]}>{dummyMessage.repeat(5)}</Text>
        </ScrollView>
      </View>
    </MessageLayout>
  );
}