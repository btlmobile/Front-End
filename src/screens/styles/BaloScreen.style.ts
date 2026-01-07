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
    width: scale(774),
    height: verticalScale(1500),
    backgroundColor: 'rgba(228, 228, 228, 0.8)',
    borderRadius: scale(32),
    alignItems: 'center',
    padding: scale(40),
  },
  title: {
    fontSize: moderateScale(theme.fontSize.l),
    fontWeight: 'bold',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(80),
  },
  emptyText: {
    fontSize: moderateScale(theme.fontSize.m),
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: verticalScale(200),
    right: scale(80),
  },
});

