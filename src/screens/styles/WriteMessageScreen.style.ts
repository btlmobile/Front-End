import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1200),
    textAlignVertical: 'top',
    padding: verticalScale(10),
    fontSize: moderateScale(theme.fontSize.m),
    lineHeight: moderateScale(theme.fontSize.l),
    marginTop: 0,
  },
  sendButton: {
    borderRadius: scale(30),
  },
  backButton: {
    borderRadius: scale(30),
  },
  buttonLabel: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
    paddingVertical: verticalScale(8),
  },
});
