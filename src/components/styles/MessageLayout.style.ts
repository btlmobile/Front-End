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
    paddingHorizontal: scale(24),
  },
  title: {
    fontSize: moderateScale(theme.fontSize.l),
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: verticalScale(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: verticalScale(50),
  },
  buttonText: {
    fontSize: moderateScale(theme.fontSize.m),
    fontWeight: 'bold',
  },
});
