import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Figma base dimensions
const figmaBaseWidth = 1080;
const figmaBaseHeight = 2335;

export const scale = (size: number): number => (width / figmaBaseWidth) * size;
export const verticalScale = (size: number): number => (height / figmaBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5): number => size + (scale(size) - size) * factor;

export const fontScale = (
  size: number,
  factor = 0.25,
  minScale = 0.6,
  maxScale = 1
): number => {
  const scaled = size + (scale(size) - size) * factor;
  const min = size * minScale;
  const max = size * maxScale;
  return Math.min(Math.max(scaled, min), max);
};
