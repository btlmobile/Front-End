import { StyleSheet } from 'react-native';
import { scale, verticalScale, fontScale } from '../../utils/scaling';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1200),
    padding: verticalScale(10),
    marginTop: 0,
  },
  messageText: {
    fontSize: fontScale(theme.fontSize.m),
    lineHeight: fontScale(theme.fontSize.m * 1.35),
  },
  keepButton: {
    borderRadius: scale(30),
  },
  walkButton: {
    borderRadius: scale(30),
  },
  buttonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: verticalScale(8),
  },
});
