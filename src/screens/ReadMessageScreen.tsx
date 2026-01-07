import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { scale, verticalScale, moderateScale } from "../utils/scaling";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types";
import MessageLayout, { messageLayoutStyles } from "../components/MessageLayout";

const dummyMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin sed quam. Integer interdum lectus ac quam. Ut magna. Suspendisse eleifend, ligula eu fringilla PICTOGRAM, felis justo CONVallis nus, et ultrices diam lacus ac Un.";

type Props = NativeStackScreenProps<RootStackParamList, 'ReadMessage'>;

export default function ReadMessageScreen({ route, navigation }: Props) {
  const theme = route.params?.theme || 'day';

  const handleKeep = () => {
    Alert.alert("Đã lưu", "Thông điệp đã được lưu vào bộ sưu tập của bạn.");
  };

  const buttons = (
    <>
      <TouchableOpacity
        style={styles.walkButton}
        onPress={() => navigation.navigate("Waiting", { theme: theme })}
      >
        <Text style={messageLayoutStyles.buttonText}>Dạo biển</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.keepButton} onPress={handleKeep}>
        <Text style={messageLayoutStyles.buttonText}>Lưu giữ</Text>
      </TouchableOpacity>
    </>
  );

  const textColor = theme === 'day' ? '#3E2723' : '#FFFFFF';

  return (
    <MessageLayout title="Một thông điệp từ biển cả" buttons={buttons} theme={theme}>
      <View style={styles.messageContainer}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={[styles.messageText, { color: textColor }]}>{dummyMessage.repeat(5)}</Text>
        </ScrollView>
      </View>
    </MessageLayout>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1200),
    padding: verticalScale(10),
    marginTop: 0,
  },
  messageText: {
    fontSize: moderateScale(32),
    lineHeight: moderateScale(48),
  },
  keepButton: {
    backgroundColor: "#0077B6",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(80),
  },
  walkButton: {
    backgroundColor: "#486273",
    borderRadius: scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(60),
  },
});