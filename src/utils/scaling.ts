import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Figma base dimensions
const figmaBaseWidth = 1080;
const figmaBaseHeight = 2335;

export const scale = (size: number): number => (width / figmaBaseWidth) * size;
export const verticalScale = (size: number): number => (height / figmaBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5): number => size + (scale(size) - size) * factor;