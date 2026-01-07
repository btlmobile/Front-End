import { DefaultTheme } from 'react-native-paper';
import { theme as appTheme } from './theme';

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: appTheme.light.primary,
    accent: appTheme.light.accent,
    background: appTheme.light.background,
    text: appTheme.light.text,
  },
};
