import { StyleSheet } from 'react-native';
import { scale, verticalScale, fontScale } from '../../utils/scaling';
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
    maxHeight: verticalScale(1140),
    backgroundColor: 'rgba(217, 217, 217, 0.8)',
    borderRadius: scale(32),
    alignItems: 'center',
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(24),
    flexShrink: 1,
  },
  contentScroll: {
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    width: '100%',
  },
  text: {
    fontSize: fontScale(theme.fontSize.m),
    lineHeight: fontScale(theme.fontSize.m * 1.35),
    textAlign: 'center',
  },
  backButton: {
    marginTop: verticalScale(60),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(24),
  },
  buttonText: {
    fontSize: fontScale(theme.fontSize.s),
    lineHeight: fontScale(theme.fontSize.s * 1.2),
    fontWeight: 'bold',
  },
});
