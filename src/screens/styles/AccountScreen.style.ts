import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { commonStyles } from '../../styles/common';
import { theme } from '../../themes/theme';

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  background: {
    ...commonStyles.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    width: scale(922),
    height: verticalScale(699),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  text: {
    fontSize: moderateScale(theme.fontSize.l),
    lineHeight: moderateScale(theme.fontSize.xl),
    textAlign: 'center',
    marginBottom: verticalScale(100),
  },
  logoutButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(30),
  },
  buttonText: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
  },
});
