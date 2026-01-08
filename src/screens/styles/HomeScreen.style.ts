import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/scaling';
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  topLeftIcons: {
    position: 'absolute',
    top: verticalScale(50),
    left: scale(20),
    flexDirection: 'row',
  },
  topRightIcons: {
    position: 'absolute',
    top: verticalScale(50),
    right: scale(20),
    flexDirection: 'row',
  },
  title: {
    fontSize: fontScale(40),
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    marginTop: verticalScale(150),
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(100),
  },
  subtitle: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(80),
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  primaryButton: {
    marginBottom: verticalScale(40),
    width: scale(246), // Adjusted width
    paddingVertical: verticalScale(24), // Adjusted padding
    backgroundColor: theme.common.primaryButton,
  },
  secondaryButton: {
    width: scale(326), // Adjusted width
    paddingVertical: verticalScale(24), // Adjusted padding
    backgroundColor: theme.common.secondaryButton,
  },
  buttonLabel: {
    fontSize: fontScale(18),
    lineHeight: fontScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.common.buttonTextColor, // Updated text color
    paddingVertical: verticalScale(8),
  },

});
