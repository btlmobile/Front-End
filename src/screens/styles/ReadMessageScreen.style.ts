import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
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
    fontSize: moderateScale(theme.fontSize.m),
    lineHeight: moderateScale(theme.fontSize.l),
  },
  keepButton: {
    borderRadius: scale(30),
  },
  walkButton: {
    borderRadius: scale(30),
  },
  buttonLabel: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
    paddingVertical: verticalScale(8),
  },
});
