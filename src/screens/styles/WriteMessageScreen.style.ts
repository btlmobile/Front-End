import { StyleSheet } from 'react-native';
import { scale, verticalScale, fontScale } from '../../utils/scaling';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    width: scale(700),
    height: verticalScale(1000), // Reduced height
    textAlignVertical: 'top',
    padding: verticalScale(10),
    fontSize: fontScale(theme.fontSize.m),
    lineHeight: fontScale(theme.fontSize.m * 1.35),
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
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
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
    fontSize: fontScale(theme.fontSize.m),
    marginRight: scale(10),
  },
});
