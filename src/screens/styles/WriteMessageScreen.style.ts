import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1000), // Reduced height
    textAlignVertical: 'top',
    padding: verticalScale(10),
    fontSize: moderateScale(theme.fontSize.m),
    lineHeight: moderateScale(theme.fontSize.l),
    marginTop: 0,
    marginBottom: verticalScale(20), // Added margin bottom
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
  anonymousToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(5), // Reduced marginTop
  },
  anonymousToggleText: {
    fontSize: moderateScale(theme.fontSize.m),
    marginRight: scale(10),
  },
});
