import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const image = require('../../asset/image/letter_background.png');

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Image source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});