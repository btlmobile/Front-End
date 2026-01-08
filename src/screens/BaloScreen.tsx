import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StatusBar, FlatList, Alert } from 'react-native';
import { IconButton, Button as PaperButton } from 'react-native-paper';
import { moderateScale } from '../utils/scaling';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from './styles/BaloScreen.style';
import { theme as appTheme } from '../themes/theme';
import { getStoredBottles, deleteStoredBottle } from '../services/api';
import { StoredBottleResponseSchema } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Balo'>;

export default function BaloScreen({ route, navigation }: Props) {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={home_bg} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.contentBox}>
            <Text style={[styles.title, { color: text }]}>Ba-Lô lưu trữ</Text>
            {loading ? (
              <Text style={{ color: text }}>Đang tải...</Text>
            ) : bottles.length > 0 ? (
              <FlatList
                data={bottles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
              />
            ) : (
              <Text style={[styles.emptyText, { color: text }]}>
                Ba-lô của bạn hiện đang trống.
              </Text>
            )}
          </View>
          <IconButton
            icon="arrow-left"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            color={text}
            size={moderateScale(50)}
          />
        </View>
      </ImageBackground>
    </View>
  );
}