import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, FlatList, Alert } from 'react-native';
import { IconButton, Button as PaperButton } from 'react-native-paper';
import { moderateScale } from '../utils/scaling';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/BaloScreen.style';
import { theme as appTheme } from '../themes/theme';
import { getStoredBottles, deleteStoredBottle, StoredBottleResponseSchema } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Balo'>;

export default function BaloScreen({ route, navigation }: Readonly<Props>) {
  const currentTheme = route.params?.theme || 'light';
  const isGuest = route.params?.isGuest || false;
  const { home_bg, text } = appTheme[currentTheme];
  const [bottles, setBottles] = useState<StoredBottleResponseSchema[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBottles = async () => {
    if (isGuest) {
      return;
    }
    setLoading(true);
    try {
      const response = await getStoredBottles();
      setBottles(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể tải danh sách chai đã lưu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBottles();
  }, [isGuest]);

  const handleDelete = async (id: string) => {
    try {
      await deleteStoredBottle(id);
      fetchBottles();
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể xóa chai.');
    }
  };

  const renderItem = ({ item }: { item: StoredBottleResponseSchema }) => (
    <PaperButton
      onPress={() =>
        navigation.navigate('StoredBottleDetail', {
          theme: currentTheme,
          stored_bottle_id: item.id,
          isGuest: isGuest,
        })
      }
      style={styles.bottleItem}
    >
      <Text style={[styles.bottleMessage, { color: text }]}>{item.bottle.content}</Text>
      <PaperButton onPress={() => handleDelete(item.id)}>Xóa</PaperButton>
    </PaperButton>
  );

  let content: React.ReactNode;

  if (loading) {
    content = <Text style={{ color: text }}>Đang tải...</Text>;
  } else if (bottles.length > 0) {
    content = (
      <FlatList
        data={bottles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    );
  } else {
    content = (
      <Text style={[styles.emptyText, { color: text }]}>
        Ba-lô của bạn hiện đang trống.
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.title, { color: text }]}>Ba-Lô lưu trữ</Text>
            {content}
          </View>
          <IconButton
            icon="arrow-left"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            iconColor={text}
            size={moderateScale(50)}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
