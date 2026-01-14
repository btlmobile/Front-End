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
    paddingHorizontal: scale(20),
  },
  contentBox: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(36),
    paddingVertical: verticalScale(44),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    fontSize: fontScale(18),
    lineHeight: fontScale(26),
    textAlign: 'center',
    color: '#064273',
    fontWeight: '500',
  },
  backButton: {
    marginTop: verticalScale(32),
    minWidth: scale(200),
    borderRadius: 28,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  gradientButtonInner: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  buttonText: {
    fontSize: fontScale(16),
    lineHeight: fontScale(20),
    fontWeight: 'bold',
    color: theme.common.buttonTextColor,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(28),
  },
});
